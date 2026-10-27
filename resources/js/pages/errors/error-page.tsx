import { Head, Link } from "@inertiajs/react";

export default function ErrorPage({
    status,
    message,
}: {
    status: number;
    message: string;
}) {
    return (
        <>
            <Head title={`${status} - Error`} />
            <main className="flex min-h-screen items-center justify-center bg-[#f7f8fa] px-6 text-[#172033]">
                <div className="w-full max-w-lg text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#eeeeff] text-2xl font-bold text-[#5b5ce2]">
                        {status}
                    </div>
                    <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-[#7c8495]">
                        Something went wrong
                    </p>
                    <h1 className="mt-3 text-3xl font-bold tracking-tight">
                        We couldn’t complete that request
                    </h1>
                    <p className="mx-auto mt-4 max-w-md leading-7 text-[#788194]">
                        {message}
                    </p>
                    <div className="mt-8 flex justify-center gap-3">
                        <button
                            onClick={() => window.history.back()}
                            className="rounded-xl border border-[#e1e4eb] bg-white px-5 py-3 text-sm font-semibold text-[#667085] hover:bg-[#f7f8fa]"
                        >
                            Go back
                        </button>
                        <Link
                            href="/tasks"
                            className="rounded-xl bg-[#5b5ce2] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5b5ce2]/20 hover:bg-[#4748c9]"
                        >
                            View tasks
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
