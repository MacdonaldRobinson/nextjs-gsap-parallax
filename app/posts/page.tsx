"use client";
import { useEffect, useState } from "react";
import { getPosts, TPost } from "../ServerActions/postActions";
import CreatePost from "./components/CreatePost";
import { signIn, signOut, useSession } from "next-auth/react";

const Posts = () => {
    const { data: session } = useSession();

    const [posts, setPosts] = useState<TPost[]>([]);

    const fetchPosts = () => {
        getPosts().then((posts: TPost[]) => {
            setPosts(posts);
        });
    };
    useEffect(() => {
        fetchPosts();
    }, []);

    const handleOnCreated = () => {
        fetchPosts();
    };

    return (
        <div className="flex flex-col gap-5 p-2">
            <fieldset className="border-1 min-h-30">
                <legend>Posts:</legend>
                {posts.map((post: TPost) => {
                    return <div key={post.id}>{post.title}</div>;
                })}
            </fieldset>
            {!session && <a onClick={() => signIn("google")}>Login</a>}
            {session && <a onClick={() => signOut()}>Logout</a>}
            {session && <CreatePost onCreated={handleOnCreated} />}
        </div>
    );
};

export default Posts;
