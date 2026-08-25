<?php

declare(strict_types=1);

use App\Http\Controllers\Web\LocaleController;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

Route::get('/', static function (): Response {
    $locales = collect(config('app.supported_locales', []))
        ->map(static fn (array $options, string $value): array => [
            'value' => $value,
            'label' => $options['label'],
        ])
        ->values()
        ->all();

    return Inertia::render('Home', [
        'appName' => 'Laravel Scaffold',
        'locale' => app()->getLocale(),
        'locales' => $locales,
        'translations' => Lang::get('home'),
    ]);
})->name('home');

Route::post('/locale', LocaleController::class)->name('locale.update');
