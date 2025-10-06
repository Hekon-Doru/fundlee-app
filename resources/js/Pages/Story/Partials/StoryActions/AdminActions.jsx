import { router } from "@inertiajs/react";

export function AdminActions({ story, updateStatus }) {
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

    const buttons = [
        {
            label: "Approve",
            status: "approved",
            color: "bg-green-600 hover:bg-green-700",
        },
        {
            label: "Pending",
            status: "pending",
            color: "bg-yellow-500 hover:bg-yellow-600",
        },
        {
            label: "Deny",
            status: "rejected",
            color: "bg-red-600 hover:bg-red-700",
        },
    ];

    return (
        <div className="flex gap-3 w-full">
            {buttons
                .filter((btn) => btn.status !== story.status) // ✅ show only not selected
                .map((btn) => (
                    <button
                        key={btn.status}
                        onClick={() => handleStatusChange(btn.status)}
                        className={`px-4 py-2 w-full text-white rounded-lg shadow-sm transition ${btn.color}`}
                    >
                        {btn.label}
                    </button>
                ))}
        </div>
    );
}
