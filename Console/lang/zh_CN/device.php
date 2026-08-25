<?php

return [
    'fields' => [
        'platform' => '设备平台',
        'token' => '设备 Token',
        'uuid' => '设备 UUID',
    ],
    'validation' => [
        'platform_required' => '请选择设备平台。',
        'platform_invalid' => '设备平台不受支持。',
        'token_required' => '请提交设备 Token。',
        'token_max' => '设备 Token 长度不能超过 512 个字符。',
        'uuid_max' => '设备 UUID 长度不能超过 255 个字符。',
    ],
];
