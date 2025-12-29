import HomePage from '@pages/HomePage';
import PostsPage from '@pages/PostsPage';
import ProfilePage from '@pages/ProfilePage';
import UsersPage from '@pages/UsersPage';
import {
	IconHome,
	IconMessageShare,
	IconUser,
	IconUsers,
} from '@tabler/icons-react';
import type { RouteItem } from '../types/routeItem.type';
import { RouteItemType } from '../types/routeItemType.enum';

export const routeMenuItems: RouteItem[] = [
	{
		type: RouteItemType.MENU_HEADER,
		title: 'Home',
		path: '/',
		icon: IconHome,
		page: HomePage,
		isPublic: true,
	},
	{
		type: RouteItemType.MENU_HEADER,
		title: 'Users',
		path: '/users',
		icon: IconUsers,
		page: UsersPage,
		isPublic: false,
	},
	{
		type: RouteItemType.MENU_HEADER,
		title: 'Posts',
		path: '/posts',
		icon: IconMessageShare,
		page: PostsPage,
		isPublic: false,
	},
	{
		type: RouteItemType.MENU_HEADER,
		title: 'Profile',
		path: '/profile',
		icon: IconUser,
		page: ProfilePage,
		isPublic: false,
	},
];
