import { createInertiaApp } from '@inertiajs/react';

import { ToastHost } from '@/components/feedback/toast';

import '../css/app.css';

createInertiaApp({
    pages: {
        path: './pages',
        extension: '.jsx',
    },
    strictMode: true,
    withApp: (app) => (
        <>
            {app}
            <ToastHost />
        </>
    ),
    title: (title, page) => {
        const appName = page.props.appName ?? 'Laravel Scaffold';

        return title && title !== appName ? `${title} · ${appName}` : appName;
    },
});
