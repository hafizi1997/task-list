<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use App\Models\Status;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Task::query()->with('status')->latest();
        if ($request->filled('search')) {
            $search = $request->string('search')->toString();
            $query->where(fn ($builder) => $builder->where('title', 'like', "%{$search}%")->orWhere('description', 'like', "%{$search}%"));
        }
        if ($request->input('filter')) $query->whereHas('status', fn ($status) => $status->where('slug', $request->input('filter')));
        return Inertia::render('tasks', [
            'tasks' => $query->paginate(20)->withQueryString(),
            'statuses' => Status::orderBy('id')->get(['id', 'name', 'slug']),
            'stats' => [
                'total' => Task::count(),
                'completed' => Task::whereHas('status', fn ($status) => $status->where('slug', 'completed'))->count(),
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
        return Inertia::render('task-detail', ['task' => $task->load('status'), 'statuses' => Status::orderBy('id')->get(['id', 'name', 'slug'])]);
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task->update($request->validated());
        return to_route('tasks.show', $task)->with('success', 'Task updated successfully.');
    }

    public function toggleCompletion(Task $task)
    {
        $isCompleted = $task->status?->slug === 'completed';
        $status = Status::where('slug', $isCompleted ? 'open' : 'completed')->firstOrFail();
        $task->update(['status_id' => $status->id]);
        return to_route('tasks.show', $task)->with('success', $isCompleted ? 'Task marked as incomplete.' : 'Task marked as complete.');
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return to_route('tasks')->with('success', 'Task deleted successfully.');
    }
}
