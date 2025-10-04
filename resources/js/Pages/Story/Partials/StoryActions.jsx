import { useForm } from "@inertiajs/react";

export default function StoryActions({ story }) {
    const { put } = useForm();

    const updateStatus = (status) => {
        put(route("story.updateStatus", story.id), { status }, {
            onSuccess: () => {
                // Optional: reload to get updated story props
                // router.reload() if needed
            },
        });
    };

    if (!story || story.status === 'approved') return null;

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
