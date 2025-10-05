import { router } from "@inertiajs/react";

export function AdminActions({ story, updateStatus}) {
    const handleStatusChange = (status) => {
        router.put(
            route("story.updateStatus", story.id),
            { status },
            {
                preserveScroll: true,
                onSuccess: () => {
                    updateStatus(status); // update local state instantly
                },
            }
        );
    };

    return (
        <div className="flex gap-3">
            <button
                 onClick={() => handleStatusChange("approved")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-sm transition"
            >
                Approve
            </button>
            <button
                onClick={() => handleStatusChange("rejected")}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-sm transition"
            >
                Deny
            </button>
        </div>
    );
}
