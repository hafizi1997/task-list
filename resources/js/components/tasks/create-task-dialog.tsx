import { useForm } from "@inertiajs/react";
import type { FormEvent } from "react";
import { Dialog } from "@/components/ui/dialog";
import { TaskForm } from "@/components/tasks/task-form";

export function CreateTaskDialog({
    open,
    onClose,
    statuses,
}: {
    open: boolean;
    onClose: () => void;
    statuses: { id: number; name: string; slug: string }[];
}) {
    const form = useForm({
        title: "",
        description: "",
        long_description: "",
        status_id:
            statuses.find((status) => status.slug === "open")?.id.toString() ??
            "",
    });
    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.post("/tasks", {
            onSuccess: () => {
                form.reset();
                onClose();
            },
        });
    }
    return (
        <Dialog
            open={open}
            onClose={onClose}
            title="Create a new task"
            description="Add a task and keep your day moving."
        >
            <TaskForm
                data={form.data}
                setData={(key, value) => form.setData(key, value)}
                errors={form.errors}
                processing={form.processing}
                submitLabel="Create task"
                onSubmit={submit}
                onCancel={onClose}
                statuses={statuses}
            />
        </Dialog>
    );
}
