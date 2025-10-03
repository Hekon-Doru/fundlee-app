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
        return Inertia::send('Story/Create', $request->all());
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
