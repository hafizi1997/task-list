export type Task = {
    id: number;
    title: string;
    description: string;
    long_description: string | null;
    completed: boolean;
    created_at: string;
    updated_at?: string;
};
