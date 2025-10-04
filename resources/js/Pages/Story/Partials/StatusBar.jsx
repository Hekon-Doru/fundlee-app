export default function StatusBar({ story, authUser }) {
    const isAdmin = authUser?.role === "admin";
    const isOwner = story.is_owner && authUser?.id === story.user_id;

    if (!isAdmin && !isOwner) return null;

    const statusStyles = {
        pending: { container: "bg-yellow-500", dot: "bg-yellow-300", label: "Pending" },
        approved: { container: "bg-green-500", dot: "bg-green-300", label: "Approved" },
        rejected: { container: "bg-red-500", dot: "bg-red-300", label: "Rejected" },
    };

    const status =
        story.status === "pending" ? statusStyles.pending :
        story.status === "approved" ? statusStyles.approved :
        story.status === "rejected" ? statusStyles.rejected : null;

    if (!status) return null;

    return (
        <div className={`absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-sm text-white font-medium shadow ${status.container}`}>
            <span className={`w-2 h-2 mr-2 rounded-full ${status.dot}`} />
            {status.label}
        </div>
    );
}
