<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Story;

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
        $stories = Story::approved()->get();
        return Inertia::render('Story/List', [
            'stories' => $stories,
        ]);
    }
}
