import { router } from "@inertiajs/react";

export function AdminActions({ story }) {
    const updateStatus = (status) => {
        router.put(
            route("story.updateStatus", story.id),
            { status },
            {
                preserveScroll: true,
                onSuccess: () => {
                    // Refresh page data so Story list + StatusBar update
                    router.reload({ only: ['stories'] });
                },
            }
        );
    };

    return (
        <div className="flex gap-3">
            <button
                onClick={() => updateStatus("approved")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-sm transition"
            >
                Approve
            </button>
            <button
                onClick={() => updateStatus("rejected")}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-sm transition"
            >
                Deny
            </button>
        </div>
    );
}
