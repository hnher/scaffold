<?php

namespace App\Logic;

use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Log;

class UserLogic extends BaseLogic
{
    public function profile(User $user): User
    {
        Log::info('查询当前用户资料', ['user_id' => $user->id]);

        return $user;
    }

    /**
     * @return LengthAwarePaginator<int, User>
     */
    public function getList(int $page = 1, int $limit = 20): LengthAwarePaginator
    {
        return User::query()->paginate($limit, ['*'], 'page', $page);
    }
}
