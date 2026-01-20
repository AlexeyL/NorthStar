export interface AuthResponse {
	user: {
		id: string;
		email: string;
		name?: string;
		isActive: boolean;
		createdAt: Date;
		updatedAt: Date;
		userRoles: Array<{
			role: {
				id: string;
				name: string;
				description?: string;
			};
		}>;
	};
	accessToken: string;
	refreshToken: string;
}
