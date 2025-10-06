<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Story;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

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

            $path = $request->file('image')->store('story_images', 'public');

            $story->update([
                'image_path' => '/storage/' . $path,
            ]);
        }

        return redirect()->route('story.list')->with('success', 'Story created!');
    }

    public function show($id)
    {
        return Inertia::render('Story/Show', ['id' => $id]);
    }
    public function edit($id)
    {
        $story = Story::findOrFail($id);

        if ($story->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        return Inertia::render('Story/Edit', [
            'story' => [
                'id' => $story->id,
                'title' => $story->title,
                'target_amount' => $story->target_amount,
                'description' => $story->description,
                'image_path' => $story->image_path ? asset($story->image_path) : null,
            ],
            'auth' => ['user' => auth()->user()],
        ]);
    }

    public function update(Request $request, $id)
    {

        $request->validate([
            'title' => 'required|string|max:255',
            'target_amount' => 'required|numeric|min:1',
            'description' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $story = $request->user()->stories()->findOrFail($id);

        $story->title = $request->title;
        $story->target_amount = $request->target_amount;
        $story->description = $request->description;

        if ($request->hasFile('image')) {

            if ($story->image_path && Storage::disk('public')->exists(str_replace('/storage/', '', $story->image_path))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $story->image_path));
            }


            $path = $request->file('image')->store('story_images', 'public');


            $story->image_path = '/storage/' . $path;
        }

        $story->save();

        return redirect()
            ->route('story.view', $story->id)
            ->with('success', 'Story updated successfully.');
    }

    public function destroy($id)
    {
        $story = Story::findOrFail($id);

        if ($story->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        if ($story->image_path && Storage::disk('public')->exists(str_replace('/storage/', '', $story->image_path))) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $story->image_path));
        }

        $story->delete();

        return redirect()->route('story.list')
            ->with('success', 'Story deleted successfully.');
    }
    public function view($id)
    {
        $story = Story::with(['donations', 'user'])->findOrFail($id);

        $story->owner = $story->user ? $story->user->name : 'Anonymous';
        $story->user_id = $story->user ? $story->user->id : null;

        $story->is_pending = $story->status === 'pending';
        $story->is_approved = $story->status === 'approved';
        $story->is_rejected = $story->status === 'rejected';

        $story->image_url = $story->image_path ? asset($story->image_path) : null;

        return Inertia::render('Story/View', [
            'story' => $story,
        ]);
    }

    public function list()
    {
        $user = Auth::user();
        if ($user && $user->role === 'admin') {
            $stories = Story::with('user')->get();
        } else {
            $stories = Story::with('user')
                ->when($user, function ($query) use ($user) {
                    $query->where('status', 'approved')
                        ->orWhere('user_id', $user->id);
                }, function ($query) {
                    $query->where('status', 'approved');
                })
                ->get();
        }


        $stories = $stories->map(function ($story) use ($user) {
            $story->owner = $story->user ? $story->user->name : 'Anonymous';
            $story->is_owner = $user && $story->user_id === $user->id;
            $story->is_pending = $story->status === 'pending';
            $story->is_approved = $story->status === 'approved';
            $story->is_rejected = $story->status === 'rejected';
            $story->image_url = $story->image_path ? asset($story->image_path) : null;

            return $story;
        });

        return Inertia::render('Story/List', [
            'stories' => $stories,
            'user_id' => $user ? $user->id : null,
            'is_admin' => $user ? $user->role === 'admin' : false,
            'authUser' => $user,
        ]);
    }

    public function createDonation(Story $story)
    {
        return Inertia::render('Story/Partials/Donate', [
            'story' => $story,
            'authUser' => auth()->user(),
        ]);
    }

    public function storeDonation(Request $request, Story $story)
    {
        $request->validate([
            'donor_name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:1',
            'anonymous' => 'nullable|boolean',
        ]);

        $donorName = $request->anonymous ? 'Anonymous' : $request->donor_name;

        $story->donations()->create([
            'user_id' => auth()->id(),
            'donor_name' => $donorName,
            'amount' => $request->amount,
        ]);

        $story->increment('collected_amount', $request->amount);

        return redirect()->route('story.view', $story->id)
            ->with('success', 'Donation successful!');
    }


}
