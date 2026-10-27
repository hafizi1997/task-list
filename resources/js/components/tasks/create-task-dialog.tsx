import { useForm } from "@inertiajs/react";
import type { FormEvent } from "react";
import { Dialog } from "@/components/ui/dialog";

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
            <form onSubmit={submit} className="mt-6 space-y-5">
                <label className="block text-sm font-semibold">
                    Title
                    <input
                        value={form.data.title}
                        onChange={(event) =>
                            form.setData("title", event.target.value)
                        }
                        className="mt-2 w-full rounded-xl border border-[#dfe3eb] px-4 py-3 font-normal outline-none focus:border-[#5b5ce2]"
                        placeholder="e.g. Prepare project proposal"
                        autoFocus
                    />
                    {form.errors.title && (
                        <span className="mt-1 block text-xs text-red-600">
                            {form.errors.title}
                        </span>
                    )}
                </label>
                <label className="block text-sm font-semibold">
                    Description
                    <textarea
                        value={form.data.description}
                        onChange={(event) =>
                            form.setData("description", event.target.value)
                        }
                        className="mt-2 min-h-24 w-full resize-y rounded-xl border border-[#dfe3eb] px-4 py-3 font-normal outline-none focus:border-[#5b5ce2]"
                        placeholder="What needs to be done?"
                    />
                    {form.errors.description && (
                        <span className="mt-1 block text-xs text-red-600">
                            {form.errors.description}
                        </span>
                    )}
                </label>
                <label className="block text-sm font-semibold">
                    More details{" "}
                    <span className="font-normal text-[#9aa1ad]">
                        (optional)
                    </span>
                    <textarea
                        value={form.data.long_description}
                        onChange={(event) =>
                            form.setData("long_description", event.target.value)
                        }
                        className="mt-2 min-h-24 w-full resize-y rounded-xl border border-[#dfe3eb] px-4 py-3 font-normal outline-none focus:border-[#5b5ce2]"
                        placeholder="Add notes or context..."
                    />
                </label>
                <div className="flex justify-end gap-3 border-t border-[#edf0f4] pt-5">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl border border-[#e1e4eb] px-5 py-3 text-sm font-semibold text-[#667085]"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={form.processing}
                        className="rounded-xl bg-[#5b5ce2] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
                    >
                        {form.processing ? "Creating..." : "Create task"}
                    </button>
                </div>
            </form>
        </Dialog>
    );
}
