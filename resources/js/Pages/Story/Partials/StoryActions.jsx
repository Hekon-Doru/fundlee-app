import { AdminActions } from "./StoryActions/AdminActions";
import { UserActions } from "./StoryActions/UserActions";
import { OwnerActions } from "./StoryActions/OwnerActions";

export default function StoryActions({ story, authUser, setShowDonate, updateStatus }) {
    if (!story) return null;

    const isAdmin = authUser?.role === "admin";
    const isOwner = story.owner;

    switch (story.status) {
        case "pending":
            if (isAdmin) {
                return <AdminActions story={story} updateStatus={updateStatus} />;
            }
            if (isOwner) {
                return <OwnerActions story={story} />; // Owner can Edit/Delete
            }
            return null;

        case "approved":
            if (isOwner) {
                return <OwnerActions story={story} />; // Owner can Edit/Delete
            }
            return (
                <UserActions
                    story={story}
                    authUser={authUser}
                    setShowDonate={setShowDonate}
                    updateStatus={updateStatus}
                />
            );

        case "rejected":
            if (isAdmin) {
                return <AdminActions story={story} updateStatus={updateStatus} />;
            }
            if (isOwner) {
                return <OwnerActions story={story} />; // Owner can Edit/Delete
            }
            return null;

        default:
            return null;
    }
}
