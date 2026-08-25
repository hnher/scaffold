<?php

declare(strict_types=1);

namespace App\Exceptions\Push;

use RuntimeException;

final class ExpoPushResponseException extends RuntimeException
{
    public function __construct()
    {
        parent::__construct('Expo Push 服务返回了无效响应', 30002);
    }
}
