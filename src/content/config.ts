import { defineCollection, z } from 'astro:content';

const episodes = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		published: z.boolean(),
		author: z.string(),
		illustrator: z.string().optional(),
		writer: z.string().optional(),
		category: z.string(),
		guest_name: z.string(),
		guest_color: z.string(),
		guestPic: z.string(),
		track1_title: z.string(),
		track2_title: z.string(),
		track3_title: z.string(),
		track4_title: z.string(),
		track5_title: z.string(),
		track6_title: z.string(),
		track7_title: z.string(),
		track1_color: z.string(),
		track2_color: z.string(),
		track3_color: z.string(),
		track4_color: z.string(),
		track5_color: z.string(),
		track6_color: z.string(),
		track7_color: z.string(),
		track1_link: z.string().url(),
		track2_link: z.string().url(),
		track3_link: z.string().url(),
		track4_link: z.string().url(),
		track5_link: z.string().url(),
		track6_link: z.string().url(),
		track7_link: z.string().url(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		episode_URL: z.string().url(),
		image: z.string().optional(),
		musiColor: z.string(),
	}),
});

export const collections = { episodes };
