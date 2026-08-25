<?php

namespace App\Exceptions;

use Exception;

class BaseException extends Exception
{
    protected $code = 10001;

    protected $message = '业务异常，请重试';
}
