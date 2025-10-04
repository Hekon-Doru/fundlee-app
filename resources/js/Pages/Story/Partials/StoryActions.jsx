import { router } from "@inertiajs/react";

export default function StoryActions({ story, onStatusUpdate }) {
    const updateStatus = (status) => {
        router.put(
            route("story.updateStatus", story.id),
            { status }, // 👈 send only the new status
            {
                preserveScroll: true,
                onSuccess: () => {
                    if (onStatusUpdate) {
                        onStatusUpdate(status);
                    }
                },
            }
        );
    };

    if (!story || story.status !== "pending") return null;

    return (
        <div className="flex gap-2">
            <button
                type="button"
                onClick={() => updateStatus("approved")}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
                Approve
            </button>
            <button
                type="button"
                onClick={() => updateStatus("rejected")}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
                Deny
            </button>
        </div>
    );
}
