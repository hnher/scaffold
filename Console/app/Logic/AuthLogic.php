<?php

namespace App\Logic;

use App\Models\User;

class AuthLogic extends BaseLogic
{
    /**
     * @return array{token: string}
     */
    public function login(): array
    {
        $user = User::query()->firstOrFail();
        $token = $user->createToken('token')->plainTextToken;

        return [
            'token' => $token,
        ];
    }

    /**
     * @return array<string, never>
     */
    public function logout(User $user): array
    {
        $user->currentAccessToken()->delete();

        return [];
    }
}
