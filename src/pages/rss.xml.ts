import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import MarkDownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";

const parser = new MarkDownIt();

export async function GET(context: APIContext) {
  const posts = await getCollection("posts");
  return rss({
    title: "Rythm Nation",
    description: "A community of music producers and enthusiasts",
    site: context.site?.toString() ?? "",
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      content: sanitizeHtml(parser.render(post.body)),
      image: post.data.image.src,
    })),
  });
}
