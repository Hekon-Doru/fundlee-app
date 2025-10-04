// resources/js/Pages/Stories/Partials/Delete.jsx
import { router } from "@inertiajs/react";

export default function Delete({ story, onClose }) {
    const confirmDelete = () => {
        if (!confirm("Are you sure you want to delete this story?")) return;

        router.delete(route("story.destroy", story.id), {
            preserveScroll: true,
            onSuccess: () => {
                onClose();
                router.visit(route("story.list"));
            },
            onError: (errors) => {
                alert("Failed to delete story.");
                console.error(errors);
            },
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-lg text-center">
                <h2 className="text-lg font-semibold mb-4">
                    Confirm Delete
                </h2>
                <p className="mb-6">
                    Are you sure you want to delete the story: <strong>{story.title}</strong>?
                </p>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={confirmDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
