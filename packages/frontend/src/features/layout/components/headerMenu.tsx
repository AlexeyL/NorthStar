import { RouteItemType, useMenuRoutes } from '@features/routes';
import type { RouteChildItem } from '@features/routes/types/routeChildItem.type';
import {
	Box,
	Button,
	Collapse,
	Divider,
	Group,
	NavLink,
	Popover,
	PopoverDropdown,
	PopoverTarget,
	SimpleGrid,
	Stack,
	Text,
	Title,
	useMantineTheme,
} from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { useCallback, useState } from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';

export default function HeaderMenu({ onMenuClick }: { onMenuClick?: () => void }) {
	const [opened, setOpened] = useState(false);
	const theme = useMantineTheme();
	const accentColor = theme.colors.accent[6];
	const menuColor = theme.colors.primary[6];
	const menuRoutes = useMenuRoutes();
	const [openLinks, setOpenLinks] = useState<{ [key: string]: boolean }>({});

	const toggleLink = useCallback((linkId: string) => {
		setOpenLinks((prev) => ({
			...prev,
			[linkId]: !prev[linkId],
		}));
	}, []);

	const buildMenuChildItem = useCallback(
		(child: RouteChildItem) => (
			<NavLink
				key={child.title}
				label={<>{child.title}</>}
				onClick={() => setOpened(false)}
				component={RouterNavLink}
				to={child.path}
				description={<>{child.description ?? ''}</>}
				leftSection={child.icon && <child.icon color={accentColor} />}
			/>
			// eslint-disable-next-line react-hooks/exhaustive-deps
		),
		[],
	);

	const buildMenu = menuRoutes.map((item) => {
		switch (item.type) {
			case RouteItemType.MENU_HEADER:
				return (
					<Button key={item.title} size="compact-sm" component={RouterNavLink} to={item.path} c={menuColor} variant="transparent">
						<>{item.title}</>
					</Button>
				);
			case RouteItemType.MENU_HEADER_WITH_CHILDREN:
				return (
					<Popover
						opened={opened}
						onChange={setOpened}
						withArrow
						shadow="lg"
						arrowSize={10}
						offset={7}
						disabled={!item.children}
						key={item.title}
					>
						<PopoverTarget>
							<Button onClick={() => setOpened((o) => !o)} size="compact-sm" c={menuColor} variant="transparent">
								<>{item.title}</>
							</Button>
						</PopoverTarget>

						<PopoverDropdown p={0}>
							<Stack gap={0} w={600}>
								<Group p="md" gap={'xs'}>
									{item.icon && <item.icon color={accentColor} size={18} />}
									<Title order={6}>
										<>{item.title}</>
									</Title>
								</Group>

								<Divider />

								<SimpleGrid p={'xs'} cols={2}>
									{item.children?.map(buildMenuChildItem)}
								</SimpleGrid>

								{item.description && (
									<Box
										p="xs"
										bg={'var(--mantine-color-gray-0'}
										style={{
											borderTop: '1px solid var(--mantine-color-gray-3',
										}}
									>
										<Text c="dimmed" size="xs">
											<>{item.description}</>
										</Text>
									</Box>
								)}
							</Stack>
						</PopoverDropdown>
					</Popover>
				);
		}
	});

	const buildSmallScreenMenu = menuRoutes.map((item) => {
		switch (item.type) {
			case RouteItemType.MENU_HEADER:
				return (
					<Box key={item.title + 'box'}>
						<NavLink
							key={item.title}
							label={<>{item.title}</>}
							onClick={onMenuClick}
							component={RouterNavLink}
							to={item.path}
							description={<>{item.description ?? ''}</>}
						/>
					</Box>
				);
			case RouteItemType.MENU_HEADER_WITH_CHILDREN:
				return (
					<Box key={item.title + 'box_navlink'}>
						<NavLink
							key={item.title}
							label={<>{item.title}</>}
							onClick={() => toggleLink(item.title)}
							rightSection={
								<IconChevronDown
									color={theme.colors.primary[6]}
									size={16}
									style={{
										transform: openLinks[item.title] ? 'rotate(180deg)' : 'rotate(0deg)',
										transition: 'transform 0.2s ease',
									}}
								/>
							}
						/>
						<Collapse in={!!openLinks[item.title]}>
							{item.children?.map((child) => (
								<NavLink
									key={child.title}
									label={<>{child.title}</>}
									onClick={onMenuClick}
									component={RouterNavLink}
									to={child.path}
									description={<>{child.description ?? ''}</>}
									leftSection={child.icon && <child.icon color={accentColor} />}
								/>
							))}
						</Collapse>
					</Box>
				);
		}
	});

	return (
		<>
			<Box visibleFrom="sm">{buildMenu}</Box>
			<Box hiddenFrom="sm">{buildSmallScreenMenu}</Box>
		</>
	);
}
