export interface AuthResponse {
	user: {
		id: string;
		email: string;
		firstName?: string;
		lastName?: string;
		isActive: boolean;
		companyId?: string;
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
