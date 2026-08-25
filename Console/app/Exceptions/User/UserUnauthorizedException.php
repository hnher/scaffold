<?php

namespace App\Exceptions\User;

use App\Exceptions\BaseException;

class UserUnauthorizedException extends BaseException
{
    protected $code = 20002;

    protected string $translationKey = 'exceptions.user.unauthorized';
}
