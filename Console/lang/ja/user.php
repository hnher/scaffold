<?php

return [
    'fields' => [
        'name' => 'ユーザー名',
        'email' => 'メールアドレス',
        'password' => 'パスワード',
    ],
    'validation' => [
        'name_required' => 'ユーザー名は必須です。',
        'name_string' => 'ユーザー名は文字列である必要があります。',
        'name_max' => 'ユーザー名は255文字以内で入力してください。',
        'email_required' => 'メールアドレスは必須です。',
        'email_email' => '有効なメールアドレスを入力してください。',
        'email_unique' => 'このメールアドレスは既に使用されています。',
        'password_min' => 'パスワードは8文字以上で入力してください。',
    ],
];
