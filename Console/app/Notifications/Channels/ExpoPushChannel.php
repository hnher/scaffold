<?php

declare(strict_types=1);

namespace App\Notifications\Channels;

use App\Enums\Device\Status;
use App\Models\Device;
use App\Models\User;
use App\Notifications\Contracts\ExpoPushNotification;
use App\Services\Push\ExpoPushClient;
use App\Support\Push\ExpoPushToken;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Log;
use InvalidArgumentException;
use JsonException;

final readonly class ExpoPushChannel
{
    public function __construct(private ExpoPushClient $client) {}

    /**
     * @param object $notifiable
     * @param Notification $notification
     * @return array{
     *     total: int,
     *     requested: int,
     *     accepted: int,
     *     failed: int,
     *     skipped: int,
     *     tickets: array<int, array<string, int|string|null>>
     * }
     * @throws JsonException
     */
    public function send(object $notifiable, Notification $notification): array
    {
        if (! $notifiable instanceof User) {
            throw new InvalidArgumentException('Expo Push 通道只支持用户通知');
        }

        if (! $notification instanceof ExpoPushNotification) {
            throw new InvalidArgumentException('通知必须实现 ExpoPushNotification 接口');
        }

        /** @var Collection<int, Device> $devices */
        $devices = $notifiable->pushDevices()->get();
        /** @var Collection<int, Device> $validDevices */
        $validDevices = $devices
            ->filter(fn (Device $device): bool => ExpoPushToken::isValid($device->token))
            ->values();
        $invalidDeviceIds = $devices->modelKeys();
        $invalidDeviceIds = array_values(array_diff($invalidDeviceIds, $validDevices->modelKeys()));

        if ($invalidDeviceIds !== []) {
            Device::query()->whereKey($invalidDeviceIds)->update(['status' => Status::DISABLE->value]);

            Log::warning('无效 Expo Push Token 对应设备已停用', [
                'device_ids' => $invalidDeviceIds,
                'user_id' => $notifiable->id,
            ]);
        }

        $result = $this->client->send($validDevices, $notification->toExpoPush($notifiable));

        Log::info('用户 Expo Push 通知提交完成', [
            'user_id' => $notifiable->id,
            'requested' => $result['requested'],
            'accepted' => $result['accepted'],
            'failed' => $result['failed'],
            'skipped' => count($invalidDeviceIds),
        ]);

        return [
            'total' => $devices->count(),
            ...$result,
            'skipped' => count($invalidDeviceIds),
        ];
    }
}
