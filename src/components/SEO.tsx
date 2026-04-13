import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageType?: string;
  keywords?: string[];
  robots?: string;
  type?: "website" | "profile";
  noIndex?: boolean;
};

const SITE_URL = "https://pavithraninfo.dev";
const SITE_NAME = "Pavithran G";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.svg`;
const DEFAULT_ROBOTS = "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";
const DEFAULT_KEYWORDS = [
  "Pavithran G",
  "AI ML developer",
  "machine learning portfolio",
  "computer vision projects",
  "automation workflows",
  "Python developer",
  "React portfolio",
  "TensorFlow projects",
  "UiPath automation",
  "n8n workflows",
];

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
  imageAlt = "Pavithran G AI and ML Developer Portfolio",
  imageWidth = 1200,
  imageHeight = 630,
  imageType = "image/svg+xml",
  keywords = DEFAULT_KEYWORDS,
  robots,
  type = "website",
  noIndex = false,
}: SeoProps) {
  useEffect(() => {
    const normalizedPath = (path.startsWith("/") ? path : `/${path}`).split("?")[0].split("#")[0] || "/";
    const canonicalUrl = `${SITE_URL}${normalizedPath}`;
    const robotsContent = noIndex
      ? "noindex,nofollow,max-image-preview:none,max-snippet:-1,max-video-preview:-1"
      : (robots ?? DEFAULT_ROBOTS);
    const keywordContent = keywords.filter(Boolean).join(", ");

    document.title = title;

    upsertCanonical(canonicalUrl);
    upsertAlternateLang(canonicalUrl);

    upsertMeta("name", "description", description);
    upsertMeta("name", "author", "Pavithran G");
    upsertMeta("name", "application-name", SITE_NAME);
    upsertMeta("name", "generator", "Vite + React + TypeScript");
    upsertMeta("name", "theme-color", "#000000");
    upsertMeta("name", "color-scheme", "dark");
    upsertMeta("name", "keywords", keywordContent);
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
    upsertMeta("property", "og:image:type", imageType);
    upsertMeta("property", "og:image:width", String(imageWidth));
    upsertMeta("property", "og:image:height", String(imageHeight));
    upsertMeta("property", "og:image:alt", imageAlt);
    upsertMeta("property", "og:locale", "en_US");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:site", "@Pavithran030");
    upsertMeta("name", "twitter:creator", "@Pavithran030");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);
    upsertMeta("name", "twitter:image:alt", imageAlt);

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url: canonicalUrl,
      inLanguage: "en",
      isPartOf: {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: image,
        contentUrl: image,
        caption: imageAlt,
        width: imageWidth,
        height: imageHeight,
      },
    };

    let script = document.getElementById("structured-data-page") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "structured-data-page";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, [title, description, path, image, imageAlt, imageWidth, imageHeight, imageType, keywords, robots, type, noIndex]);

  return null;
}
