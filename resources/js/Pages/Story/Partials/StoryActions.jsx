import { useState } from "react";
import { router } from "@inertiajs/react";
import Donate from "./Donate";

export default function StoryActions({ story, authUser, setStory }) {
    const [showDonate, setShowDonate] = useState(false);

    if (!story || !authUser) return null;

    const updateStatus = (status) => {
        router.put(
            route("story.updateStatus", story.id),
            { status },
            {
                preserveScroll: true,
                onSuccess: () =>
                    setStory((prev) => ({
                        ...prev,
                        status,
                        is_pending: status === "pending",
                        is_approved: status === "approved",
                        is_rejected: status === "rejected",
                    })),
            }
        );
    };

    const deleteStory = () => {
        if (!confirm("Are you sure you want to delete this story?")) return;
        router.delete(route("story.destroy", story.id), {
            onSuccess: () => router.visit(route("story.list")),
        });
    };

    const buttons = [];

    if (story.status === "pending" && authUser.role === "admin") {
        buttons.push(
            <button
                key="approve"
                onClick={() => updateStatus("approved")}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
                Approve
            </button>,
            <button
                key="deny"
                onClick={() => updateStatus("rejected")}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
                Deny
            </button>
        );
    } else if (story.status === "approved") {
        buttons.push(
            <button
                key="donate"
                onClick={() => setShowDonate(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Donate
            </button>
        );
    } else if (
        story.status === "rejected" &&
        (authUser.role === "admin" || story.is_owner)
    ) {
        buttons.push(
            <button
                key="delete"
                onClick={deleteStory}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
                Delete
            </button>
        );
    }

    return (
        <>
            <div className="flex gap-2">{buttons}</div>
            {showDonate && (
                <Donate
                    story={story}
                    authUser={authUser}
                    onClose={() => setShowDonate(false)}
                    onDonateSuccess={(amount) =>
                        setStory((prev) => ({
                            ...prev,
                            collected_amount: Number(prev.collected_amount) + Number(amount),
                        }))
                    }
                />
            )}
        </>
    );
}
