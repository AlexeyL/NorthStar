import logo from '@assets/logo.png';
import { HeaderMenu, layoutDimensions, UserMenu } from '@features';
import { Anchor, Box, Burger, Center, Divider, Drawer, Group, Image, ScrollArea, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconX } from '@tabler/icons-react';
import { useMemo } from 'react';

export default function Header() {
	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
	const padding = 16;

	const headerLogo = useMemo(() => {
		return (
			<Anchor href="/" style={{ cursor: 'pointer', textDecoration: 'none' }}>
				<Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<Image src={logo} alt="Aptivor logo" height={50} />
					<Text c="primary">Aptivor</Text>
				</Box>
			</Anchor>
		);
	}, []);

	const buildHeader = useMemo(() => {
		return (
			<>
				<Group pb={'sm'} gap={'xs'} visibleFrom="sm">
					<HeaderMenu />
				</Group>
				<Box pb={'sm'} visibleFrom="sm">
					<UserMenu />
				</Box>
			</>
		);
	}, []);

	const buildSmallScreenHeader = useMemo(() => {
		return (
			<>
				<Center h="100%" hiddenFrom="sm">
					<Burger color="primary" opened={drawerOpened} onClick={toggleDrawer} />
				</Center>
				<Drawer
					hiddenFrom="sm"
					opened={drawerOpened}
					onClose={closeDrawer}
					size="100%"
					title={
						<Box w="100%" h={layoutDimensions.HEADER_HEIGHT - padding * 2} p="md">
							<Center h={'100%'}>{headerLogo}</Center>
						</Box>
					}
					zIndex={100000}
					closeButtonProps={{
						icon: <IconX size="34" />,
						style: {
							backgroundColor: 'transparent',
							color: 'var(--mantine-color-primary-6)',
						},
					}}
				>
					<ScrollArea h={`calc(100vh - ${layoutDimensions.HEADER_HEIGHT + padding}px)`} mx="-md" p={10}>
						<HeaderMenu onMenuClick={closeDrawer} />
						<Divider my="sm" c="primary" />
						<UserMenu />
					</ScrollArea>
				</Drawer>
			</>
		);
	}, [drawerOpened, toggleDrawer, closeDrawer, headerLogo]);

	return (
		<Box h="100%">
			<Group ps={'lg'} pe={'lg'} justify="space-between" align="end" wrap="nowrap" h="100%">
				{headerLogo}
				{buildHeader}
				{buildSmallScreenHeader}
			</Group>
		</Box>
	);
}
