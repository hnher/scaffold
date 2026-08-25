<?php

declare(strict_types=1);

namespace App\Notifications\Contracts;

use App\Notifications\Messages\ExpoPushMessage;

interface ExpoPushNotification
{
    public function toExpoPush(object $notifiable): ExpoPushMessage;
}
