import {
	Box,
	Button,
	Collapse,
	Menu,
	NavLink,
	useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { clearCredentials } from '@store/authSlice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
	IconChevronDown,
	IconLogout,
	IconTriangleInvertedFilled,
} from '@tabler/icons-react';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserMenu() {
	const theme = useMantineTheme();
	const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
	const state = useAppSelector((state) => state.auth);
	const user = state.user || null;
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogout = useCallback(() => {
		dispatch(clearCredentials());
		navigate('/login');
	}, [dispatch, navigate]);

	const userMenuItems = useMemo(
		() => [
			{
				label: <>Logout</>,
				icon: IconLogout,
				onClick: handleLogout,
			},
		],
		[handleLogout],
	);

	const buildUserMenu = useCallback(
		(userName: string) => {
			return (
				<>
					<Menu>
						<Menu.Target>
							<Button
								c="white"
								variant="transparent"
								rightSection={
									<IconTriangleInvertedFilled
										size={10}
										color="white"
									/>
								}
							>
								{userName}
							</Button>
						</Menu.Target>

						<Menu.Dropdown w={200}>
							{userMenuItems.map((item) => (
								<Menu.Item
									key={item.label?.toString()}
									onClick={item.onClick}
									rightSection={<item.icon size={14} />}
								>
									{item.label}
								</Menu.Item>
							))}
						</Menu.Dropdown>
					</Menu>
				</>
			);
		},
		[userMenuItems],
	);

	const buildSmallScreenUserMenu = useCallback(
		(userName: string) => {
			return (
				<>
					<NavLink
						key="userMenu"
						label={userName}
						onClick={toggleLinks}
						rightSection={
							<IconChevronDown
								color={theme.colors.primary[6]}
								size={16}
								style={{
									transform: linksOpened
										? 'rotate(180deg)'
										: 'rotate(0deg)',
									transition: 'transform 0.2s ease',
								}}
							/>
						}
					/>
					<Collapse in={linksOpened}>
						{userMenuItems.map((item) => (
							<NavLink
								key={item.label?.toString()}
								label={item.label}
								onClick={item.onClick}
								rightSection={
									<item.icon
										size={16}
										color={theme.colors.primary[6]}
									/>
								}
							/>
						))}
					</Collapse>
				</>
			);
		},
		[userMenuItems, linksOpened, theme, toggleLinks],
	);

	return (
		<>
			{user && (
				<>
					<Box visibleFrom="sm">
						{buildUserMenu(`${user.name} ${user.email}`)}
					</Box>
					<Box hiddenFrom="sm">
						{buildSmallScreenUserMenu(`${user.name} ${user.email}`)}
					</Box>
				</>
			)}
		</>
	);
}
