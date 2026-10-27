<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Models\Task;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('tasks', ['tasks' => Task::query()->latest()->get()]);
    }

    public function store(StoreTaskRequest $request)
    {
        Task::create($request->validated());
        return to_route('tasks');
    }

    public function show(Task $task): Response
    {
        return Inertia::render('task-detail', ['task' => $task]);
    }
}
