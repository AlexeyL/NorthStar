import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export function useBreakpointBelow(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl') {
	const theme = useMantineTheme();
	return useMediaQuery(`(max-width: ${theme.breakpoints[size]})`);
}
