import { router } from "@inertiajs/react";

export function OwnerActions({ story }) {
    const deleteStory = () => {
        if (!confirm("Are you sure you want to delete this story?")) return;

        router.delete(route("story.destroy", story.id), {
            preserveScroll: true,
            onSuccess: () => {
                router.reload({ only: ['stories'] }); // Refresh stories list
            },
        });
    };

    const editStory = () => {
        router.visit(route("story.edit", story.id));
    };

    return (
        <div className="flex gap-3">
            <button
                onClick={editStory}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 shadow-sm transition"
            >
                Edit
            </button>
            <button
                onClick={deleteStory}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 shadow-sm transition"
            >
                Delete
            </button>
        </div>
    );
}
