import { Link } from "@inertiajs/react";
import type { PropsWithChildren } from "react";
import { FlashMessages } from "@/components/shared/flash-messages";

export function AppLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-[#f7f8fa] text-[#172033]">
            <div className="mx-auto flex min-h-screen max-w-7xl">
                <aside className="hidden w-64 shrink-0 flex-col border-r border-[#e7eaf0] bg-white px-6 py-8 lg:flex">
                    <div className="mb-14 flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5b5ce2] text-sm font-bold text-white">
                            T
                        </div>
                        <span className="text-lg font-semibold tracking-tight">
                            Taskflow
                        </span>
                    </div>
                    <nav className="space-y-2 text-sm font-medium">
                        <Link
                            href="/tasks"
                            className="flex items-center gap-3 rounded-xl bg-[#eeeeff] px-4 py-3 text-[#5556d6]"
                        >
                            ✓ My tasks
                        </Link>
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-[#7b8496] hover:bg-[#f7f8fa]"
                        >
                            ▦ Dashboard
                        </Link>
                    </nav>
                    <div className="mt-auto rounded-2xl bg-[#f4f5ff] p-4 text-sm">
                        <p className="font-semibold text-[#303163]">
                            Stay on track
                        </p>
                        <p className="mt-1 text-xs leading-5 text-[#777ba4]">
                            Small steps every day add up to big results.
                        </p>
                    </div>
                </aside>
                <section className="w-full px-5 py-7 sm:px-8 lg:px-12 lg:py-10">
                    <FlashMessages />
                    {children}
                </section>
            </div>
        </div>
    );
}
