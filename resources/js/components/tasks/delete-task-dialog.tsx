import { router } from "@inertiajs/react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Task } from "@/types/task";

export function DeleteTaskDialog({
    task,
    open,
    onClose,
}: {
    task: Task;
    open: boolean;
    onClose: () => void;
}) {
    function destroy() {
        router.delete(`/tasks/${task.id}`, { onFinish: onClose });
    }
    return (
        <Dialog
            open={open}
            onClose={onClose}
            title="Delete task"
            description="This action cannot be undone."
        >
            <div className="mt-6">
                <p className="text-sm leading-6 text-[#667085]">
                    Are you sure you want to delete{" "}
                    <strong className="text-[#172033]">{task.title}</strong>?
                </p>
                <div className="mt-6 flex justify-end gap-3">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <button
                        onClick={destroy}
                        className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                    >
                        Delete task
                    </button>
                </div>
            </div>
        </Dialog>
    );
}
