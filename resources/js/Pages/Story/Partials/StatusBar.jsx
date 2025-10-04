// resources/js/Components/StatusBar.jsx
export default function StatusBar({ story, isAdmin = false }) {
    if (!isAdmin) return null;

    const statusStyles = {
        pending: {
            container: "bg-yellow-500 text-white border border-yellow-300",
            dot: "bg-yellow-300",
            label: "Pending",
        },
        approved: {
            container: "bg-green-500 text-white border border-green-300",
            dot: "bg-green-300",
            label: "Approved",
        },
        rejected: {
            container: "bg-red-500 text-white border border-red-300",
            dot: "bg-red-300",
            label: "Rejected",
        },
    };

    let status = null;

    if (story.is_pending) status = statusStyles.pending;
    else if (story.is_approved) status = statusStyles.approved;
    else if (story.is_rejected) status = statusStyles.rejected;

    if (!status) return null;

    return (
        <div
            className={`absolute top-6 left-6 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium shadow ${status.container}`}
        >
            <span className={`w-2 h-2 mr-2 rounded-full ${status.dot}`} />
            {status.label}
        </div>
    );
}
