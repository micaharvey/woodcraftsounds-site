import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://woodcraftsounds.com", lastModified: new Date() },
    {
      url: "https://woodcraftsounds.com/tesselrun/privacypolicy",
      lastModified: new Date(),
    },
    {
      url: "https://woodcraftsounds.com/privacy-policy",
      lastModified: new Date(),
    },
    {
      url: "https://woodcraftsounds.com/privacypolicy",
      lastModified: new Date(),
    },
    {
      url: "https://tesselrun.woodcraftsounds.com/privacypolicy",
      lastModified: new Date(),
    },
  ];
}
