import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import astroExpressiveCode from "astro-expressive-code";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeCitation from "rehype-citation";

// https://astro.build/config
export default defineConfig({
  /*
   * GitHub Pages project site:
   * https://khangcntn123.github.io/SketchBloom/
   */
  site: "https://khangcntn123.github.io",
  base: "/SketchBloom",

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    remarkPlugins: [remarkMath],

    rehypePlugins: [
      rehypeKatex,

      [
        rehypeCitation,
        {
          bibliography: "bibliography.bib",
          linkCitations: true,
        },
      ],
    ],
  },

  integrations: [
    icon(),

    astroExpressiveCode({
      styleOverrides: {
        borderRadius: "0.5rem",
        borderWidth: "0",

        codeBackground: ({ theme }) =>
          `var(--color-zinc-${theme.type === "dark" ? "800" : "200"})`,

        frames: {
          shadowColor: "transparent",
        },
      },

      themeCssSelector: (theme) =>
        theme.type === "dark"
          ? `[data-theme="dark"]`
          : `[data-theme="light"]`,
    }),

    mdx(),
    react(),
  ],

  fonts: [
    {
      provider: fontProviders.google(),
      name: "Noto Sans",
      cssVariable: "--font-noto-sans",
      weights: ["100 900"],
    },
  ],

  image: {
    responsiveStyles: true,
  },
});