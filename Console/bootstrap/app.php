<?php

use App\Http\Middleware\ApiResponse;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\SetApiLocale;
use App\Http\Middleware\SetLocale;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Carbon;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\TooManyRequestsHttpException;
use Symfony\Component\Routing\Exception\RouteNotFoundException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            SetLocale::class,
            HandleInertiaRequests::class,
        ]);

        $middleware->api(
            append: [ApiResponse::class],
            prepend: [SetApiLocale::class],
        );
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (Throwable $e) {
            [$status, $code, $message, $errors] = match (true) {
                // 表单验证失败：422，需要把逐字段错误信息带上
                $e instanceof ValidationException => [422, 422, __('exceptions.validation_failed'), $e->errors()],
                // 未登录/token 失效
                $e instanceof AuthenticationException => [401, 401, __('exceptions.unauthenticated'), null],
                // 已登录但无权限访问（比如用了 Gate/Policy 的 authorize()）
                $e instanceof AuthorizationException, $e instanceof AccessDeniedHttpException => [403, 403, __('exceptions.forbidden'), null],
                // 根据主键查不到模型，比如 findOrFail()
                $e instanceof ModelNotFoundException => [404, 404, __('exceptions.not_found'), null],
                // 路由不存在 / 路由命名找不到
                $e instanceof NotFoundHttpException, $e instanceof RouteNotFoundException => [404, 404, __('exceptions.route_not_found'), null],
                // 请求方法不对，比如该用 POST 却用了 GET
                $e instanceof MethodNotAllowedHttpException => [405, 405, __('exceptions.method_not_allowed'), null],
                // 触发了限流（Route::middleware('throttle:60,1')）
                $e instanceof TooManyRequestsHttpException => [429, 429, __('exceptions.too_many_requests'), null],
                // 其余所有携带状态码的 HTTP 异常（abort(400, 'xxx') 之类）
                $e instanceof HttpException => [$e->getStatusCode(), $e->getStatusCode(), $e->getMessage() ?: __('exceptions.server_error'), null],
                // 数据库层异常：绝不能把原始 SQL/字段信息暴露给前端
                $e instanceof QueryException => [500, 500, app()->hasDebugModeEnabled() ? $e->getMessage() : __('exceptions.database_error'), null],
                // 兜底：未预期的异常
                default => [500, $e->getCode() ?: 500, app()->hasDebugModeEnabled() ? $e->getMessage() : __('exceptions.server_error'), null],
            };

            $data = ['code' => (int) $code, 'message' => $message, 'datetime' => Carbon::now()->toDateTimeString(), 'version' => config('app.version')];
            if ($errors !== null) {
                $data['errors'] = $errors;
            }

            $data['data'] = new stdClass;

            return response()->json($data, $status);
        });
    })->create();
