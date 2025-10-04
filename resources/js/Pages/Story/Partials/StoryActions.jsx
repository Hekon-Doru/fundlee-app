import { router } from "@inertiajs/react";

export default function StoryActions({ story, authUser, setShowDonate }) {
    if (!story) return null;

    const handleDonateClick = () => {
        setShowDonate(true); // Show donate modal
    };

    const updateStatus = (status) => {
        if (!authUser) return;
        router.put(
            route("story.updateStatus", story.id),
            { status },
            { preserveScroll: true }
        );
    };

    const deleteStory = () => {
        if (!authUser) return;
        if (!confirm("Are you sure you want to delete this story?")) return;
        router.delete(route("story.destroy", story.id), {
            preserveScroll: true,
            onSuccess: () => router.visit(route("story.list")),
        });
    };

    // --- Render buttons ---
    switch (story.status) {
        case "pending":
            if (authUser?.role === "admin") {
                return (
                    <div className="flex gap-2">
                        <button
                            onClick={() => updateStatus("approved")}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Approve
                        </button>
                        <button
                            onClick={() => updateStatus("rejected")}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Deny
                        </button>
                    </div>
                );
            }
            return null;

        case "approved":
            // Donate button visible to all users, including guests
            return (
                <div>
                    <button
                        onClick={handleDonateClick}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Donate
                    </button>
                </div>
            );

        case "rejected":
            if (authUser?.role === "admin" || story.is_owner) {
                return (
                    <div>
                        <button
                            onClick={deleteStory}
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                        >
                            Delete
                        </button>
                    </div>
                );
            }
            return null;

        default:
            return null;
    }
}
