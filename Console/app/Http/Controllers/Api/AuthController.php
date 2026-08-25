<?php

namespace App\Http\Controllers\Api;

use App\Logic\AuthLogic;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends ApiController
{
    private readonly AuthLogic $logic;

    public function __construct(AuthLogic $logic)
    {
        $this->logic = $logic;
    }

    /**
     * @return array{token: string}
     */
    public function login(): array
    {
        return $this->logic->login();
    }

    /**
     * @return array<string, never>
     */
    public function logout(Request $request): array
    {
        /** @var User $user */
        $user = $request->user();

        return $this->logic->logout($user);
    }
}
