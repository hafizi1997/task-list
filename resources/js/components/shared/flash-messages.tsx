import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Alert } from "@/components/ui/alert";

type Flash = { success?: string; error?: string };

export function FlashMessages() {
    const { flash } = usePage<{ flash: Flash }>().props;
    const [visible, setVisible] = useState(true);
    const message = flash?.success ?? flash?.error;
    useEffect(() => {
        setVisible(true);
        if (!message) return;
        const timer = window.setTimeout(() => setVisible(false), 4500);
        return () => window.clearTimeout(timer);
    }, [message]);
    if (!message || !visible) return null;
    return (
        <Alert
            variant={flash?.success ? "default" : "destructive"}
            className="mb-6 flex items-center justify-between font-medium"
        >
            <span>{message}</span>
            <button
                onClick={() => setVisible(false)}
                aria-label="Dismiss message"
                className="ml-4 text-lg opacity-70"
            >
                ×
            </button>
        </Alert>
    );
}
