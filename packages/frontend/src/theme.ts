import { createTheme, DEFAULT_THEME, mergeMantineTheme } from '@mantine/core';

const themeOverride = createTheme({
	/** Put your mantine theme override here */
	primaryColor: 'primary',
	colors: {
		// base color index = 6 (primary[6])
		primary: ['#e0f5f6', '#b8e6e8', '#8dd6d9', '#61c6cb', '#36b6bd', '#1fa7af', '#19989f', '#13898f', '#0d797f', '#076a70'],
		accent: ['#fff1e4', '#ffe2d0', '#f8c3a2', '#f3a271', '#ee8747', '#ec752c', '#e66414', '#d15a10', '#bb4f0a', '#a34201'],
	},
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);
