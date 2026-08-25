<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\GetListRequest;
use App\Logic\UserLogic;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class UserController extends ApiController
{
    private readonly UserLogic $logic;

    public function __construct(UserLogic $logic)
    {
        $this->logic = $logic;
    }

    public function profile(Request $request): User
    {
        /** @var User $user */
        $user = $request->user();

        return $this->logic->profile($user);
    }

    /**
     * @return LengthAwarePaginator<int, User>
     */
    public function getList(GetListRequest $request): LengthAwarePaginator
    {
        $page = (int) $request->input('page', 1);
        $limit = (int) $request->input('limit', 20);

        return $this->logic->getList($page, $limit);
    }
}
