<?php

declare(strict_types=1);

namespace Tests\Unit\Device;

use App\Enums\Device\Platform;
use App\Enums\Device\Status;
use App\Logic\DeviceLogic;
use App\Models\Device;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class DeviceLogicTest extends TestCase
{
    use RefreshDatabase;

    public function test_register_restores_and_updates_a_deleted_device(): void
    {
        $user = User::factory()->create();
        $device = Device::factory()->create([
            'platform' => Platform::MP_WECHAT,
            'token' => 'restored-device-token',
            'status' => Status::DISABLE,
        ]);
        $device->delete();

        $registeredDevice = app(DeviceLogic::class)->register(
            $user->id,
            Platform::MP_WECHAT,
            'restored-device-token',
            'restored-device-uuid',
        );

        $this->assertSame($device->id, $registeredDevice->id);
        $this->assertSame($user->id, $registeredDevice->user_id);
        $this->assertSame('restored-device-uuid', $registeredDevice->uuid);
        $this->assertSame(Status::ENABLE, $registeredDevice->status);
        $this->assertNull($registeredDevice->deleted_at);
    }
}
