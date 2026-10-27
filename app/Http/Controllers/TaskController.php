<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Task::query()->latest();
        if ($request->filled('search')) {
            $search = $request->string('search')->toString();
            $query->where(fn ($builder) => $builder->where('title', 'like', "%{$search}%")->orWhere('description', 'like', "%{$search}%"));
        }
        if ($request->input('filter') === 'completed') $query->where('completed', true);
        if ($request->input('filter') === 'open') $query->where('completed', false);
        return Inertia::render('tasks', [
            'tasks' => $query->paginate(20)->withQueryString(),
            'stats' => [
                'total' => Task::count(),
                'completed' => Task::where('completed', true)->count(),
            ],
        ]);
    }

    public function store(StoreTaskRequest $request)
    {
        Task::create($request->validated());
        return to_route('tasks')->with('success', 'Task created successfully.');
    }

    public function show(Task $task): Response
    {
        return Inertia::render('task-detail', ['task' => $task]);
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task->update($request->validated());
        return to_route('tasks.show', $task)->with('success', 'Task updated successfully.');
    }

    public function toggleCompletion(Task $task)
    {
        $task->update(['completed' => ! $task->completed]);
        return to_route('tasks.show', $task)->with('success', $task->completed ? 'Task marked as complete.' : 'Task marked as incomplete.');
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return to_route('tasks')->with('success', 'Task deleted successfully.');
    }
}
