<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Enums\Device\Platform;
use App\Http\Requests\Device\RegisterRequest;
use App\Logic\DeviceLogic;
use App\Models\Device;
use App\Support\User;
use Illuminate\Auth\AuthenticationException;

final class DeviceController extends ApiController
{
    public function __construct(
        private readonly DeviceLogic $logic,
    ) {}

    /**
     * 注册或更新 App、小程序设备。
     * @param RegisterRequest $request
     * @return Device
     * @throws AuthenticationException
     */
    public function register(RegisterRequest $request)
    {
        $uuid = $request->input('uuid', '');
        $platform = (int)$request->input('platform', Platform::MP_WECHAT);
        $token = $request->input('token', '');

        return $this->logic->register(Platform::from($platform), $token, $uuid);
    }
}
