<?php

declare(strict_types=1);

namespace App\Services\Push;

use App\Enums\Device\Status;
use App\Exceptions\Push\ExpoPushConfigurationException;
use App\Exceptions\Push\ExpoPushResponseException;
use App\Models\Device;
use App\Notifications\Messages\ExpoPushMessage;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

final class ExpoPushClient
{
    private const BATCH_SIZE = 100;

    /**
     * @param  Collection<int, Device>  $devices
     * @return array{
     *     requested: int,
     *     accepted: int,
     *     failed: int,
     *     tickets: array<int, array{
     *         device_id: int,
     *         platform: int,
     *         status: string,
     *         ticket_id: string|null,
     *         error: string|null,
     *         message: string|null
     *     }>
     * }
     */
    public function send(Collection $devices, ExpoPushMessage $message): array
    {
        $result = [
            'requested' => $devices->count(),
            'accepted' => 0,
            'failed' => 0,
            'tickets' => [],
        ];

        foreach ($devices->chunk(self::BATCH_SIZE) as $batch) {
            $messages = $batch
                ->map(fn (Device $device): array => $message->toArray($device->token))
                ->values()
                ->all();
            $tickets = $this->request()
                ->withBody(json_encode($messages, JSON_THROW_ON_ERROR), 'application/json')
                ->post($this->endpoint())
                ->throw()
                ->json('data');

            if (! is_array($tickets)) {
                throw new ExpoPushResponseException;
            }

            foreach ($batch->values() as $index => $device) {
                $ticket = $tickets[$index] ?? null;
                $normalizedTicket = $this->normalizeTicket($device, $ticket);
                $result['tickets'][] = $normalizedTicket;

                if ($normalizedTicket['status'] === 'ok') {
                    $result['accepted']++;
                } else {
                    $result['failed']++;

                    Log::warning('Expo Push Ticket 返回失败', [
                        'device_id' => $device->id,
                        'user_id' => $device->user_id,
                        'error' => $normalizedTicket['error'],
                        'message' => $normalizedTicket['message'],
                    ]);
                }

                if ($normalizedTicket['error'] === 'DeviceNotRegistered') {
                    $this->disableDevice($device);
                }
            }
        }

        return $result;
    }

    private function request(): PendingRequest
    {
        $request = Http::acceptJson()
            ->connectTimeout((int) config('services.expo_push.connect_timeout', 5))
            ->timeout((int) config('services.expo_push.timeout', 10))
            ->retry(
                [200, 500, 1000],
                when: fn (Throwable $exception): bool => $this->shouldRetry($exception),
            );
        $accessToken = config('services.expo_push.access_token');

        return is_string($accessToken) && $accessToken !== ''
            ? $request->withToken($accessToken)
            : $request;
    }

    private function endpoint(): string
    {
        $endpoint = config('services.expo_push.endpoint');

        if (! is_string($endpoint) || $endpoint === '') {
            throw new ExpoPushConfigurationException;
        }

        return $endpoint;
    }

    private function shouldRetry(Throwable $exception): bool
    {
        if (! $exception instanceof RequestException) {
            return true;
        }

        $status = $exception->response->status();

        return $status === 429 || $status >= 500;
    }

    /**
     * @return array{
     *     device_id: int,
     *     platform: int,
     *     status: string,
     *     ticket_id: string|null,
     *     error: string|null,
     *     message: string|null
     * }
     */
    private function normalizeTicket(Device $device, mixed $ticket): array
    {
        if (! is_array($ticket)) {
            return [
                'device_id' => $device->id,
                'platform' => $device->platform->value,
                'status' => 'error',
                'ticket_id' => null,
                'error' => 'MissingPushTicket',
                'message' => 'Expo Push 服务未返回对应 Ticket',
            ];
        }

        $status = ($ticket['status'] ?? null) === 'ok' ? 'ok' : 'error';
        $ticketId = $ticket['id'] ?? null;
        $error = data_get($ticket, 'details.error');
        $message = $ticket['message'] ?? null;

        return [
            'device_id' => $device->id,
            'platform' => $device->platform->value,
            'status' => $status,
            'ticket_id' => is_string($ticketId) ? $ticketId : null,
            'error' => is_string($error) ? $error : null,
            'message' => is_string($message) ? $message : null,
        ];
    }

    private function disableDevice(Device $device): void
    {
        $device->status = Status::DISABLE;
        $device->save();

        Log::warning('Expo Push 设备已失效并停用', [
            'device_id' => $device->id,
            'user_id' => $device->user_id,
        ]);
    }
}
