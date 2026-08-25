import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Toaster as Sonner } from 'sonner';

const getDocumentTheme = () => {
    if (typeof document === 'undefined') {
        return 'system';
    }

    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
};

const Toaster = ({ ...props }) => {
    const [theme, setTheme] = useState(getDocumentTheme);

    useEffect(() => {
        const observer = new MutationObserver(() => setTheme(getDocumentTheme()));

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    return (
        <Sonner
            theme={theme}
            className="toaster group"
            icons={{
                success: <CircleCheckIcon />,
                info: <InfoIcon />,
                warning: <TriangleAlertIcon />,
                error: <OctagonXIcon />,
                loading: <Loader2Icon className="animate-spin" />,
            }}
            style={{
                '--normal-bg': 'var(--popover)',
                '--normal-text': 'var(--popover-foreground)',
                '--normal-border': 'var(--border)',
                '--border-radius': 'var(--radius)',
            }}
            {...props}
        />
    );
};

export { Toaster };
