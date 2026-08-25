<?php

declare(strict_types=1);

namespace App\Notifications\Messages;

final readonly class ExpoPushMessage
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function __construct(
        public string $title,
        public string $body,
        public array $data = [],
        public string $sound = 'default',
    ) {}

    /**
     * @return array<string, mixed>
     */
    public function toArray(string $token): array
    {
        $message = [
            'to' => $token,
            'sound' => $this->sound,
            'title' => $this->title,
            'body' => $this->body,
        ];

        if ($this->data !== []) {
            $message['data'] = $this->data;
        }

        return $message;
    }
}
