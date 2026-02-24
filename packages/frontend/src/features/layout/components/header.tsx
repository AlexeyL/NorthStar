import { HeaderMenu, layoutDimensions, UserMenu } from '@features';
import { Box, Burger, Container, Divider, Drawer, Group, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconX } from '@tabler/icons-react';
import Logo from './logo';

export default function Header() {
	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

	return (
		<Box h='100%' bg='var(--mantine-color-primary-6)'>
			<Container size='xl' h='100%'>
				<Group justify='space-between' align='center' h='100%' wrap='nowrap'>
					<Logo />

					<Group gap='xs' visibleFrom='sm' align='center'>
						<HeaderMenu />
						<UserMenu />
					</Group>

					<Burger color='white' opened={drawerOpened} onClick={toggleDrawer} hiddenFrom='sm' />
				</Group>
			</Container>

			<Drawer
				opened={drawerOpened}
				onClose={closeDrawer}
				size='100%'
				title={<Logo />}
				zIndex={100000}
				closeButtonProps={{
					icon: <IconX size={36} />,
					style: {
						backgroundColor: 'transparent',
						color: 'var(--mantine-color-white)',
						marginRight: 10,
					},
				}}
				styles={{
					header: {
						backgroundColor: 'var(--mantine-color-primary-6)',
						minHeight: layoutDimensions.HEADER_HEIGHT,
					},
				}}
			>
				<ScrollArea h={`calc(100dvh - ${layoutDimensions.HEADER_HEIGHT}px)`} mx='-md' px='md'>
					<HeaderMenu onMenuClick={closeDrawer} />
					<Divider my='sm' />
					<UserMenu />
				</ScrollArea>
			</Drawer>
		</Box>
	);
}
