<?php

namespace App\Http\Controllers\Api;

class HomeController extends ApiController
{
    public function index() {
        return [
            'app' => config('app.name'),
        ];
    }
}
