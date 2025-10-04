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

        /* dd($request->all()); */

        return back()->with('success', 'Story status updated.');
    }




    public function store(Request $request)
    {
        /* $file = $request->file('image');
        if ($file) {
            dd([
                'originalName' => $file->getClientOriginalName(),
                'mimeType' => $file->getClientMimeType(),
                'size' => $file->getSize(),
                'isValid' => $file->isValid(),
            ]);
        } else {
            dd('No file uploaded');
        }
 */

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
            // Store in storage/app/public/story_images
            $path = $request->file('image')->store('story_images', 'public');

            // Save only the relative path in DB
            $story->update([
                'image_path' => '/storage/' . $path, // This generates: /storage/story_images/filename.jpg
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

        // Owner info
        $story->owner = $story->user ? $story->user->name : 'Anonymous';
        $story->user_id = $story->user ? $story->user->id : null;

        // Status flags
        $story->is_pending = $story->status === 'pending';
        $story->is_approved = $story->status === 'approved';
        $story->is_rejected = $story->status === 'rejected';

        // Image URL
        $story->image_url = $story->image_path ? asset($story->image_path) : null;

        return Inertia::render('Story/View', [
            'story' => $story,
        ]);
    }

    public function list()
{
    $user = Auth::user();

    if ($user && $user->role === 'admin') {
        // Admin sees all stories (approved + pending + rejected)
        $stories = Story::with('user')->get();
    } else {
        // Authenticated non-admin or guest
        $stories = Story::with('user')
            ->when($user, function ($query) use ($user) {
                // Logged-in user: approved stories + their own
                $query->where('status', 'approved')
                      ->orWhere('user_id', $user->id);
            }, function ($query) {
                // Guest: only approved stories
                $query->where('status', 'approved');
            })
            ->get();
    }

    // Map stories with helper properties
    $stories = $stories->map(function ($story) use ($user) {
        $story->owner = $story->user ? $story->user->name : 'Anonymous';
        $story->is_owner = $user && $story->user_id === $user->id;
        $story->is_pending = $story->status === 'pending';
        $story->is_approved = $story->status === 'approved';
        $story->is_rejected = $story->status === 'rejected';

        // Image URL for frontend
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

    // Store donation (auth or guest)
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

        // Update story collected amount
        $story->increment('collected_amount', $request->amount);

        return redirect()->route('story.view', $story->id)
            ->with('success', 'Donation successful!');
    }
    

}
