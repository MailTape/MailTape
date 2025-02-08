import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const episodes = defineCollection({
	loader: glob({ pattern: '**/[^_]*.md', base: "src/content/episodes" }),
	// Type-check frontmatter using a schema
	schema: z.object({
		published: z.boolean(),
		author: z.string(),
		illustrator: z.string().optional(),
		writer: z.string().optional(),
		category: z.string(),
		guest_name: z.string(),
		guest_color: z.string().optional(),
		guestPic: z.string().optional(),
		track1_title: z.string().optional(),
		track2_title: z.string().optional(),
		track3_title: z.string().optional(),
		track4_title: z.string().optional(),
		track5_title: z.string().optional(),
		track6_title: z.string().optional(),
		track7_title: z.string().optional(),
		track1_color: z.string().optional(),
		track2_color: z.string().optional(),
		track3_color: z.string().optional(),
		track4_color: z.string().optional(),
		track5_color: z.string().optional(),
		track6_color: z.string().optional(),
		track7_color: z.string().optional(),
		track1_link: z.string().url().optional(),
		track2_link: z.string().url().optional(),
		track3_link: z.string().url().optional(),
		track4_link: z.string().url().optional(),
		track5_link: z.string().url().optional(),
		track6_link: z.string().url().optional(),
		track7_link: z.string().url().optional(),
		description: z.string().optional(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		episode_URL: z.string().url().optional(),
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
		link: z.string().url().optional(),
	}),
});

export const collections = { episodes, crew };
