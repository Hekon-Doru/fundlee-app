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

    public function updateStatus(Request $request, Story $story)
{
    $request->validate([
        'status' => 'required|in:pending,approved,rejected',
    ]);

    $story->update(['status' => $request->status]);

    /* dd($request->all()); */

    return back()->with('success', 'Story status updated.');
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
            $story->update(['image_path' => $path]);
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
        $story = Story::with(['donations', 'user'])->findOrFail($id);

        // Add owner property
        $story = Story::with(['donations', 'user'])->findOrFail($id);
        $story->owner = $story->user ? $story->user->name : 'Anonymous';
        $story->user_id = $story->user ? $story->user->id : null;
        $story->is_pending = $story->status === 'pending';
        $story->is_approved = $story->status === 'approved';
        $story->is_rejected = $story->status === 'rejected';

        return Inertia::render('Story/View', [
            'story' => $story,
        ]);
    }

    public function list()
    {
        $user = Auth::user();

        if ($user && $user->role === 'admin') {
            // Admin sees all stories
            $stories = Story::with('user')->get();
        } else {
            // Regular users see approved stories + their own stories regardless of status
            $stories = Story::with('user')
                ->where('status', 'approved')
                ->orWhere('user_id', $user->id)
                ->get();
        }

        // Map stories with helper properties
        $stories = $stories->map(function ($story) use ($user) {
            $story->owner = $story->user ? $story->user->name : 'Anonymous';
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
