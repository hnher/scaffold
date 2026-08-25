<?php

return [
    'fields' => [
        'name' => 'Name',
        'email' => 'Email',
        'password' => 'Password',
    ],
    'validation' => [
        'name_required' => 'The name field is required.',
        'name_string' => 'The name must be a string.',
        'name_max' => 'The name may not be greater than 255 characters.',
        'email_required' => 'The email field is required.',
        'email_email' => 'Please enter a valid email address.',
        'email_unique' => 'The email has already been taken.',
        'password_min' => 'The password must be at least 8 characters.',
    ],
];
