import type { MetadataRoute } from "next";
import { applicationMeta } from "@/data/applications";
import { locales } from "@/i18n/config";
import { getAppUrl } from "@/lib/site-url";

const staticPaths = [
  "",
  "/catalogue",
  "/configurateur",
  "/a-propos",
  "/mentions-legales",
  "/politique-confidentialite",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getAppUrl();
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: now,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
      });
    }

    for (const app of applicationMeta) {
      entries.push({
        url: `${base}/${locale}/applications/${app.slug}/apercu`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
      entries.push({
        url: `${base}/${locale}/commander/${app.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
