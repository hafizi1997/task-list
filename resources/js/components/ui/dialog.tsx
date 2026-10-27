import type { PropsWithChildren } from "react";

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
    if (!open) return null;
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#172033]/45 p-4"
            onMouseDown={(event) =>
                event.target === event.currentTarget && onClose()
            }
        >
            <div
                role="dialog"
                aria-modal="true"
                className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
            >
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-xl font-bold">{title}</h2>
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
