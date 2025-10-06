import { useState } from "react";
import { router } from "@inertiajs/react";

export function OwnerActions({ story }) {
    const [confirmingDelete, setConfirmingDelete] = useState(false);
    const [processing, setProcessing] = useState(false);

    const editStory = () => {
        router.visit(route("story.edit", story.id));
    };

    const deleteStory = () => {
        setProcessing(true);
        router.delete(route("story.destroy", story.id), {
            preserveScroll: true,
            onSuccess: () => router.visit(route("story.list")),
            onError: () => setProcessing(false),
        });
    };

    return (
        <>
            <div className="flex gap-3">
                <button
                    onClick={editStory}
                    className="px-4 w-full py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 shadow-sm transition"
                >
                    Edit
                </button>
                <button
                    onClick={() => setConfirmingDelete(true)}
                    className="px-4 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-sm transition"
                >
                    Delete
                </button>
            </div>

            {/* Delete Confirmation Modal */}
            {confirmingDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">
                            Delete Story
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to permanently delete{" "}
                            <span className="font-medium text-gray-800">
                                “{story.title}”
                            </span>
                            ? This action cannot be undone.
                        </p>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setConfirmingDelete(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={deleteStory}
                                disabled={processing}
                                className={`px-4 py-2 rounded-md text-white font-semibold transition ${
                                    processing
                                        ? "bg-red-400 cursor-not-allowed"
                                        : "bg-red-600 hover:bg-red-700"
                                }`}
                            >
                                {processing ? "Deleting..." : "Yes, Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
