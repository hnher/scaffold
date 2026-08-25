<?php

declare(strict_types=1);

namespace App\Exceptions\Push;

use RuntimeException;

final class ExpoPushConfigurationException extends RuntimeException
{
    public function __construct()
    {
        parent::__construct('Expo Push 服务地址配置无效', 30001);
    }
}
