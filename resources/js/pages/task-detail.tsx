import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import { EditTaskDialog } from "@/components/tasks/edit-task-dialog";
import { DeleteTaskDialog } from "@/components/tasks/delete-task-dialog";
import type { Task } from "@/types/task";

type Props = { task: Task };

function formatDate(value: string) {
    return new Intl.DateTimeFormat("en", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(new Date(value));
}

export default function TaskDetail({ task }: Props) {
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    return (
        <>
            <Head title={task.title} />
            <main className="min-h-screen bg-[#f7f8fa] text-[#172033]">
                <div className="mx-auto max-w-5xl px-5 py-7 sm:px-8 lg:px-12 lg:py-10">
                    <Link
                        href="/tasks"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#656bd7] transition hover:text-[#454bc6]"
                    >
                        <span className="text-lg">←</span> Back to tasks
                    </Link>

                    <div className="mt-8 overflow-hidden rounded-3xl border border-[#e9ebf1] bg-white shadow-sm">
                        <div className="h-2 bg-gradient-to-r from-[#5b5ce2] to-[#8b7cf6]" />
                        <div className="p-6 sm:p-10">
                            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                                <div className="flex items-start gap-4">
                                    <div
                                        className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${task.completed ? "border-[#42b883] bg-[#42b883] text-white" : "border-[#cfd4df]"}`}
                                    >
                                        {task.completed && "✓"}
                                    </div>
                                    <div>
                                        <p className="mb-2 text-sm font-medium text-[#7d8595]">
                                            Task #{task.id}
                                        </p>
                                        <h1
                                            className={`text-3xl font-bold tracking-tight sm:text-4xl ${task.completed ? "text-[#8f97a4] line-through" : ""}`}
                                        >
                                            {task.title}
                                        </h1>
                                    </div>
                                </div>
                                <span
                                    className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${task.completed ? "bg-[#eaf8f1] text-[#299766]" : "bg-[#fff4df] text-[#b77918]"}`}
                                >
                                    {task.completed
                                        ? "Completed"
                                        : "In progress"}
                                </span>
                            </div>

                            <div className="mt-9 grid gap-4 border-y border-[#edf0f4] py-5 text-sm sm:grid-cols-2">
                                <div>
                                    <p className="text-[#9299a7]">Created</p>
                                    <p className="mt-1 font-semibold">
                                        {formatDate(task.created_at)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[#9299a7]">
                                        Last updated
                                    </p>
                                    <p className="mt-1 font-semibold">
                                        {formatDate(task.updated_at ?? task.created_at)}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-9 space-y-8">
                                <section>
                                    <h2 className="text-sm font-bold uppercase tracking-wider text-[#7d8595]">
                                        Overview
                                    </h2>
                                    <p className="mt-3 text-base leading-8 text-[#596477]">
                                        {task.description}
                                    </p>
                                </section>
                                {task.long_description && (
                                    <section>
                                        <h2 className="text-sm font-bold uppercase tracking-wider text-[#7d8595]">
                                            Details
                                        </h2>
                                        <p className="mt-3 whitespace-pre-line text-base leading-8 text-[#596477]">
                                            {task.long_description}
                                        </p>
                                    </section>
                                )}
                            </div>

                            <div className="mt-10 flex flex-wrap gap-3 border-t border-[#edf0f4] pt-7">
                                <button
                                    onClick={() => setShowEditDialog(true)}
                                    className="rounded-xl bg-[#5b5ce2] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5b5ce2]/20 transition hover:bg-[#4748c9]"
                                >
                                    Edit task
                                </button>
                                <button
                                    onClick={() => setShowDeleteDialog(true)}
                                    className="rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() =>
                                        router.patch(
                                            `/tasks/${task.id}/completion`,
                                        )
                                    }
                                    className="rounded-xl border border-[#e1e4eb] px-5 py-3 text-sm font-semibold text-[#667085] transition hover:bg-[#f7f8fa]"
                                >
                                    Mark as{" "}
                                    {task.completed ? "incomplete" : "complete"}
                                </button>
                                <Link
                                    href="/tasks"
                                    className="rounded-xl border border-[#e1e4eb] px-5 py-3 text-sm font-semibold text-[#667085] transition hover:bg-[#f7f8fa]"
                                >
                                    Close
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <EditTaskDialog
                task={task}
                open={showEditDialog}
                onClose={() => setShowEditDialog(false)}
            />
            <DeleteTaskDialog
                task={task}
                open={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
            />
        </>
    );
}
