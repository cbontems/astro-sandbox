import { defineConfig, sharpImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";

import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  site: "https://main--cute-travesseiro-0e201a.netlify.app/",
  output: "server",
  adapter: netlify({
    functionPerRoute: true,
  }),
  image: {
    service: sharpImageService(),
  },
});
