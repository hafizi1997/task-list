import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({
    className,
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className={cn(
                "h-11 w-full rounded-xl border border-[#dfe3eb] bg-white px-4 text-sm outline-none transition placeholder:text-[#a1a7b3] focus:border-[#5b5ce2] focus:ring-2 focus:ring-[#5b5ce2]/15",
                className,
            )}
            {...props}
        />
    );
}
