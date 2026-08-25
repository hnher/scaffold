<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\User;
use App\Notifications\AppPushNotification;
use Illuminate\Console\Command;

final class SendTestPushNotification extends Command
{
    protected $signature = 'app:push-test
                            {user : 接收通知的用户 ID}
                            {--title= : 通知标题}
                            {--body= : 通知内容}';

    protected $description = '通过 Expo Push 向用户的所有 iOS 和 Android 设备发送测试通知';

    public function handle(): int
    {
        $userId = $this->argument('user');

        if (! is_int($userId)) {
            $this->error('用户 ID 必须是正整数');

            return self::INVALID;
        }

        $user = User::query()->find($userId);
        if (! $user instanceof User) {
            $this->error("用户 {$userId} 不存在");
            return self::FAILURE;
        }

        $title = trim((string) $this->option('title')) ?: 'Scaffold 推送测试';
        $body = trim((string) $this->option('body')) ?: '这是一条通过 Expo Push 发送的测试通知。';
        $notification = new AppPushNotification($title, $body, [
            'user_id' => $user->id,
            'url' => '/'
        ]);
        $deviceCount = $user->pushDevices()->count();

        $user->notifyNow($notification);

        $this->newLine();
        $this->info("匹配设备：{$deviceCount}");
        $this->info('测试通知已发送并保存到数据库');

        return self::SUCCESS;
    }
}
