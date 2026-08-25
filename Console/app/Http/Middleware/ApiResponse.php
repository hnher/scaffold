<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Carbon;
use stdClass;
use Symfony\Component\HttpFoundation\Response;

final class ApiResponse
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // 非 JSON 类型和异常响应交给原响应或全局异常处理器处理。
        if (! $response instanceof JsonResponse || $response->exception instanceof Exception) {
            return $response;
        }

        $original = $response->getData(true);

        // 已符合统一响应契约时不再重复包装。
        if (is_array($original) && isset($original['code'], $original['message']) && array_key_exists('data', $original)) {
            return $response;
        }

        $data = [
            'code' => $response->getStatusCode(),
            'message' => __('api.ok'),
            'datetime' => Carbon::now()->toDateTimeString(),
            'data' => $original ?? new stdClass,
        ];

        if ($response->original instanceof LengthAwarePaginator) {
            $data['data'] = [
                'current_page' => $original['current_page'],
                'last_page' => $original['last_page'],
                'per_page' => $original['per_page'],
                'total' => $original['total'],
                'items' => $original['data'],
            ];
        }

        $response->setData($data);

        return $response;
    }
}
