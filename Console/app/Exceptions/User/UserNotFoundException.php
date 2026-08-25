<?php

namespace App\Exceptions\User;

use App\Exceptions\BaseException;

class UserNotFoundException extends BaseException
{
    protected $code = 20001;

    protected string $translationKey = 'exceptions.user.not_found';
}
