import type { Icon, IconProps } from '@tabler/icons-react';

export type RouteChildItem = {
	title: string;
	icon: React.ForwardRefExoticComponent<
		IconProps & React.RefAttributes<Icon>
	>;
	path: string;
	description?: string;
	page: React.FC;
	isPublic: boolean;
	requiredRoles?: string[];
	requiredPermissions?: string[];
};
