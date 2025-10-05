import React from "react";

export default function Contributors({ story }) {
    // Support both initial donations from DB and newly added ones
    const donations = story.contributors || story.donations || [];

    return (
        <div className="w-8/12 mx-auto mt-8 p-6 bg-white rounded-lg shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Contributors
            </h2>

            <ul className="space-y-3">
                {donations.length > 0 ? (
                    donations.map((donation, idx) => (
                        <li
                            key={donation.id || idx}
                            className="border-b border-gray-200 pb-3"
                        >
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700 font-medium">
                                    {donation.donor_name || "Anonymous"}
                                </span>
                                <span className="font-semibold text-green-600">
                                    €{Number(donation.amount).toFixed(2)}
                                </span>
                            </div>

                            {donation.comment && (
                                <p className="text-sm text-gray-500 mt-1 italic">
                                    “{donation.comment}”
                                </p>
                            )}
                        </li>
                    ))
                ) : (
                    <li className="text-gray-400 text-sm italic">
                        No donations yet. Be the first to support this story!
                    </li>
                )}
            </ul>
        </div>
    );
}
