import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { ADMIN_PATH } from "@/lib/admin-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [ADMIN_PATH, "/api/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
