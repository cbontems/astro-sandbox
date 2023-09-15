import { defineCollection, z } from "astro:content";
import {format} from "date-fns";

const postsCollection = defineCollection({
  schema: ({ image }) => z.object({
    author: z.string(),
    categories: z.array(z.string()),
    date: z.string().transform(str => format(new Date(str), "MMMM d, yyyy")),
    featured: z.boolean().default(false),
    image: image().refine((img) => img.width >= 640, {
      message: "Post cover image must be at least 640 pixels wide!",
    }),
    title: z.string(),
    description: z.string(),
  }),
});

const authorsCollection = defineCollection({
  schema: ({ image }) => z.object({
    name: z.string(),
    image: image(),
  }),
});

export const collections = {
  posts: postsCollection,
  authors: authorsCollection,
};
