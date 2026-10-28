export type Status = { id: number; name: string; slug: string };
export type Task = {
    id: number;
    title: string;
    description: string;
    long_description: string | null;
    completed: boolean;
    created_at: string;
    updated_at?: string;
    status: Status | null;
};

export type PaginatedTasks = {
    data: Task[];
    current_page: number;
    last_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
};
