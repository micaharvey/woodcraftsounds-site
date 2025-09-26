import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://woodcraftsounds.com", lastModified: new Date() }];
}
