import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';

type Task = {
    id: number;
    title: string;
    description: string;
    long_description: string | null;
    completed: boolean;
    created_at: string;
};

type Props = { tasks: Task[] };

function formatDate(value: string) {
    return new Intl.DateTimeFormat('en', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(value));
}

export default function Tasks({ tasks }: Props) {
    const [filter, setFilter] = useState<'all' | 'open' | 'completed'>('all');
    const [query, setQuery] = useState('');

    const visibleTasks = useMemo(() => {
        return tasks.filter((task) => {
            const matchesFilter =
                filter === 'all' ||
                (filter === 'completed' ? task.completed : !task.completed);
            const text = `${task.title} ${task.description}`.toLowerCase();
            return matchesFilter && text.includes(query.toLowerCase());
        });
    }, [filter, query, tasks]);

    const completed = tasks.filter((task) => task.completed).length;

    return (
        <>
            <Head title="Tasks" />
            <main className="min-h-screen bg-[#f7f8fa] text-[#172033]">
                <div className="mx-auto flex min-h-screen max-w-7xl">
                    <aside className="hidden w-64 shrink-0 flex-col border-r border-[#e7eaf0] bg-white px-6 py-8 lg:flex">
                        <div className="mb-14 flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5b5ce2] text-sm font-bold text-white">T</div>
                            <span className="text-lg font-semibold tracking-tight">Taskflow</span>
                        </div>
                        <nav className="space-y-2 text-sm font-medium">
                            <a className="flex items-center gap-3 rounded-xl bg-[#eeeeff] px-4 py-3 text-[#5556d6]" href="/tasks">
                                <span>✓</span> My tasks
                            </a>
                            <a className="flex items-center gap-3 rounded-xl px-4 py-3 text-[#7b8496] hover:bg-[#f7f8fa]" href="/dashboard">
                                <span>▦</span> Dashboard
                            </a>
                        </nav>
                        <div className="mt-auto rounded-2xl bg-[#f4f5ff] p-4 text-sm">
                            <p className="font-semibold text-[#303163]">Stay on track</p>
                            <p className="mt-1 text-xs leading-5 text-[#777ba4]">Small steps every day add up to big results.</p>
                        </div>
                    </aside>

                    <section className="w-full px-5 py-7 sm:px-8 lg:px-12 lg:py-10">
                        <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                            <div>
                                <p className="mb-2 text-sm font-medium text-[#777f91]">Tuesday, October 27</p>
                                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Good morning 👋</h1>
                                <p className="mt-2 text-[#788194]">Here’s what’s on your plate today.</p>
                            </div>
                            <button className="rounded-xl bg-[#5b5ce2] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5b5ce2]/20 transition hover:bg-[#4748c9]">
                                <span className="mr-2 text-base">+</span> New task
                            </button>
                        </header>

                        <div className="mt-9 grid gap-4 sm:grid-cols-3">
                            <div className="rounded-2xl border border-[#e9ebf1] bg-white p-5"><p className="text-sm text-[#7c8495]">Total tasks</p><p className="mt-2 text-3xl font-bold">{tasks.length}</p></div>
                            <div className="rounded-2xl border border-[#e9ebf1] bg-white p-5"><p className="text-sm text-[#7c8495]">Completed</p><p className="mt-2 text-3xl font-bold text-[#37a878]">{completed}</p></div>
                            <div className="rounded-2xl border border-[#e9ebf1] bg-white p-5"><p className="text-sm text-[#7c8495]">Remaining</p><p className="mt-2 text-3xl font-bold text-[#e29a39]">{tasks.length - completed}</p></div>
                        </div>

                        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex gap-1 rounded-xl bg-[#eceef3] p-1 text-sm font-medium">
                                {(['all', 'open', 'completed'] as const).map((item) => <button key={item} onClick={() => setFilter(item)} className={`rounded-lg px-4 py-2 capitalize transition ${filter === item ? 'bg-white text-[#3537bb] shadow-sm' : 'text-[#7a8293]'}`}>{item === 'all' ? 'All tasks' : item}</button>)}
                            </div>
                            <label className="flex items-center gap-2 rounded-xl border border-[#e4e7ed] bg-white px-4 py-2.5 text-sm text-[#8a91a0] sm:w-64">
                                <span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent outline-none placeholder:text-[#a1a7b3]" placeholder="Search tasks..." />
                            </label>
                        </div>

                        <div className="mt-4 overflow-hidden rounded-2xl border border-[#e9ebf1] bg-white">
                            {visibleTasks.length === 0 ? <div className="px-6 py-14 text-center text-sm text-[#7c8495]">No tasks match your filters.</div> : visibleTasks.map((task) => (
                                <Link href={`/tasks/${task.id}`} key={task.id} className="flex items-start gap-4 border-b border-[#eef0f4] px-5 py-5 transition hover:bg-[#fafaff] last:border-b-0 sm:px-6">
                                    <div className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${task.completed ? 'border-[#42b883] bg-[#42b883] text-xs text-white' : 'border-[#cfd4df]'}`}>{task.completed && '✓'}</div>
                                    <div className="min-w-0 flex-1"><div className="flex flex-col justify-between gap-1 sm:flex-row"><h2 className={`font-semibold ${task.completed ? 'text-[#9aa1ad] line-through' : ''}`}>{task.title}</h2><time className="text-xs text-[#a0a7b3]">{formatDate(task.created_at)}</time></div><p className="mt-1 line-clamp-2 text-sm leading-6 text-[#7b8494]">{task.description}</p></div>
                                    <button aria-label={`More options for ${task.title}`} className="text-xl leading-none text-[#b3b9c4]">···</button>
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}
