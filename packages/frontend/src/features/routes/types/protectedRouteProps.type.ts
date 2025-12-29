export type ProtectedRouteProps = {
	children: React.ReactNode;
	isPublic: boolean;
	requiredRoles?: string[];
	requiredPermissions?: string[];
};
