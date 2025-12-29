import { createTheme, DEFAULT_THEME, mergeMantineTheme } from '@mantine/core';

const themeOverride = createTheme({
	/** Put your mantine theme override here */
	primaryColor: 'primary',
	colors: {
		// base color index = 6 (primary[6])
		primary: [
			'#eff2ff',
			'#dfe2f2',
			'#bdc2de',
			'#99a0ca',
			'#7a84b9',
			'#6672af',
			'#5c69ac',
			'#4c5897',
			'#424e88',
			'#36437a',
		],
		red: [
			'#ffe4de',
			'#ffc5ba',
			'#ffa696',
			'#ff8872',
			'#fc694e',
			'#fa4a3a',
			'#fa4931',
			'#c93b29',
			'#982d20',
			'#671e17',
		],
	},
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);
