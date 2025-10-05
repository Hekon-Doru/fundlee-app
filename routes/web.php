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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// ------------------- Authenticated Routes -------------------
Route::middleware('auth')->group(function () {

    // --- Story CRUD ---
    Route::get('/story/create', [StoryController::class, 'create'])->name('story.create');
    Route::post('/story', [StoryController::class, 'store'])->name('story.store');

    Route::get('/story/edit/{id}', [StoryController::class, 'edit'])->name('story.edit');
    Route::put('/story/{id}', [StoryController::class, 'update'])->name('story.update');
    Route::delete('/story/{id}', [StoryController::class, 'destroy'])->name('story.destroy');

    // --- Story Status (Admin only) ---
    Route::put('/story/{story}/update-status', [StoryController::class, 'updateStatus'])
        ->name('story.updateStatus');

    // Optional toggle (if used elsewhere)
    Route::put('/story/{id}/toggle', [StoryController::class, 'toggle'])->name('story.toggle');

});

// ------------------- Public Routes -------------------
Route::get('/stories', [StoryController::class, 'list'])->name('story.list');
Route::get('/story/{id}', [StoryController::class, 'view'])->name('story.view');
// --- Donations (example route for Donate button) ---
Route::get('/story/{story}/donate', [StoryController::class, 'createDonation'])
    ->name('donations.create');
Route::post('/story/{story}/donate', [StoryController::class, 'storeDonation'])
    ->name('donations.store');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
