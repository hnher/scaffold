<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

final class SetApiLocale
{
    public function handle(Request $request, Closure $next): Response
    {
        $supportedLocales = [];
        foreach (array_keys((array) config('app.supported_locales', [])) as $locale) {
            if (is_string($locale)) {
                $supportedLocales[] = $locale;
            }
        }

        $requestedLocale = $request->header('X-Locale') ?: $request->getPreferredLanguage($supportedLocales);
        $locale = $this->normalizeLocale(is_string($requestedLocale) ? $requestedLocale : null);

        if (! in_array($locale, $supportedLocales, true)) {
            $locale = config('app.fallback_locale', 'en');
        }

        App::setLocale($locale);

        return $next($request);
    }

    private function normalizeLocale(?string $locale): string
    {
        if ($locale === null || $locale === '') {
            return (string) config('app.locale', 'zh_CN');
        }

        return str_starts_with(strtolower($locale), 'zh')
            ? 'zh_CN'
            : explode('-', str_replace('_', '-', $locale))[0];
    }
}
