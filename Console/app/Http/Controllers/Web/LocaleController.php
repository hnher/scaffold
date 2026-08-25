<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

final class LocaleController extends Controller
{
    public function __invoke(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'locale' => [
                'required',
                'string',
                Rule::in(array_keys(config('app.supported_locales', []))),
            ],
        ]);

        $request->session()->put('locale', $validated['locale']);

        return back();
    }
}
