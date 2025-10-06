export function UserActions({ story, setShowDonate }) {
    const handleDonateClick = () => {
        setShowDonate(true);
    };

    return (
        <div className="flex justify-start">
            <button
                onClick={handleDonateClick}
                className="px-4 py-2 bg-blue-600 w-full text-white rounded-lg hover:bg-blue-700 shadow-sm transition"
            >
                Donate
            </button>
        </div>
    );
}
