<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

Route::inertia('/', 'welcome')->name('home');

Route::inertia('/dashboard', 'dashboard')->name('dashboard');

Route::get('/tasks', [TaskController::class, 'index'])->name('tasks');
Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');
Route::get('/tasks/{task}', [TaskController::class, 'show'])->name('tasks.show');

// how to pass data to inertia
Route::get('/profile/{user}', function ($user) {
    return inertia('profile', [
        'user' => $user,
    ]);
});
