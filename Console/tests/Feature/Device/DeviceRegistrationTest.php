<?php

declare(strict_types=1);

namespace Tests\Feature\Device;

use App\Enums\Device\Platform;
use App\Enums\Device\Status;
use App\Models\Device;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class DeviceRegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_register_a_device_without_user(): void
    {
        $this->postJson('/api/device/register', [
            'platform' => Platform::MP_WECHAT->value,
            'token' => 'wechat-device-token',
            'uuid' => 'wechat-device-uuid',
        ])
            ->assertOk()
            ->assertJsonPath('code', 200)
            ->assertJsonPath('data.user_id', null)
            ->assertJsonPath('data.platform', Platform::MP_WECHAT->value)
            ->assertJsonPath('data.token', 'wechat-device-token')
            ->assertJsonPath('data.status', Status::ENABLE->value);

        $this->assertDatabaseHas('devices', [
            'user_id' => null,
            'platform' => Platform::MP_WECHAT->value,
            'token' => 'wechat-device-token',
            'uuid' => 'wechat-device-uuid',
        ]);
    }

    public function test_authenticated_user_can_register_and_claim_an_anonymous_device(): void
    {
        $anonymousResponse = $this->postJson('/api/device/register', [
            'platform' => Platform::ANDROID->value,
            'token' => 'shared-android-token',
        ])->assertOk();

        $user = User::factory()->create();
        $accessToken = $user->createToken('device-test')->plainTextToken;

        $authenticatedResponse = $this->withToken($accessToken)
            ->postJson('/api/device/register', [
                'platform' => Platform::ANDROID->value,
                'token' => 'shared-android-token',
                'uuid' => 'android-device-uuid',
            ])
            ->assertOk()
            ->assertJsonPath('data.user_id', $user->id)
            ->assertJsonPath('data.uuid', 'android-device-uuid');

        $this->assertSame(
            $anonymousResponse->json('data.id'),
            $authenticatedResponse->json('data.id'),
        );
        $this->assertDatabaseCount('devices', 1);
        $this->assertDatabaseHas('devices', [
            'user_id' => $user->id,
            'platform' => Platform::ANDROID->value,
            'token' => 'shared-android-token',
        ]);
    }

    public function test_guest_registration_does_not_remove_an_existing_user_association(): void
    {
        $user = User::factory()->create();
        $device = Device::factory()->for($user)->create([
            'platform' => Platform::iOS,
            'token' => 'ios-associated-token',
        ]);

        $this->postJson('/api/device/register', [
            'platform' => Platform::iOS->value,
            'token' => 'ios-associated-token',
        ])->assertOk()
            ->assertJsonPath('data.id', $device->id)
            ->assertJsonPath('data.user_id', $user->id);

        $this->assertDatabaseCount('devices', 1);
    }

    public function test_same_token_can_be_registered_for_different_platforms(): void
    {
        $this->postJson('/api/device/register', [
            'platform' => Platform::iOS->value,
            'token' => 'cross-platform-token',
        ])->assertOk();

        $this->postJson('/api/device/register', [
            'platform' => Platform::ANDROID->value,
            'token' => 'cross-platform-token',
        ])->assertOk();

        $this->assertDatabaseCount('devices', 2);
    }

    public function test_registration_requires_supported_platform_and_token(): void
    {
        $this->withHeader('X-Locale', 'en')
            ->postJson('/api/device/register', [
                'platform' => 999,
            ])
            ->assertUnprocessable()
            ->assertJsonPath('code', 422)
            ->assertJsonValidationErrors(['platform', 'token']);
    }
}
