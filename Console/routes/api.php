<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DeviceController;
use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

/**
 * 受保护的路由，必须使用 auth:sanctum 中间件
 */
Route::group(['middleware' => ['auth:sanctum'], 'namespace' => 'Api'], function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    Route::group(['prefix' => 'user'], function () {
        Route::get('/profile', [UserController::class, 'profile']);
        Route::get('/getList', [UserController::class, 'getList']);
    });
});

/**
 * 无需登录即可使用的 Api
 */
Route::group(['namespace' => 'Api'], function () {
    Route::get('/', [HomeController::class, 'index']);

    Route::group(['prefix' => 'device', 'middleware' => 'throttle:60,1'], function () {
        Route::post('/register', [DeviceController::class, 'register']);
    });

    Route::group(['prefix' => 'auth'], function () {
        Route::post('/login', [AuthController::class, 'login']);
    });
});
