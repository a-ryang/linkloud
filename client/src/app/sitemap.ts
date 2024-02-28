import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://linkloud.io";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/menu`,
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: `${baseUrl}/library`,
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: `${baseUrl}/links/new`,
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: `${baseUrl}/links/edit`,
      lastModified: new Date(),
      priority: 0.5,
    },
  ];
}
