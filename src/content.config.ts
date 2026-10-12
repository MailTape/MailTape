import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const episodes = defineCollection({
	loader: glob({ pattern: '**/[^_]*.md', base: "src/content/episodes" }),
	// Type-check frontmatter using a schema
	schema: z.object({
		published: z.boolean(),
		author: z.string(),
		illustrator: z.string().optional().nullable(),
		writer: z.string().optional().nullable(),
		release: z.int(),
		guest_name: z.string(),
		guest_color: z.string().optional(),
		guestPic: z.string().optional(),
		track1: z.object({
			title: z.string().nullish(),
			color: z.string().nullish(),
			link: z.url().nullish(),
		}).optional(),
		track2: z.object({
			title: z.string().nullish(),
			color: z.string().nullish(),
			link: z.url().nullish(),
		}).optional(),
		track3: z.object({
			title: z.string().nullish(),
			color: z.string().nullish(),
			link: z.url().nullish(),
		}).optional(),
		track4: z.object({
			title: z.string().nullish(),
			color: z.string().nullish(),
			link: z.url().nullish(),
		}).optional(),
		track5: z.object({
			title: z.string().nullish(),
			color: z.string().nullish(),
			link: z.url().nullish(),
		}).optional(),
		track6: z.object({
			title: z.string().nullish(),
			color: z.string().nullish(),
			link: z.url().nullish(),
		}).optional(),
		track7: z.object({
			title: z.string().nullish(),
			color: z.string().nullish(),
			link: z.url().nullish(),
		}).optional(),
		description: z.string().optional(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		episode_URL: z.url().optional(),
		image: z.string().optional().optional(),
		musiColor: z.string().optional(),
		alignY: z.string().optional(),
	}),
});

const crew = defineCollection({
	loader: file("src/data/crew.json"),
	schema: z.object({
		id: z.string(),
		name: z.string(),
		roleEN: z.string(),
		roleFR: z.string(),
		profilePic: z.string(),
		link: z.url().optional(),
	}),
});

export const collections = { episodes, crew };
