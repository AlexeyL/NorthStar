export interface User {
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
}

export interface AuthResponse {
	user: User;
	accessToken: string;
	refreshToken: string;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface RegisterRequest {
	email: string;
	name?: string;
	password: string;
}

export interface RefreshTokenRequest {
	refreshToken: string;
}

export interface JwtPayload {
	sub: string;
	email: string;
	roles: string[];
	permissions: string[];
	iat: number;
	exp: number;
}

export interface AuthState {
	user: User | null;
	accessToken: string | null;
	refreshToken: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
}
