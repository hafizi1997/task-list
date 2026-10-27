import { Input } from "@/components/ui/input";

export function TaskFilters({
    filter,
    setFilter,
    query,
    setQuery,
    onSearch,
}: {
    filter: string;
    setFilter: (value: "all" | "open" | "completed") => void;
    query: string;
    setQuery: (value: string) => void;
    onSearch: () => void;
}) {
    return (
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-1 rounded-xl bg-[#eceef3] p-1 text-sm font-medium">
                {(["all", "open", "completed"] as const).map((item) => (
                    <button
                        key={item}
                        onClick={() => setFilter(item)}
                        className={`rounded-lg px-4 py-2 capitalize transition ${filter === item ? "bg-white text-[#3537bb] shadow-sm" : "text-[#7a8293]"}`}
                    >
                        {item === "all" ? "All tasks" : item}
                    </button>
                ))}
            </div>
            <label className="flex items-center gap-2 sm:w-64">
                <span className="text-[#8a91a0]">⌕</span>
                <Input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyDown={(event) => event.key === "Enter" && onSearch()}
                    placeholder="Search tasks..."
                />
            </label>
        </div>
    );
}
