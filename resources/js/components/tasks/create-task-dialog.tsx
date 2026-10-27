import { useForm } from "@inertiajs/react";
import type { FormEvent } from "react";
import { Dialog } from "@/components/ui/dialog";
import { TaskForm } from "@/components/tasks/task-form";

export function CreateTaskDialog({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    const form = useForm({ title: "", description: "", long_description: "" });
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
            />
        </Dialog>
    );
}
