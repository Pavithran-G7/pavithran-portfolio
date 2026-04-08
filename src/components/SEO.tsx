import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  robots?: string;
  type?: "website" | "profile";
  noIndex?: boolean;
};

const SITE_URL = "https://pavithraninfo.dev";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.svg`;
const SITE_NAME = "Pavithran G Portfolio";
const DEFAULT_ROBOTS = "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  const selector = `meta[${attribute}='${key}']`;
  let meta = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, key);
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let canonical = document.head.querySelector("link[rel='canonical']") as HTMLLinkElement | null;

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }

  canonical.setAttribute("href", href);
}

function upsertAlternateLang(href: string) {
  const entries: Array<{ hreflang: string; url: string }> = [
    { hreflang: "en", url: href },
    { hreflang: "x-default", url: href },
  ];

  entries.forEach(({ hreflang, url }) => {
    const selector = `link[rel='alternate'][hreflang='${hreflang}']`;
    let link = document.head.querySelector(selector) as HTMLLinkElement | null;

    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "alternate");
      link.setAttribute("hreflang", hreflang);
      document.head.appendChild(link);
    }

    link.setAttribute("href", url);
  });
}

export function SEO({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  robots,
  type = "website",
  noIndex = false,
}: SeoProps) {
  useEffect(() => {
    const normalizedPath = (path.startsWith("/") ? path : `/${path}`).split("?")[0].split("#")[0] || "/";
    const canonicalUrl = `${SITE_URL}${normalizedPath}`;
    const robotsContent = noIndex
      ? "noindex,nofollow,max-image-preview:none"
      : (robots ?? DEFAULT_ROBOTS);

    document.title = title;

    upsertCanonical(canonicalUrl);
    upsertAlternateLang(canonicalUrl);

    upsertMeta("name", "description", description);
    upsertMeta("name", "author", "Pavithran G");
    upsertMeta("name", "robots", robotsContent);
    upsertMeta("name", "googlebot", robotsContent);
    upsertMeta("name", "bingbot", robotsContent);

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:image:secure_url", image);
    upsertMeta("property", "og:image:alt", "Pavithran G AI and ML Developer Portfolio");
    upsertMeta("property", "og:locale", "en_US");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);
    upsertMeta("name", "twitter:image:alt", "Pavithran G AI and ML Developer Portfolio");
  }, [title, description, path, image, robots, type, noIndex]);

  return null;
}
