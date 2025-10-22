import type { Config, Context } from "@netlify/edge-functions"

const APPLICABLE_SITE_IDS = [
  "f1ab7d85-3748-4c2b-b264-6367c2f9aecb",
]

export default async function handler(req: Request, context: Context) {
  try {
    // Skip adding cache headers for sites not leveraging Cloudfront CDN
    const siteId = context.site.id || ""
    if (!APPLICABLE_SITE_IDS.includes(siteId)) {
      return context.next()
    }

    const url = new URL(req.url)

    const res = await context.next()
    const contentType = res.headers.get("content-type") || ""

    const isHTML = contentType.includes("text/html")
    const isJSON = contentType.includes("application/json")
    const isRSC =
      url.searchParams.has("_rsc") ||
      req.headers.get("RSC") === "1" ||
      contentType.includes("text/x-component")

    if (isHTML || isJSON || isRSC) {
      res.headers.set("Cache-Control", "public, max-age=30")
    }

    return res
  } catch (err) {
    console.error("Edge function error: ", err)
    return context.next()
  }
}

export const config: Config = {
  path: "/*",
  cache: "manual", // Required to opt into Netlify caching
  excludedPath: ["/_next/static/*", "/_netlify/_next/static/*", "/api/*"],
}
