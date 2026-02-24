import { layoutDimensions } from '../constants/layoutDimensions';
import { Box, Container, Text } from '@mantine/core';

export default function Footer() {
	return (
		<Box
			h={layoutDimensions.FOOTER_HEIGHT}
			bg='var(--mantine-color-gray-1)'
			style={{ borderTop: '1px solid var(--mantine-color-gray-3)' }}
		>
			<Container size='xl' h='100%' style={{ display: 'flex', alignItems: 'center' }}>
				<Text size='sm' c='dimmed'>
					&copy; {new Date().getFullYear()} NorthStar Company. All rights reserved.
				</Text>
			</Container>
		</Box>
	);
}
