import { Link } from "@inertiajs/react";
import { TaskStatus } from "@/components/tasks/task-status";
import type { Task } from "@/types/task";

export function TaskCard({
    task,
    formatDate,
}: {
    task: Task;
    formatDate: (date: string) => string;
}) {
    const completed = task.status?.slug === "completed";
    return (
        <Link
            href={`/tasks/${task.id}`}
            className="flex items-start gap-4 border-b border-[#eef0f4] px-5 py-5 transition hover:bg-[#fafaff] last:border-0 sm:px-6"
        >
            <TaskStatus completed={completed} />
            <div className="min-w-0 flex-1">
                <div className="flex flex-col justify-between gap-1 sm:flex-row">
                    <h2
                        className={`font-semibold ${completed ? "text-[#9aa1ad] line-through" : ""}`}
                    >
                        {task.title}
                    </h2>
                    <time className="text-xs text-[#a0a7b3]">
                        {formatDate(task.created_at)}
                    </time>
                </div>
                <p className="mt-1 line-clamp-2 text-sm leading-6 text-[#7b8494]">
                    {task.description}
                </p>
            </div>
            <span className="text-xl text-[#b3b9c4]">···</span>
        </Link>
    );
}
