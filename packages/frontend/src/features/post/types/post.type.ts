import type { User } from "@features/auth";

export type Post = {
    id: string;
    title: string;
    content?: string;
    published: boolean;
    authorId: string;
    author?: User;
    createdAt: string;
    updatedAt: string;
}