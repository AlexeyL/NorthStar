import { Footer, Header, layoutDimensions } from '@features';
import { AppShell, Container } from '@mantine/core';

export default function PageLayout({ children }: { children: React.ReactNode }) {
	return (
		<AppShell
			header={{ height: layoutDimensions.HEADER_HEIGHT }}
			footer={{ height: layoutDimensions.FOOTER_HEIGHT }}
		>
			<AppShell.Header>
				<Header />
			</AppShell.Header>

			<AppShell.Main>
				<Container size='xl' py='md'>
					{children}
				</Container>
			</AppShell.Main>

			<AppShell.Footer>
				<Footer />
			</AppShell.Footer>
		</AppShell>
	);
}
