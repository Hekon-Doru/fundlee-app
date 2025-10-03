import React from "react";

function Contributors({ story }) {
     

    return (
        <div className="w-8/12 mx-auto mt-5 p-6 bg-gray-50 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-3">Contributors:</h2>
            <ul className="space-y-4">
                {story.donations && story.donations.length > 0 ? (
                    story.donations.map((donation, idx) => (
                        <li key={idx} className="border-b pb-3">
                            <div className="flex justify-between">
                                <span className="text-gray-700">
                                    {donation.donor_name || "Anonymous"}
                                </span>
                                <span className="font-medium text-green-600">
                                    €{donation.amount}
                                </span>
                            </div>
                            {/* Only show if comments exist in DB */}
                            {donation.comment && (
                                <p className="text-sm text-gray-500 mt-1">
                                    {donation.comment}
                                </p>
                            )}
                        </li>
                    ))
                ) : (
                    <li className="text-gray-400">No donations yet.</li>
                )}
            </ul>
        </div>
    );
}

export default Contributors;
