import { toast as sonnerToast } from 'sonner';

import { Toaster } from '@/components/ui/sonner';

const DEFAULT_DURATION = 4000;

export const toast = {
    error(message, options = {}) {
        return sonnerToast.error(message, {
            duration: DEFAULT_DURATION,
            ...options,
        });
    },

    info(message, options = {}) {
        return sonnerToast.info(message, {
            duration: DEFAULT_DURATION,
            ...options,
        });
    },

    success(message, options = {}) {
        return sonnerToast.success(message, {
            duration: 3000,
            ...options,
        });
    },

    dismiss(id) {
        sonnerToast.dismiss(id);
    },
};

export function ToastHost() {
    return (
        <Toaster
            closeButton
            duration={DEFAULT_DURATION}
            position="top-center"
            richColors
            toastOptions={{
                classNames: {
                    description: 'text-muted-foreground',
                },
            }}
        />
    );
}
