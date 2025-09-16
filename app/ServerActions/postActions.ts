"use server";

import z from "zod";
import { PrismaClient } from "../generated/prisma";
import { getServerSession } from "next-auth";

export type TPost = {
    id: string;
    title: string;
    body: string;
    dateCreated: Date;
    dateLastModified: Date;
};

const PostCreateSchema = z.object({
    title: z.string().min(3).max(10),
    body: z.string().min(10).max(20),
});

export type TPostCreate = z.infer<typeof PostCreateSchema>;

export const createPost = async (postCreate: TPostCreate): Promise<TPost> => {
    const session = await getServerSession();

    if (!session) {
        throw new Error("un authorized");
    }

    const validate = PostCreateSchema.safeParse(postCreate);

    if (!validate.success) {
        throw validate.error;
    }

    const prisma = new PrismaClient();
    const post = await prisma.post.create({
        data: {
            title: postCreate.title,
            body: postCreate.body,
        },
    });

    return post;
};

export const getPosts = async () => {
    const prisma = new PrismaClient();
    const posts: TPost[] = await prisma.post.findMany();

    return posts;
};
