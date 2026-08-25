<?php

return [
    'fields' => [
        'platform' => 'device platform',
        'token' => 'device token',
        'uuid' => 'device UUID',
    ],
    'validation' => [
        'platform_required' => 'The device platform is required.',
        'platform_invalid' => 'The device platform is not supported.',
        'token_required' => 'The device token is required.',
        'token_max' => 'The device token must not exceed 512 characters.',
        'uuid_max' => 'The device UUID must not exceed 255 characters.',
    ],
];
