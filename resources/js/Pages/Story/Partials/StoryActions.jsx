import { AdminActions } from "./StoryActions/AdminActions";
import { UserActions } from "./StoryActions/UserActions";
import { OwnerActions } from "./StoryActions/OwnerActions";

export default function StoryActions({
    story,
    authUser,
    setShowDonate,
    updateStatus,
}) {
    if (!story) return null;

    const isGuest = !authUser;
    const isAdmin = authUser?.role === "admin";
    const isOwner = authUser && story.user_id === authUser.id;
    const isRegularUser = authUser && !isAdmin && !isOwner; 

    switch (story.status) {
        case "pending":
            if (isAdmin) {
                return (
                    <AdminActions story={story} updateStatus={updateStatus} />
                );
            }
            if (isOwner) {
                return <OwnerActions story={story} />;
            }
            return null;

        case "approved":
            if (isGuest || isRegularUser) {
                return (
                    <UserActions
                        story={story}
                        authUser={authUser}
                        setShowDonate={setShowDonate}
                        updateStatus={updateStatus}
                    />
                );
            }

            // Admins or owners get management options
            if (isAdmin) {
                return (
                    <AdminActions story={story} updateStatus={updateStatus} />
                );
            }
            if (isOwner) {
                return <OwnerActions story={story} />;
            }

            return null;

        case "rejected":
            if (isAdmin) {
                return (
                    <AdminActions story={story} updateStatus={updateStatus} />
                );
            }
            if (isOwner) {
                return <OwnerActions story={story} />;
            }
            return null;

        default:
            return null;
    }
}
