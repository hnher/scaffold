<?php

namespace App\Exceptions\User;

use Exception;

class UserNotFundException extends Exception
{
    protected $code = 10002;

    protected $message = 'user not fund';
}
