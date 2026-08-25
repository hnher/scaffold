<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#191B22">

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <script>
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            let theme = 'system';

            try {
                theme = localStorage.getItem('scaffold-theme') || 'system';
            } catch (error) {
                // Theme persistence is optional; the page remains usable when storage is unavailable.
            }

            document.documentElement.classList.toggle('dark', theme === 'dark' || (theme === 'system' && prefersDark));
        </script>

        @fonts
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        <x-inertia::head />
    </head>
    <body>
        <x-inertia::app />
    </body>
</html>
