import type { User } from "@features/index";

export type AuthResponse = {
    user: User;
    accessToken: string;
    refreshToken: string;
}