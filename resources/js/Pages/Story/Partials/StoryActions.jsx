import { AdminActions } from "./StoryActions/AdminActions";
import { UserActions } from "./StoryActions/UserActions";
import { OwnerActions } from "./StoryActions/OwnerActions";

export default function StoryActions({ story, authUser, setShowDonate, updateStatus}) {
    if (!story) return null;

    const isAdmin = authUser?.role === "admin";
    const isOwner = story.is_owner;

    
    switch (story.status) {
        case "pending":
            return isAdmin ? <AdminActions story={story} updateStatus={updateStatus} /> : null;
            
        case "approved":
            return (
                <UserActions
                    story={story}
                    authUser={authUser}
                    setShowDonate={setShowDonate}
                    updateStatus={updateStatus}
                />
            );

        case "rejected":
            return (isAdmin || isOwner) ? (
                <OwnerActions story={story} updateStatus={updateStatus} />
            ) : null;

        default:
            return null;
    }
}
