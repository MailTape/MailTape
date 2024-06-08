import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import slugEp from "../utils/slugEp.js";

export async function GET(context) {
    const episodes = await getCollection('episodes');
    return rss({
        title: 'MailTape',
        description: 'A place for music lovers by music lovers',
        // Pull in your project "site" from the endpoint context
        // https://docs.astro.build/en/reference/api-reference/#contextsite
        site: context.site,
        items: episodes.map((episode) => ({
            title: episode.data.guest_name,
            pubDate: episode.data.pubDate,
            description: episode.data.description,
            link: slugEp(episode)
        })),
        // (optional) inject custom xml
        customData: `<language>en-us</language>`,
    });
}