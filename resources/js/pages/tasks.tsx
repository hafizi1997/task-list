import { Head } from "@inertiajs/react";
import { useMemo, useState } from "react";
import { AppLayout } from "@/components/layouts/app-layout";
import { CreateTaskDialog } from "@/components/tasks/create-task-dialog";
import { TaskCard } from "@/components/tasks/task-card";
import { TaskFilters } from "@/components/tasks/task-filters";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Task } from "@/types/task";

const formatDate = (value: string) =>
    new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(new Date(value));

export default function Tasks({ tasks }: { tasks: Task[] }) {
    const [filter, setFilter] = useState<"all" | "open" | "completed">("all");
    const [query, setQuery] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const completed = tasks.filter((task) => task.completed).length;
    const visibleTasks = useMemo(
        () =>
            tasks.filter((task) => {
                const matchesFilter =
                    filter === "all" ||
                    (filter === "completed" ? task.completed : !task.completed);
                return (
                    matchesFilter &&
                    `${task.title} ${task.description}`
                        .toLowerCase()
                        .includes(query.toLowerCase())
                );
            }),
        [filter, query, tasks],
    );

    return (
        <>
            <Head title="Tasks" />
            <AppLayout>
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
                        <p className="mt-2 text-3xl font-bold">
                            {tasks.length}
                        </p>
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
                            {tasks.length - completed}
                        </p>
                    </Card>
                </div>
                <TaskFilters
                    filter={filter}
                    setFilter={setFilter}
                    query={query}
                    setQuery={setQuery}
                />
                <Card className="mt-4 overflow-hidden">
                    {visibleTasks.length ? (
                        visibleTasks.map((task) => (
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
                </Card>
                <CreateTaskDialog
                    open={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                />
            </AppLayout>
        </>
    );
}
