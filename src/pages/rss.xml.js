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
        xmlns: {
            media: "http://search.yahoo.com/mrss/",
            atom: "http://www.w3.org/2005/Atom",
          },
        items: episodes.map((episode) => ({
            title: episode.data.guest_name,
            pubDate: episode.data.pubDate,
            description: episode.data.description,
            link: slugEp(episode),
            customData: episode.data.image && `<media:content
            type="image/${episode.data.image.slice(episode.data.image.lastIndexOf('.') + 1)}"
            medium="image"
            url="${episode.data.image}" />`,
        })),
        // (optional) inject custom xml
        customData: `<language>en-us</language>
        <atom:link href="${context.site}rss.xml" rel="self" type="application/rss+xml" />`,
    });
}