/**
 * Site-wide config — single source of truth for SEO & branding.
 *
 * Update `url` once you deploy. Everything else (sitemap, metadata,
 * structured data) reads from here.
 */

export const siteConfig = {
  name: "prism",
  fullName: "prism — Universal AI Design Reference",
  tagline: "One API, eleven styles, refracted for AI agents.",
  description:
    "A 4-layer reference library for AI agents (and humans) building modern web UI in 2026. 11 visual styles, 484 components, 38 page patterns, 35 motion entries, 14 templates. MIT licensed.",
  /**
   * Base URL — UPDATE WHEN DEPLOYED.
   * Set NEXT_PUBLIC_SITE_URL env var for production overrides.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://prism.dev",
  ogImage: "/opengraph-image",
  twitter: "@prismui",
  github: "https://github.com/ekonugroho98/prism",
  author: {
    name: "Eko Nugroho",
    url: "https://github.com/ekonugroho98",
  },
  keywords: [
    "design system",
    "react components",
    "tailwind css",
    "next.js",
    "ai agents",
    "ai design reference",
    "component library",
    "glassmorphism",
    "bento grid",
    "swiss modernist",
    "ai-native ui",
    "risograph design",
    "kinetic typography",
    "aurora glass",
    "claymorphism",
    "neumorphism",
    "neubrutalism",
    "gradient mesh",
    "ui patterns",
    "page templates",
    "motion library",
    "framer motion",
    "react three fiber",
  ],
  /** Open Graph defaults */
  og: {
    type: "website",
    locale: "en_US",
    siteName: "prism",
  },
  /** Locales served (used by sitemap + alternates) */
  locales: ["en"],
  /** Default locale */
  defaultLocale: "en",
} as const;

export type SiteConfig = typeof siteConfig;
