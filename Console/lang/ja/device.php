<?php

return [
    'fields' => [
        'platform' => 'デバイスプラットフォーム',
        'token' => 'デバイストークン',
        'uuid' => 'デバイス UUID',
    ],
    'validation' => [
        'platform_required' => 'デバイスプラットフォームを指定してください。',
        'platform_invalid' => 'このデバイスプラットフォームはサポートされていません。',
        'token_required' => 'デバイストークンを指定してください。',
        'token_max' => 'デバイストークンは512文字以内で指定してください。',
        'uuid_max' => 'デバイス UUID は255文字以内で指定してください。',
    ],
];
