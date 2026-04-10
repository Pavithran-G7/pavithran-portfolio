import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const siteUrl = "https://pavithraninfo.dev";

// Add future public routes here when the portfolio grows.
const routes = [
  { path: "/", changefreq: "daily", priority: "1.0" },
];

const now = new Date().toISOString().split("T")[0];

const urls = routes
  .map((route) => {
    const loc = `${siteUrl}${route.path}`;
    return [
      "  <url>",
      `    <loc>${loc}</loc>`,
      `    <lastmod>${now}</lastmod>`,
      `    <changefreq>${route.changefreq}</changefreq>`,
      `    <priority>${route.priority}</priority>`,
      "  </url>",
    ].join("\n");
  })
  .join("\n");

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  urls,
  "</urlset>",
  "",
].join("\n");

const outFile = resolve("public", "sitemap.xml");
writeFileSync(outFile, xml, "utf8");

console.log(`Generated sitemap at ${outFile} with ${routes.length} url(s).`);
