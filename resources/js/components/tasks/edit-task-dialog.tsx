import { useForm } from "@inertiajs/react";
import type { FormEvent } from "react";
import { Dialog } from "@/components/ui/dialog";
import { TaskForm } from "@/components/tasks/task-form";
import type { Task } from "@/types/task";

export function EditTaskDialog({
    task,
    open,
    onClose,
    statuses,
}: {
    task: Task;
    open: boolean;
    onClose: () => void;
    statuses: { id: number; name: string; slug: string }[];
}) {
    const form = useForm({
        title: task.title,
        description: task.description,
        long_description: task.long_description ?? "",
        status_id: task.status?.id.toString() ?? "",
    });
    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.put(`/tasks/${task.id}`, { onSuccess: onClose });
    }
    return (
        <Dialog
            open={open}
            onClose={onClose}
            title="Edit task"
            description="Update the details for this task."
        >
            <TaskForm
                data={form.data}
                setData={(key, value) => form.setData(key, value)}
                errors={form.errors}
                processing={form.processing}
                submitLabel="Save changes"
                onSubmit={submit}
                onCancel={onClose}
                statuses={statuses}
            />
        </Dialog>
    );
}
