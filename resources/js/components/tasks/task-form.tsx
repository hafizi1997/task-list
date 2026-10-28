import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Status } from "@/types/task";

export type TaskFormData = {
    title: string;
    description: string;
    long_description: string;
    status_id: string;
};
export function TaskForm({
    data,
    setData,
    errors,
    processing,
    submitLabel,
    onSubmit,
    onCancel,
    statuses,
}: {
    data: TaskFormData;
    setData: (key: keyof TaskFormData, value: string) => void;
    errors: Partial<Record<keyof TaskFormData, string>>;
    processing: boolean;
    submitLabel: string;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
    statuses: Status[];
}) {
    return (
        <form onSubmit={onSubmit} className="mt-6 space-y-5">
            <label className="block text-sm font-semibold">
                Title
                <Input
                    value={data.title}
                    onChange={(event) => setData("title", event.target.value)}
                    placeholder="e.g. Prepare project proposal"
                    autoFocus
                />
                {errors.title && (
                    <span className="mt-1 block text-xs text-red-600">
                        {errors.title}
                    </span>
                )}
            </label>
            <label className="block text-sm font-semibold">
                Status
                <select
                    value={data.status_id}
                    onChange={(event) =>
                        setData("status_id", event.target.value)
                    }
                    className="mt-2 h-11 w-full rounded-xl border border-[#dfe3eb] bg-white px-4 text-sm font-normal outline-none focus:border-[#5b5ce2]"
                >
                    <option value="">Select status</option>
                    {statuses.map((status) => (
                        <option key={status.id} value={status.id}>
                            {status.name}
                        </option>
                    ))}
                </select>
                {errors.status_id && (
                    <span className="mt-1 block text-xs text-red-600">
                        {errors.status_id}
                    </span>
                )}
            </label>
            <label className="block text-sm font-semibold">
                Description
                <textarea
                    value={data.description}
                    onChange={(event) =>
                        setData("description", event.target.value)
                    }
                    className="mt-2 min-h-24 w-full resize-y rounded-xl border border-[#dfe3eb] px-4 py-3 font-normal outline-none focus:border-[#5b5ce2]"
                    placeholder="What needs to be done?"
                />
                {errors.description && (
                    <span className="mt-1 block text-xs text-red-600">
                        {errors.description}
                    </span>
                )}
            </label>
            <label className="block text-sm font-semibold">
                More details{" "}
                <span className="font-normal text-[#9aa1ad]">(optional)</span>
                <textarea
                    value={data.long_description}
                    onChange={(event) =>
                        setData("long_description", event.target.value)
                    }
                    className="mt-2 min-h-24 w-full resize-y rounded-xl border border-[#dfe3eb] px-4 py-3 font-normal outline-none focus:border-[#5b5ce2]"
                    placeholder="Add notes or context..."
                />
            </label>
            <div className="flex justify-end gap-3 border-t border-[#edf0f4] pt-5">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button disabled={processing}>
                    {processing ? "Saving..." : submitLabel}
                </Button>
            </div>
        </form>
    );
}
