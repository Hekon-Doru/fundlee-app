import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";

export default function Donate({ story, authUser, onClose, onDonateSuccess }) {
    const [amount, setAmount] = useState("");
    const [donorName, setDonorName] = useState(authUser ? authUser.name : "");
    const [anonymous, setAnonymous] = useState(false);
    const [success, setSuccess] = useState(false);

    // Update name if anonymous is checked
    useEffect(() => {
        if (anonymous) {
            setDonorName("Anonymous");
        } else if (authUser) {
            setDonorName(authUser.name);
        } else {
            setDonorName("");
        }
    }, [anonymous, authUser]);

    const submitDonation = (e) => {
        e.preventDefault();

        if (!amount || parseFloat(amount) <= 0) return;

        router.post(
            route("donations.store", story.id),
            {
                amount: parseFloat(amount),
                donor_name: donorName,
            },
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    // Get new donation object returned by server
                    const newDonation = page.props.donation || {
                        id: Date.now(), // fallback if server does not return ID
                        donor_name: donorName,
                        amount: parseFloat(amount),
                    };

                    setSuccess(true);
                    onDonateSuccess(newDonation);

                    setTimeout(() => {
                        setSuccess(false);
                        onClose();
                        setAmount("");
                        setAnonymous(false);
                    }, 1200);
                },
            }
        );
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                        backgroundColor: success ? "#16a34a" : "#ffffff",
                    }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-lg shadow-lg w-96 max-w-full p-6 text-gray-800"
                >
                    {!success ? (
                        <>
                            <h3 className="text-lg font-semibold mb-4">
                                Donate to "{story.title}"
                            </h3>
                            <form onSubmit={submitDonation} className="flex flex-col gap-3">
                                <div className="flex flex-col gap-2">
                                    <input
                                        type="text"
                                        value={donorName}
                                        onChange={(e) => setDonorName(e.target.value)}
                                        placeholder="Your name"
                                        className="px-3 py-2 border rounded"
                                        required
                                        disabled={anonymous || !!authUser}
                                    />
                                    <label className="flex items-center gap-1">
                                        <input
                                            type="checkbox"
                                            checked={anonymous}
                                            onChange={(e) => setAnonymous(e.target.checked)}
                                        />
                                        Donate anonymously
                                    </label>
                                </div>

                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="Amount"
                                    className="px-3 py-2 border rounded"
                                    required
                                    min="1"
                                    step="0.01"
                                />

                                <div className="flex justify-end gap-2 mt-2">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-3 py-2 border rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Donate
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="text-center py-6 font-semibold text-white text-lg"
                        >
                            Thank you for your contribution!
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
