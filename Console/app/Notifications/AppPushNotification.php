<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Notifications\Channels\ExpoPushChannel;
use App\Notifications\Contracts\ExpoPushNotification;
use App\Notifications\Messages\ExpoPushMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Arr;

final class AppPushNotification extends Notification implements ExpoPushNotification, ShouldQueue
{
    use Queueable;

    public int $tries = 3;

    public int $timeout = 30;

    /**
     * @param  array<string, mixed>  $data
     */
    public function __construct(
        private readonly string $title,
        private readonly string $body,
        private readonly array $data = [],
    ) {
        $this->onQueue('notifications');
    }

    /**
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', ExpoPushChannel::class];
    }

    /**
     * 数据库通知即时保存，Expo Push 继续使用默认异步队列连接。
     *
     * @return array<string, string>
     */
    public function viaConnections(): array
    {
        return ['database' => 'sync'];
    }

    public function toExpoPush(object $notifiable): ExpoPushMessage
    {
        return new ExpoPushMessage($this->title, $this->body, array_merge($this->data, ['notification_id' => $this->id]));
    }

    /**
     * @return array{title: string, message: string, data: array<string, mixed>}
     */
    public function toDatabase(object $notifiable): array
    {
        return [
            'title' => $this->title,
            'message' => $this->body,
            'data' => $this->data,
        ];
    }
}
