/**
 * Swiss Modernist / Editorial Grid — Design Tokens
 *
 * Style 09 of 11. "Swiss editorial grid — Linear / Vercel / Resend / Plain
 * lineage." The signature is restraint: hairline rules instead of borders,
 * mono metadata instead of color labels, weight 500 instead of 700+ for
 * display type.
 *
 * Source of truth for CSS variables: `src/app/globals.css` (search "Swiss").
 */

export const swissModernistTokens = {
  light: {
    paper: "rgb(255 255 255)",
    paper2: "rgb(250 250 250)",
    ink: "rgb(15 15 15)",
    ink2: "rgb(38 38 38)",
    muted: "rgb(115 115 115)",
    rule: "rgb(229 229 229)",
    ruleStrong: "rgb(163 163 163)",
    accent: "rgb(220 38 38)",
  },
  dark: {
    paper: "rgb(9 9 9)",
    paper2: "rgb(18 18 18)",
    ink: "rgb(245 245 245)",
    ink2: "rgb(212 212 212)",
    muted: "rgb(140 140 140)",
    rule: "rgb(38 38 38)",
    ruleStrong: "rgb(82 82 82)",
    accent: "rgb(248 113 113)",
  },

  anatomy: [
    "1. Paper surface (pure white / near-black) — no fill variations",
    "2. Hairline rules (1px, swiss-rule) — depth via lines, not shadows",
    "3. 12-column grid — strict modular layout (swiss-grid)",
    "4. Mono metadata (swiss-eyebrow, swiss-mono) — labels, prices, versions",
    "5. Display type at weight 500 max — restraint as luxury",
    "6. Single accent color (red-600) — used flat or not at all",
  ],

  vsOtherStyles: [
    "RESTRAINT-FIRST style — depth via whitespace + hairlines, not shadows or color",
    "Sharp corners ONLY (no rounded-anything except avatars/dots)",
    "Bold weights cap at 500 (vs Bento 700, Brutal 900, Kinetic 800+)",
    "Mono nav links (vs Bento sans, vs Glass nav pills)",
    "12-col grid is the chrome — layout itself is editorial signature",
    "Anti-thesis of AI-Native (which is animated holographic) — Swiss is static, single-accent",
  ],

  whenToUse: [
    "Developer tools / infrastructure landing pages",
    "Editorial reading surfaces — long-form articles, docs",
    "Pricing / changelog pages where information density matters",
    "Indie SaaS targeting designers & developers",
    "Brands wanting to feel timeless rather than trendy",
  ],

  donts: [
    "Don't add box-shadow — hairlines provide all depth",
    "Don't use border-radius greater than 0 (except avatars, status dots, spinners)",
    "Don't use gradients — paper + ink + single accent only",
    "Don't bold beyond 500 — that's the visual fingerprint",
    "Don't add backdrop-blur to cards — only navbar gets a subtle blur for legibility",
    "Don't use emoji or colored icons — monochrome line icons only",
  ],

  components: {
    primitives: [
      "SwissButton (5 variants × 3 sizes — sharp corners, no transform)",
      "SwissCard (paper surface + hairline)",
      "SwissBadge (4 tones — ink/outline/mono/accent)",
      "SwissStatCard (mono numbers, hairline divider)",
      "SwissSegmented (active = ink fill, no slide animation)",
    ],
    composite: [
      "SwissNavbar (full-width, mono nav links, hairline border-b)",
    ],
  },

  pages: {
    "/swiss-modernist": "Style overview + signature page treatment",
    "/swiss-modernist/marketing": "Style-pure marketing landing demo",
  },
} as const;

export type SwissModernistTheme = "light" | "dark";
