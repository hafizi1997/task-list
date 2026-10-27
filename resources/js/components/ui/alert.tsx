import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Alert({
    variant = "default",
    className,
    ...props
}: HTMLAttributes<HTMLDivElement> & { variant?: "default" | "destructive" }) {
    return (
        <div
            role="alert"
            className={cn(
                "relative w-full rounded-lg border px-4 py-3 text-sm",
                variant === "destructive"
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700",
                className,
            )}
            {...props}
        />
    );
}
