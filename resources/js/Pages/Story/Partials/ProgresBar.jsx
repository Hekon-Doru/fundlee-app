import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";

function ProgressBar({ collected_amount, target_amount }) {
    return (
        <>
            <div className="mt-auto">
                <div className="flex justify-between mb-1 text-sm">
                    <span>Collected</span>
                    <span>
                        €{collected_amount} / €{target_amount}
                    </span>
                </div>

                <div className="bg-gray-200 rounded-full h-4">
                    <div
                        className="bg-green-600 green-700 h-4 rounded-full"
                        style={{
                            width: `${Math.round(
                                (collected_amount / target_amount) * 100
                            )}%`,
                        }}    
                    ></div>
                </div>
            </div>
        </>
    );
}

export default ProgressBar;
