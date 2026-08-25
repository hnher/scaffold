<?php

declare(strict_types=1);

namespace App\Support;

use App\Models\User as UserModel;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Auth;

/**
 * 当前登录用户信息访问器。
 *
 * 该类独立于 Eloquent 用户模型，避免覆盖模型原有的 get 查询方法。
 */
final class User
{
    /**
     * 获取当前登录用户的指定信息，支持点号路径。
     *
     * 未登录或字段不存在时返回默认值；当未登录且要求抛出异常时，
     * 抛出 Laravel 标准认证异常，由接口异常处理器转换为 401 响应。
     *
     * @throws AuthenticationException
     */
    public static function get(string $key, mixed $default = null, bool $isThrow = false): mixed
    {
        $user = Auth::guard('sanctum')->user();

        if (! $user instanceof UserModel) {
            if ($isThrow) {
                throw new AuthenticationException(guards: ['sanctum']);
            }

            return $default;
        }

        return data_get($user, $key, $default);
    }
}
