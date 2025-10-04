<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Story;
use Illuminate\Support\Facades\Auth;

class StoryController extends Controller
{
    public function create()
    {
        return Inertia::render('Story/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'target_amount' => 'required|numeric|min:1',
            'description' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $story = $request->user()->stories()->create([
            'title' => $request->title,
            'target_amount' => $request->target_amount,
            'description' => $request->description,
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('public/story_images');
            $story->update(['image' => $path]);
        }

        return redirect()->route('story.list')->with('success', 'Story created!');
    }

    public function show($id)
    {
        return Inertia::render('Story/Show', ['id' => $id]);
    }

    public function edit($id)
    {
        return Inertia::render('Story/Edit', ['id' => $id]);
    }

    public function update(Request $request, $id)
    {
        return Inertia::send('Story/Edit', ['id' => $id, 'data' => $request->all()]);
    }

    public function destroy($id)
    {
        return Inertia::render('Story/Delete', ['id' => $id]);
    }

    public function view($id)
    {
        $story = Story::with('donations')->findOrFail($id);

        return Inertia::render('Story/View', [
            'story' => $story,
        ]);
    }

    public function list()
    {
        $user = Auth::user();

        if ($user && $user->role === 'admin') {
            // Admin sees all stories
            $stories = Story::all();
        } else {
            // Regular users see only approved stories
            $stories = Story::approved()->get();
        }

        // Attach is_owner flag to each story
        $stories = $stories->map(function ($story) use ($user) {
            $story->is_owner = $user && $story->user_id === $user->id;
            $story->is_pending = $story->status === 'pending';
            $story->is_approved = $story->status === 'approved';
            $story->is_rejected = $story->status === 'rejected';
            return $story;
        });

        return Inertia::render('Story/List', [
            'stories' => $stories,
            'user_id' => $user ? $user->id : null,
            'is_admin' => $user ? $user->role === 'admin' : false,
        ]);
    }
}
