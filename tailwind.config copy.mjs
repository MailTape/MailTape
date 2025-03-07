/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		container: {
			center: true,
		},
		extend: {
			fontFamily: {
				'superspitze':['Superspitze Grotesk','Helvetica Neue','Helvetica,Arial'],
				'heading':['Bebas Neue','Helvetica Neue','Helvetica,Arial'],
				'body':['Roboto','Helvetica Neue','Helvetica,Arial'],
				'brush':['Caveat','Helvetica Neue','Helvetica,Arial'],
			},
			colors: {
				grey: 'rgba(51, 51, 51, 1.0000)',
				lighterGrey: 'rgba(51, 51, 51, 0.9)',
				dreamy: 'rgba(34, 172, 221, 1.0000)', 
				rough: 'rgba(240, 60, 45, 1.0000)',
				bliss: 'rgba(237, 19, 112, 1.0000)', 
				trippy: 'rgba(35, 177, 76, 1.0000)',
				vibrant: 'rgba(251, 226, 6, 1.0000)',
			}
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}