<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StoryController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/stories', [StoryController::class, 'list'])->name('story.list');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::get('/story/create', [StoryController::class, 'create'])->name('story.create');

    /* Route::get('/stories', [StoryController::class, 'list'])->name('story.list'); */

    Route::post('/story', [StoryController::class, 'store'])->middleware('auth');
    Route::get('/story', [StoryController::class, 'store'])->name('story.store');
    Route::get('/story/{id}/edit', [StoryController::class, 'edit'])->name('story.edit');
    Route::put('/story/{id}', [StoryController::class, 'update'])->name('story.update');
    Route::delete('/story/{id}', [StoryController::class, 'destroy'])->name('story.destroy');
    Route::get('/story/{id}', [StoryController::class, 'view'])->name('story.view');
    Route::middleware('auth')->put('/story/{id}/toggle', [StoryController::class, 'toggle'])->name('story.toggle');





});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
