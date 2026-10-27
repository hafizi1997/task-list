import { Link } from "@inertiajs/react";

export function TaskPagination({
    links,
}: {
    links: { url: string | null; label: string; active: boolean }[];
}) {
    if (links.length <= 3) return null;
    return (
        <nav
            aria-label="Task pagination"
            className="flex flex-wrap justify-center gap-2 border-t border-[#eef0f4] p-4"
        >
            {links.map((link) => (
                <Link
                    key={link.label}
                    href={link.url ?? "#"}
                    preserveScroll
                    className={`rounded-lg px-3 py-2 text-sm ${link.active ? "bg-[var(--primary)] text-white" : link.url ? "text-[#667085] hover:bg-[#f7f8fa]" : "cursor-not-allowed text-[#c1c6d0]"}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </nav>
    );
}
