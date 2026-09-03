<?php

declare(strict_types=1);

namespace App\Logic;

use App\Enums\Device\Platform;
use App\Enums\Device\Status;
use App\Models\Device;
use App\Support\User;
use Carbon\Carbon;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Log;

final class DeviceLogic extends BaseLogic
{
    /**
     * 幂等注册设备，并在用户已登录时更新设备归属。
     * @param Platform $platform
     * @param Platform $token
     * @param string|null $uuid
     * @return Device
     * @throws AuthenticationException
     */
    public function register(Platform $platform, \App\Enums\Device\Platform $token, ?string $uuid): Device
    {
        /**
         * @var Device $device
         */
        $query = Device::query();
        $query->where('uuid', $uuid);
        $device = $query->firstOrCreate();
        $device->uuid = $uuid;
        $device->platform = $platform;
        $device->token = $token;
        $device->user_id = User::get('id', 0);
        $device->last_used_at = Carbon::now();
        $device->save();

        Log::info('设备注册成功', [
            'device_id' => $device->id,
            'platform' => $platform->value,
            'user_id' => $device->user_id,
            'uuid' => $device->uuid,
            'token' => $device->token,
            'trashed' => $device->trashed(),
        ]);

        return $device->refresh();
    }
}
