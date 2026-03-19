import { MetadataRoute } from "next";
import apps from "@/data/apps.json";
import { App } from "@/app/types";

export default function sitemap(): MetadataRoute.Sitemap {
  const appRoutes = (apps as App[]).map((app) => ({
    url: `https://nxrmod.vercel.app/apps/${app.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://nxrmod.vercel.app",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...appRoutes,
  ];
}
