import { router } from "@inertiajs/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Donate({ story, authUser, onClose, onDonateSuccess }) {
    const [amount, setAmount] = useState("");
    const [donorName, setDonorName] = useState(authUser?.name || "");
    const [anonymous, setAnonymous] = useState(false);
    const [success, setSuccess] = useState(false);

    const submitDonation = (e) => {
        e.preventDefault();

        router.post(
            route("donations.store", story.id),
            {
                donor_name: donorName,
                amount,
                anonymous,
            },
            {
                onSuccess: () => {
                    onDonateSuccess(Number(amount));
                    setSuccess(true);
                    setTimeout(() => onClose(), 2500); // auto close modal
                },
                onError: (errors) => {
                    console.error(errors);
                    alert("Failed to process donation. Try again.");
                },
            }
        );
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className={`rounded-lg p-6 w-96 relative ${
                        success ? "bg-green-500 text-white" : "bg-white text-gray-900"
                    }`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    {!success ? (
                        <>
                            <h2 className="text-lg font-semibold mb-4">
                                Donate to {story.title}
                            </h2>

                            <form onSubmit={submitDonation}>
                                {!authUser && (
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        value={donorName}
                                        onChange={(e) => setDonorName(e.target.value)}
                                        className="w-full px-3 py-2 border rounded mb-2"
                                        required
                                    />
                                )}

                                {authUser && (
                                    <div className="flex items-center gap-2 mb-2">
                                        <span>{authUser.name}</span>
                                        <label className="flex items-center gap-1 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={anonymous}
                                                onChange={(e) =>
                                                    setAnonymous(e.target.checked)
                                                }
                                            />
                                            Donate anonymously
                                        </label>
                                    </div>
                                )}

                                <input
                                    type="number"
                                    placeholder="Amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full px-3 py-2 border rounded mb-4"
                                    required
                                    min={1}
                                />

                                <div className="flex justify-between">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Donate
                                    </button>
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                        onClick={onClose}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-12"
                        >
                            <h2 className="text-xl font-semibold">Thank you for your donation!</h2>
                            <p className="mt-2">Your contribution helps make this story happen.</p>
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
