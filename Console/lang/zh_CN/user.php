<?php

return [
    'fields' => [
        'name' => '用户昵称',
        'email' => '邮箱地址',
        'password' => '密码',
    ],
    'validation' => [
        'name_required' => '用户昵称不能为空',
        'name_string' => '用户昵称必须为字符串',
        'name_max' => '用户昵称长度不能超过 255 个字符',
        'email_required' => '邮箱地址不能为空',
        'email_email' => '请输入有效的邮箱地址',
        'email_unique' => '该邮箱地址已被其他用户使用',
        'password_min' => '密码长度不能少于 8 个字符',
    ],
];
