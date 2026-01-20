import { Footer, Header, layoutDimensions } from '@features';
import { AppShell, Box } from '@mantine/core';

export default function PageLayout({ children }: { children: React.ReactNode }) {
	return (
		<AppShell header={{ height: layoutDimensions.HEADER_HEIGHT }}>
			<AppShell.Header>
				<Header />
			</AppShell.Header>
			<AppShell.Main h='100dvh' display={'flex'} style={{ display: 'flex', flexDirection: 'column' }}>
				<Box p={'md'}>{children}</Box>
				<Footer />
			</AppShell.Main>
		</AppShell>
	);
}
