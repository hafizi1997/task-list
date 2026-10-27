<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::inertia('/dashboard', 'dashboard')->name('dashboard');

// how to pass data to inertia
Route::get('/profile/{user}', function ($user) {
    return inertia('profile', [
        'user' => $user,
    ]);
});
