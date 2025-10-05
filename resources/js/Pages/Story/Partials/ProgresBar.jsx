import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";

function ProgressBar({ collected_amount, target_amount }) {
    const percentage = Math.round((collected_amount / target_amount) * 100);

    return (
        <div className="mt-auto">
            {/* Labels */}
            <div className="flex justify-between mb-2 text-sm font-medium text-gray-700">
                <span>Collected</span>
                <span>
                    €{collected_amount} / €{target_amount}
                </span>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden shadow-inner">
                {/* Progress Fill */}
                <div
                    className="bg-green-600 h-4 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
}

export default ProgressBar;
