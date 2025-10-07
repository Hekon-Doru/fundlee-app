// resources/js/Hooks/useImage.jsx
import { useState, useEffect } from "react";

/**
 * useImage - Manages image file input and preview.
 *
 * @param {Function} setData - Function from Inertia's useForm (e.g. setData).
 * @param {string|null} initialImage - Existing image path for edit mode.
 */
export default function useImage(setData, initialImage = null) {
    const [preview, setPreview] = useState(initialImage);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("image", file);

        if (file) {
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(initialImage);
        }
    };

    useEffect(() => {
        return () => {
            if (preview && preview.startsWith("blob:")) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    return { preview, handleImageChange, setPreview };
}
