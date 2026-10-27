import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Button({
    className,
    variant = "primary",
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "outline";
}) {
    return (
        <button
            className={cn(
                "rounded-xl px-5 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]",
                variant === "primary"
                    ? "bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20 hover:bg-[#4748c9]"
                    : "border border-[var(--border)] bg-white text-[#667085] hover:bg-[#f7f8fa]",
                className,
            )}
            {...props}
        />
    );
}
