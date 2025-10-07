// resources/js/Hooks/useStoryForm.jsx
import { useForm } from "@inertiajs/react";

/**
 * useStoryForm - Handles both creating and editing stories.
 *
 * @param {Object|null} story - Pass a story object for edit mode, or null for create mode.
 */
export default function useStoryForm(story = null) {
    const isEditing = !!story;

    // Initialize form data safely
    const { data, setData, post, processing, errors, reset } = useForm({
        title: story?.title ?? "",
        target_amount: story?.target_amount ?? "",
        description: story?.description ?? "",
        image: null,
        ...(isEditing ? { _method: "PUT" } : {}),
    });

    const handleSubmit = (e, onSuccess) => {
        e.preventDefault();

        const routeName = isEditing
            ? route("story.update", story.id)
            : route("story.store");

        post(routeName, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                if (!isEditing) {
                    reset("title", "target_amount", "description", "image");
                }
                if (onSuccess) onSuccess();
            },
        });
    };

    return {
        data,
        setData,
        handleSubmit,
        processing,
        errors,
        isEditing,
    };
}
