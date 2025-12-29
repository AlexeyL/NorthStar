import { HeaderMenu, layoutDimensions, UserMenu } from '@features';
import {
	Anchor,
	Box,
	Burger,
	Center,
	Divider,
	Drawer,
	Group,
	ScrollArea,
	Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconX } from '@tabler/icons-react';

export default function Header() {
	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
		useDisclosure(false);
	const padding = 16;

	const buildHeader = () => {
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
	};

	const buildSmallScreenHeader = () => {
		return (
			<>
				<Center h="100%" hiddenFrom="sm">
					<Burger
						color="white"
						opened={drawerOpened}
						onClick={toggleDrawer}
					/>
				</Center>
				<Drawer
					hiddenFrom="sm"
					opened={drawerOpened}
					onClose={closeDrawer}
					size="100%"
					title={
						<Box
							w="100%"
							h={layoutDimensions.HEADER_HEIGHT - padding * 2}
							p="md"
						>
							<Center h={'100%'}>
								<Anchor href="/">
									<Text c="white">NorthStar</Text>
								</Anchor>
							</Center>
						</Box>
					}
					zIndex={100000}
					closeButtonProps={{
						icon: <IconX size="34" />,
						style: {
							backgroundColor: 'transparent',
							color: 'white',
						},
					}}
					styles={{
						header: {
							backgroundColor: 'var(--mantine-primary-color-6)',
						},
					}}
				>
					<ScrollArea
						h={`calc(100vh - ${layoutDimensions.HEADER_HEIGHT + padding}px)`}
						mx="-md"
						p={10}
					>
						<HeaderMenu onMenuClick={closeDrawer} />
						<Divider my="sm" />
						<UserMenu />
					</ScrollArea>
				</Drawer>
			</>
		);
	};

	return (
		<Box h="100%">
			<Group
				ps={'lg'}
				pe={'lg'}
				justify="space-between"
				align="end"
				wrap="nowrap"
				h="100%"
				bg="var(--mantine-primary-color-6)"
			>
				<Center h={'100%'}>
					<Anchor href="/">
						<Text c="white">NorthStar</Text>
					</Anchor>
				</Center>
				{buildHeader()}
				{buildSmallScreenHeader()}
			</Group>
		</Box>
	);
}
