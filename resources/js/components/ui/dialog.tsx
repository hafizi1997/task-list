import type { PropsWithChildren } from "react";
import { useEffect, useRef } from "react";

export function Dialog({
    open,
    onClose,
    title,
    description,
    children,
}: PropsWithChildren<{
    open: boolean;
    onClose: () => void;
    title: string;
    description?: string;
}>) {
    const dialogRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!open) return;
        const previous = document.activeElement as HTMLElement | null;
        const dialog = dialogRef.current;
        const focusable = () =>
            Array.from(
                dialog?.querySelectorAll<HTMLElement>(
                    'button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
                ) ?? [],
            );
        focusable()[0]?.focus();
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
            if (event.key !== "Tab") return;
            const elements = focusable();
            if (!elements.length) return;
            const first = elements[0];
            const last = elements[elements.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            previous?.focus();
        };
    }, [open, onClose]);
    if (!open) return null;
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#172033]/45 p-4"
            onMouseDown={(event) =>
                event.target === event.currentTarget && onClose()
            }
        >
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="dialog-title"
                className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
            >
                <div className="flex items-start justify-between">
                    <div>
                        <h2 id="dialog-title" className="text-xl font-bold">
                            {title}
                        </h2>
                        {description && (
                            <p className="mt-1 text-sm text-[#7c8495]">
                                {description}
                            </p>
                        )}
                    </div>
                    <button
                        type="button"
                        aria-label="Close dialog"
                        onClick={onClose}
                        className="text-2xl leading-none text-[#9aa1ad] hover:text-[#172033]"
                    >
                        ×
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
