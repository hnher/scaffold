<?php

declare(strict_types=1);

namespace App\Support\Push;

final class ExpoPushToken
{
    public static function isValid(string $token): bool
    {
        return preg_match('/^Expo(?:nent)?PushToken\[[A-Za-z0-9_-]+\]$/', $token) === 1;
    }
}
