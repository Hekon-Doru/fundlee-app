import { AdminActions } from "./StoryActions/AdminActions";
import { UserActions } from "./StoryActions/UserActions";
import { OwnerActions } from "./StoryActions/OwnerActions";

export default function StoryActions({ story, authUser, setShowDonate }) {
    if (!story) return null;

    const isAdmin = authUser?.role === "admin";
    const isOwner = story.is_owner;

    switch (story.status) {
        case "pending":
            return isAdmin ? <AdminActions story={story} /> : null;
            
        case "approved":
            return (
                <UserActions
                    story={story}
                    authUser={authUser}
                    setShowDonate={setShowDonate}
                />
            );

        case "rejected":
            return (isAdmin || isOwner) ? (
                <OwnerActions story={story} />
            ) : null;

        default:
            return null;
    }
}
