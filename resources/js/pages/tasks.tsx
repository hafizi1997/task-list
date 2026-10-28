import { Head, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layouts/app-layout";
import { CreateTaskDialog } from "@/components/tasks/create-task-dialog";
import { TaskCard } from "@/components/tasks/task-card";
import { TaskFilters } from "@/components/tasks/task-filters";
import { TaskPagination } from "@/components/tasks/task-pagination";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { PaginatedTasks, Status } from "@/types/task";

const formatDate = (value: string) =>
    new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(new Date(value));

export default function Tasks({
    tasks,
    stats,
    statuses,
}: {
    tasks: PaginatedTasks;
    stats: { total: number; completed: number };
    statuses: Status[];
}) {
    const { url } = usePage();
    const params = new URLSearchParams(url.split("?")[1] ?? "");
    const [filter, setFilter] = useState<"all" | "open" | "completed">(
        (params.get("filter") as "open" | "completed") ?? "all",
    );
    const [query, setQuery] = useState(params.get("search") ?? "");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);
    useEffect(() => {
        const start = router.on("start", () => setIsNavigating(true));
        const finish = router.on("finish", () => setIsNavigating(false));
        return () => {
            start();
            finish();
        };
    }, []);
    const completed = stats.completed;
    const applyFilters = (nextFilter = filter, nextQuery = query) =>
        router.get(
            "/tasks",
            {
                filter: nextFilter === "all" ? undefined : nextFilter,
                search: nextQuery || undefined,
            },
            { preserveState: true, preserveScroll: true },
        );

    return (
        <>
            <Head title="Tasks" />
            <AppLayout>
                {isNavigating && (
                    <div
                        className="fixed inset-x-0 top-0 z-[60] h-1 animate-pulse bg-[var(--primary)]"
                        aria-label="Loading"
                    />
                )}
                <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                    <div>
                        <p className="mb-2 text-sm font-medium text-[#777f91]">
                            {new Intl.DateTimeFormat("en", {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                            }).format(new Date())}
                        </p>
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Good morning 👋
                        </h1>
                        <p className="mt-2 text-[#788194]">
                            Here’s what’s on your plate today.
                        </p>
                    </div>
                    <Button onClick={() => setShowCreateModal(true)}>
                        <span className="mr-2">+</span> New task
                    </Button>
                </header>
                <div className="mt-9 grid gap-4 sm:grid-cols-3">
                    <Card className="p-5">
                        <p className="text-sm text-[#7c8495]">Total tasks</p>
                        <p className="mt-2 text-3xl font-bold">{stats.total}</p>
                    </Card>
                    <Card className="p-5">
                        <p className="text-sm text-[#7c8495]">Completed</p>
                        <p className="mt-2 text-3xl font-bold text-[#37a878]">
                            {completed}
                        </p>
                    </Card>
                    <Card className="p-5">
                        <p className="text-sm text-[#7c8495]">Remaining</p>
                        <p className="mt-2 text-3xl font-bold text-[#e29a39]">
                            {stats.total - stats.completed}
                        </p>
                    </Card>
                </div>
                <TaskFilters
                    filter={filter}
                    setFilter={(value) => {
                        setFilter(value);
                        applyFilters(value, query);
                    }}
                    query={query}
                    setQuery={setQuery}
                    onSearch={() => applyFilters(filter, query)}
                />
                <Card className="mt-4 overflow-hidden">
                    {tasks.data.length ? (
                        tasks.data.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                formatDate={formatDate}
                            />
                        ))
                    ) : (
                        <p className="px-6 py-14 text-center text-sm text-[#7c8495]">
                            No tasks match your filters.
                        </p>
                    )}
                    <TaskPagination links={tasks.links} />
                </Card>
                <CreateTaskDialog
                    statuses={statuses}
                    open={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                />
            </AppLayout>
        </>
    );
}
