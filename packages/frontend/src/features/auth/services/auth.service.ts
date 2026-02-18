import type { JwtPayload, User } from "@features/index";
import { jwtDecode } from "jwt-decode";

export const authService = {
    /**
     * Checks if the given JWT token is expired.
     * @param token The JWT token to check for expiration.
     * @returns True if the token is expired, false otherwise.
     */
    isTokenExpired: (token: string): boolean => {
        try {
            const decoded = jwtDecode<JwtPayload>(token);
            return decoded.exp * 1000 < Date.now();
        } catch {
            return true;
        }
    },

    /**
     * Retrieves the stored access token from localStorage.
     * @returns The access token if it exists, or null if it does not.
     */
    getStoredToken: (): string | null => {
        return localStorage.getItem('accessToken');
    },

    /**
     * Retrieves the stored refresh token from localStorage.
     * @returns The refresh token if it exists, or null if it does not.
     */
    getStoredRefreshToken: (): string | null => {
        return localStorage.getItem('refreshToken');
    },

    /**
     * Stores the access token, refresh token, and user information in localStorage.
     * @param accessToken The access token to store.
     * @param refreshToken The refresh token to store.
     * @param user The user information to store.
     */
    setTokens: (accessToken: string, refreshToken: string, user: User): void => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
    },

    /**
     * Clears the access token, refresh token, and user information from localStorage.
     */
    clearTokens: (): void => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    },
}