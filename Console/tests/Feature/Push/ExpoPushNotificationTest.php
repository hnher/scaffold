<?php

declare(strict_types=1);

namespace Tests\Feature\Push;

use App\Enums\Device\Platform;
use App\Enums\Device\Status;
use App\Models\Device;
use App\Models\User;
use App\Notifications\AppPushNotification;
use App\Notifications\Channels\ExpoPushChannel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Client\Request;
use Illuminate\Notifications\SendQueuedNotifications;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Queue;
use Symfony\Component\Console\Command\Command;
use Tests\TestCase;

final class ExpoPushNotificationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        config([
            'services.expo_push.endpoint' => 'https://exp.host/--/api/v2/push/send',
            'services.expo_push.access_token' => 'expo-access-token',
        ]);
    }

    public function test_push_is_sent_to_all_enabled_ios_and_android_devices_only(): void
    {
        $user = User::factory()->create();
        Device::factory()->for($user)->create([
            'platform' => Platform::iOS,
            'token' => 'ExpoPushToken[ios-device-token]',
        ]);
        Device::factory()->for($user)->create([
            'platform' => Platform::ANDROID,
            'token' => 'ExponentPushToken[android-device-token]',
        ]);
        Device::factory()->for($user)->create([
            'platform' => Platform::MP_WECHAT,
            'token' => 'wechat-mini-program-token',
        ]);
        Device::factory()->for($user)->create([
            'platform' => Platform::ANDROID,
            'status' => Status::DISABLE,
            'token' => 'ExpoPushToken[disabled-device-token]',
        ]);
        Device::factory()->for(User::factory())->create([
            'platform' => Platform::iOS,
            'token' => 'ExpoPushToken[other-user-device-token]',
        ]);

        Http::fake([
            'https://exp.host/--/api/v2/push/send' => Http::response([
                'data' => [
                    ['status' => 'ok', 'id' => 'ios-ticket-id'],
                    ['status' => 'ok', 'id' => 'android-ticket-id'],
                ],
            ]),
        ]);

        $result = app(ExpoPushChannel::class)->send(
            $user,
            new AppPushNotification('测试标题', '测试内容', ['screen' => '/']),
        );

        $this->assertSame(2, $result['total']);
        $this->assertSame(2, $result['requested']);
        $this->assertSame(2, $result['accepted']);
        $this->assertSame(0, $result['failed']);
        $this->assertSame(0, $result['skipped']);

        Http::assertSent(function (Request $request): bool {
            $messages = $request->data();
            $tokens = collect($messages)->pluck('to')->sort()->values()->all();

            return $request->hasHeader('Authorization', 'Bearer expo-access-token')
                && $tokens === [
                    'ExpoPushToken[ios-device-token]',
                    'ExponentPushToken[android-device-token]',
                ]
                && collect($messages)->every(
                    fn (array $message): bool => $message['title'] === '测试标题'
                        && $message['body'] === '测试内容'
                        && $message['data'] === ['screen' => '/'],
                );
        });
    }

    public function test_invalid_and_unregistered_tokens_are_disabled(): void
    {
        $user = User::factory()->create();
        $invalidDevice = Device::factory()->for($user)->create([
            'platform' => Platform::iOS,
            'token' => 'invalid-native-token',
        ]);
        $unregisteredDevice = Device::factory()->for($user)->create([
            'platform' => Platform::ANDROID,
            'token' => 'ExpoPushToken[unregistered-device-token]',
        ]);

        Http::fake([
            'https://exp.host/--/api/v2/push/send' => Http::response([
                'data' => [[
                    'status' => 'error',
                    'message' => 'Device is no longer registered',
                    'details' => ['error' => 'DeviceNotRegistered'],
                ]],
            ]),
        ]);

        $result = app(ExpoPushChannel::class)->send(
            $user,
            new AppPushNotification('测试标题', '测试内容'),
        );

        $this->assertSame(2, $result['total']);
        $this->assertSame(1, $result['requested']);
        $this->assertSame(0, $result['accepted']);
        $this->assertSame(1, $result['failed']);
        $this->assertSame(1, $result['skipped']);
        $this->assertSame(Status::DISABLE, $invalidDevice->refresh()->status);
        $this->assertSame(Status::DISABLE, $unregisteredDevice->refresh()->status);
    }

    public function test_large_device_sets_are_split_into_batches_of_one_hundred(): void
    {
        $user = User::factory()->create();

        foreach (range(1, 101) as $index) {
            Device::factory()->for($user)->create([
                'platform' => $index % 2 === 0 ? Platform::iOS : Platform::ANDROID,
                'token' => "ExpoPushToken[batch-device-{$index}]",
            ]);
        }

        Http::fake(function (Request $request) {
            return Http::response([
                'data' => collect($request->data())
                    ->map(fn (array $message, int $index): array => [
                        'status' => 'ok',
                        'id' => "ticket-{$index}",
                    ])
                    ->all(),
            ]);
        });

        $result = app(ExpoPushChannel::class)->send(
            $user,
            new AppPushNotification('批量测试', '批量测试内容'),
        );

        $this->assertSame(101, $result['requested']);
        $this->assertSame(101, $result['accepted']);
        Http::assertSentCount(2);
        Http::assertSent(fn (Request $request): bool => count($request->data()) === 100);
        Http::assertSent(fn (Request $request): bool => count($request->data()) === 1);
    }

    public function test_push_test_command_sends_a_synchronous_notification(): void
    {
        $user = User::factory()->create();
        Device::factory()->for($user)->create([
            'platform' => Platform::iOS,
            'token' => 'ExpoPushToken[command-device-token]',
        ]);

        Http::fake([
            'https://exp.host/--/api/v2/push/send' => Http::response([
                'data' => [['status' => 'ok', 'id' => 'command-ticket-id']],
            ]),
        ]);

        $exitCode = Artisan::call('app:push-test', [
            'user' => $user->id,
            '--title' => '命令测试标题',
            '--body' => '命令测试内容',
        ]);
        $output = Artisan::output();

        $this->assertSame(Command::SUCCESS, $exitCode);
        $this->assertStringContainsString('匹配设备：1', $output);
        $this->assertStringContainsString('测试通知已发送并保存到数据库', $output);

        $databaseNotification = $user->notifications()->sole();

        $this->assertSame(AppPushNotification::class, $databaseNotification->type);
        $this->assertSame('命令测试标题', $databaseNotification->data['title']);
        $this->assertSame('命令测试内容', $databaseNotification->data['message']);
        $this->assertSame('push_test', $databaseNotification->data['data']['type']);
        $this->assertSame($user->id, $databaseNotification->data['data']['user_id']);

        Http::assertSent(fn (Request $request): bool => data_get($request->data(), '0.title') === '命令测试标题'
            && data_get($request->data(), '0.body') === '命令测试内容');
    }

    public function test_database_channel_persists_the_notification_payload(): void
    {
        $user = User::factory()->create();

        $user->notifyNow(
            new AppPushNotification('数据库通知标题', '数据库通知内容', ['screen' => '/notifications']),
            ['database'],
        );

        $databaseNotification = $user->notifications()->sole();

        $this->assertSame(AppPushNotification::class, $databaseNotification->type);
        $this->assertSame([
            'title' => '数据库通知标题',
            'message' => '数据库通知内容',
            'data' => ['screen' => '/notifications'],
        ], $databaseNotification->data);
    }

    public function test_app_push_notification_is_queued_for_normal_business_usage(): void
    {
        Queue::fake();
        $user = User::factory()->create();

        $user->notify(new AppPushNotification('业务通知', '业务通知内容'));

        Queue::assertPushedOn('notifications', SendQueuedNotifications::class);
        Queue::assertPushed(SendQueuedNotifications::class, 2);
        Http::assertNothingSent();
    }

    public function test_business_notification_is_stored_before_the_expo_push_queue_runs(): void
    {
        config(['queue.default' => 'database']);
        $user = User::factory()->create();

        $user->notify(new AppPushNotification('业务通知标题', '业务通知内容'));

        $databaseNotification = $user->notifications()->sole();

        $this->assertSame('业务通知标题', $databaseNotification->data['title']);
        $this->assertSame('业务通知内容', $databaseNotification->data['message']);
        $this->assertDatabaseCount('jobs', 1);
        $this->assertSame('notifications', DB::table('jobs')->value('queue'));
        Http::assertNothingSent();
    }
}
