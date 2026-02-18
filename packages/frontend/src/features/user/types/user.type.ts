import type { Post } from "@features/post";

export type User = {
    id: string;
    email: string;
    name?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    userRoles: Array<{
        role: {
            id: string;
            name: string;
            description?: string;
        };
    }>;
    posts?: Post[];
}