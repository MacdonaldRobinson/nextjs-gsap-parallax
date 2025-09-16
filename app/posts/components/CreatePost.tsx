import {
    createPost,
    TPost,
    TPostCreate,
} from "@/app/ServerActions/postActions";
import { useState, ChangeEventHandler, FormEventHandler } from "react";

export type TCreatePost = {
    onCreated: (post: TPost) => void;
};

const CreatePost = ({ onCreated }: TCreatePost) => {
    const [newPost, setNewPost] = useState<TPostCreate>({
        title: "",
        body: "",
    });

    const handleTitleChanged: ChangeEventHandler<HTMLInputElement> = (
        event
    ) => {
        if (!event.currentTarget) return;

        const updatedPost: TPostCreate = {
            ...newPost,
            title: event.currentTarget.value,
        };

        setNewPost(updatedPost);
    };

    const handleBodyChanged: ChangeEventHandler<HTMLTextAreaElement> = (
        event
    ) => {
        if (!event.currentTarget) return;

        const updatedPost: TPostCreate = {
            ...newPost,
            body: event.currentTarget.value,
        };

        setNewPost(updatedPost);
    };

    const handleCreatePostSubmit: FormEventHandler<HTMLFormElement> = async (
        event
    ) => {
        event.preventDefault();
        if (!event.currentTarget) return;

        const post = await createPost({
            title: newPost.title,
            body: newPost.body,
        });

        onCreated(post);
    };

    return (
        <form
            onSubmit={handleCreatePostSubmit}
            className="border-2 h-fit w-fit p-2 flex flex-col gap-2 rounded-2xl"
        >
            <div>
                <h2 className="font-bold text-center">Create Post</h2>
            </div>
            <div>
                <label>
                    <div className="font-bold">Title</div>
                    <input
                        type="text"
                        value={newPost.title}
                        onChange={handleTitleChanged}
                        className="border-1 w-full"
                    />
                </label>
            </div>
            <div>
                <label>
                    <div className="font-bold">Body</div>
                    <textarea
                        value={newPost.body}
                        onChange={handleBodyChanged}
                        className="border-1 w-full h-30"
                    />
                </label>
            </div>
            <div>
                <input
                    type="submit"
                    className="border-1 p-1 cursor-pointer bg-blue-300 rounded-2xl shadow-2xl 
                                hover:bg-blue-400 
                                  active:bg-blue-500"
                    value={"Create Post"}
                />
            </div>
        </form>
    );
};

export default CreatePost;
