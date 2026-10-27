<?php

use Illuminate\Support\Facades\Route;
use App\Models\Task;

Route::inertia('/', 'welcome')->name('home');

Route::inertia('/dashboard', 'dashboard')->name('dashboard');

Route::get('/tasks', function () {
    return inertia('tasks', [
        'tasks' => Task::query()->latest()->get(),
    ]);
})->name('tasks');

Route::get('/tasks/{task}', function (Task $task) {
    return inertia('task-detail', [
        'task' => $task,
    ]);
})->name('tasks.show');

// how to pass data to inertia
Route::get('/profile/{user}', function ($user) {
    return inertia('profile', [
        'user' => $user,
    ]);
});
