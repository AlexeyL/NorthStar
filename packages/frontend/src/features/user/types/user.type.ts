import type { Post } from "@features/post";

export type User = {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    isActive: boolean;
    companyId?: string;
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