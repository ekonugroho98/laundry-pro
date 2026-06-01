/**
 * Rhythm — codified spacing, typography, and layout rules per style.
 *
 * AI models sample prism's components correctly but miss the *rhythm* —
 * spacing scale, type ratios, section padding. Output ends up looking
 * "off" even when the components are right.
 *
 * This file is the explicit source of truth. Read by:
 *   - /api/registry > rhythm
 *   - /api/rhythm endpoint
 *   - llms.txt > Rhythm section
 *
 * Rules of thumb when authoring a new style:
 *   - Pick ONE base unit (usually 8px or 4px)
 *   - All spacing must be a multiple of it
 *   - Type ratio: 1.25 (relaxed) → 1.5 (editorial) → 2.0 (kinetic display)
 *   - Section padding: shorter for dense info (py-16) vs marketing (py-24)
 */

export type StyleRhythm = {
  /** Style slug — must match folder name */
  slug: string;
  /** Section block padding (Tailwind class). Used between major sections. */
  sectionPadding: string;
  /** Vertical gap between consecutive sections — when no padding ownership */
  sectionGap: string;
  /** Container max-width Tailwind class */
  containerMax: string;
  /** Card padding (Tailwind) — internal padding for cards/tiles */
  cardPadding: string;
  /** Grid gap between tiles/cards (Tailwind) */
  gridGap: string;
  /** Type scale ratio (h2 = h1 / ratio) */
  typeRatio: number;
  /** Type sizes — Tailwind classes for each role */
  type: {
    display: string;     // hero h1
    headline: string;    // section h2
    title: string;       // card h3
    body: string;        // p
    bodyLarge: string;   // lede paragraph
    caption: string;     // muted small text
    eyebrow: string;     // small uppercase label
    mono: string;        // metadata, prices
  };
  /** Display font weight — the hardest rule to break */
  displayWeight: string;
  /** Spacing scale — what px values are "allowed" multiples */
  spacingScale: number[];
  /** Border radius scale */
  radiusScale: {
    none: string;        // 0
    sm: string;          // small
    md: string;          // default for cards
    lg: string;          // hero/large surfaces
    full: string;        // pills
  };
  /** Hairline / divider thickness */
  divider: string;
  /** Color application philosophy — tells AI when to use accent color */
  colorPolicy: string;
};

export const rhythm: StyleRhythm[] = [
  {
    slug: "glassmorphism",
    sectionPadding: "py-20 sm:py-24",
    sectionGap: "gap-12",
    containerMax: "max-w-6xl",
    cardPadding: "p-5 sm:p-6",
    gridGap: "gap-3 sm:gap-4",
    typeRatio: 1.5,
    type: {
      display: "text-5xl sm:text-6xl lg:text-7xl",
      headline: "text-3xl sm:text-4xl lg:text-5xl",
      title: "text-lg font-semibold",
      body: "text-base",
      bodyLarge: "text-lg",
      caption: "text-xs text-muted",
      eyebrow: "text-xs font-medium uppercase tracking-widest text-muted",
      mono: "font-mono text-xs",
    },
    displayWeight: "font-bold",
    spacingScale: [4, 8, 12, 16, 24, 32, 48, 64, 96],
    radiusScale: { none: "rounded-none", sm: "rounded-md", md: "rounded-2xl", lg: "rounded-3xl", full: "rounded-full" },
    divider: "border-white/40 dark:border-white/10",
    colorPolicy: "Tone-tinted glass surfaces. Aurora gradient as ambient bg. Single accent (violet) on primary CTA only.",
  },
  {
    slug: "aurora-glass",
    sectionPadding: "py-20 sm:py-24",
    sectionGap: "gap-12",
    containerMax: "max-w-6xl",
    cardPadding: "p-6",
    gridGap: "gap-4",
    typeRatio: 1.5,
    type: {
      display: "text-5xl sm:text-7xl lg:text-8xl",
      headline: "text-3xl sm:text-5xl",
      title: "text-xl font-semibold",
      body: "text-base",
      bodyLarge: "text-lg",
      caption: "text-xs text-muted",
      eyebrow: "text-xs font-bold uppercase tracking-widest text-muted",
      mono: "font-mono text-xs",
    },
    displayWeight: "font-bold",
    spacingScale: [4, 8, 12, 16, 24, 32, 48, 64, 96],
    radiusScale: { none: "rounded-none", sm: "rounded-md", md: "rounded-2xl", lg: "rounded-3xl", full: "rounded-full" },
    divider: "border-white/40 dark:border-white/10",
    colorPolicy: "Iridescent borders for emphasis. Aurora-text gradient on display headlines only. Violet/pink/cyan triad — never solid.",
  },
  {
    slug: "gradient-mesh",
    sectionPadding: "py-20 sm:py-24",
    sectionGap: "gap-12",
    containerMax: "max-w-6xl",
    cardPadding: "p-6",
    gridGap: "gap-4",
    typeRatio: 1.5,
    type: {
      display: "text-5xl sm:text-7xl lg:text-8xl",
      headline: "text-3xl sm:text-5xl",
      title: "text-xl font-semibold",
      body: "text-base",
      bodyLarge: "text-lg",
      caption: "text-xs text-muted",
      eyebrow: "text-xs font-bold uppercase tracking-widest text-muted",
      mono: "font-mono text-xs",
    },
    displayWeight: "font-bold",
    spacingScale: [4, 8, 12, 16, 24, 32, 48, 64, 96],
    radiusScale: { none: "rounded-none", sm: "rounded-md", md: "rounded-2xl", lg: "rounded-3xl", full: "rounded-full" },
    divider: "border-zinc-200/60 dark:border-zinc-700/40",
    colorPolicy: "Mesh blobs in bg. mesh-text gradient for hero. Otherwise solid neutral surfaces.",
  },
  {
    slug: "bento-grid",
    sectionPadding: "py-16 sm:py-20",
    sectionGap: "gap-8 sm:gap-12",
    containerMax: "max-w-6xl",
    cardPadding: "p-5 sm:p-6",
    gridGap: "gap-3 sm:gap-4",
    typeRatio: 1.6,
    type: {
      display: "text-5xl sm:text-7xl",
      headline: "text-3xl sm:text-5xl",
      title: "text-xl font-bold tracking-tight",
      body: "text-sm",
      bodyLarge: "text-base",
      caption: "text-xs text-muted",
      eyebrow: "text-[10px] font-bold uppercase tracking-widest text-muted",
      mono: "font-mono text-xs",
    },
    displayWeight: "font-bold tracking-tight",
    spacingScale: [4, 8, 16, 24, 48, 64, 96],
    radiusScale: { none: "rounded-none", sm: "rounded-lg", md: "rounded-2xl", lg: "rounded-3xl", full: "rounded-full" },
    divider: "border-zinc-200 dark:border-zinc-800",
    colorPolicy: "Per-tile accent (violet/pink/emerald/sky/amber/rose) on Bento tiles only — pick 1-2 hero tiles per grid, not every. Surfaces otherwise stark white/black.",
  },
  {
    slug: "neumorphism",
    sectionPadding: "py-20",
    sectionGap: "gap-10",
    containerMax: "max-w-5xl",
    cardPadding: "p-6 sm:p-8",
    gridGap: "gap-4 sm:gap-6",
    typeRatio: 1.5,
    type: {
      display: "text-4xl sm:text-6xl",
      headline: "text-2xl sm:text-4xl",
      title: "text-lg font-semibold",
      body: "text-sm",
      bodyLarge: "text-base",
      caption: "text-xs text-muted",
      eyebrow: "text-xs font-medium uppercase tracking-widest text-muted",
      mono: "font-mono text-xs",
    },
    displayWeight: "font-bold",
    spacingScale: [8, 12, 16, 24, 32, 48, 64],
    radiusScale: { none: "rounded-none", sm: "rounded-xl", md: "rounded-2xl", lg: "rounded-3xl", full: "rounded-full" },
    divider: "border-zinc-200 dark:border-zinc-700",
    colorPolicy: "Bg matches surface — carved feel. No accent surfaces. Single color for primary CTA only. Soft, monochromatic.",
  },
  {
    slug: "claymorphism",
    sectionPadding: "py-16 sm:py-20",
    sectionGap: "gap-10",
    containerMax: "max-w-6xl",
    cardPadding: "p-5 sm:p-6",
    gridGap: "gap-4",
    typeRatio: 1.6,
    type: {
      display: "text-5xl sm:text-7xl",
      headline: "text-3xl sm:text-5xl",
      title: "text-xl font-bold",
      body: "text-base",
      bodyLarge: "text-lg",
      caption: "text-xs text-muted",
      eyebrow: "text-xs font-bold uppercase tracking-widest text-muted",
      mono: "font-mono text-xs",
    },
    displayWeight: "font-extrabold tracking-tight",
    spacingScale: [4, 8, 12, 16, 24, 32, 48, 64],
    radiusScale: { none: "rounded-md", sm: "rounded-xl", md: "rounded-2xl", lg: "rounded-[2rem]", full: "rounded-full" },
    divider: "border-violet-200/40 dark:border-violet-700/20",
    colorPolicy: "Vivid pastel cards (violet/pink/emerald/sky/amber/rose). Multiple accents per page OK — playfulness is the brand.",
  },
  {
    slug: "neubrutalism",
    sectionPadding: "py-16 sm:py-20",
    sectionGap: "gap-12",
    containerMax: "max-w-6xl",
    cardPadding: "p-5 sm:p-6",
    gridGap: "gap-4",
    typeRatio: 1.8,
    type: {
      display: "text-6xl sm:text-8xl",
      headline: "text-4xl sm:text-6xl",
      title: "text-xl font-black uppercase",
      body: "text-base",
      bodyLarge: "text-lg",
      caption: "text-xs",
      eyebrow: "text-[10px] font-black uppercase tracking-widest",
      mono: "font-mono text-xs",
    },
    displayWeight: "font-black uppercase tracking-tighter",
    spacingScale: [4, 8, 16, 24, 48, 64],
    radiusScale: { none: "rounded-none", sm: "rounded-sm", md: "rounded-md", lg: "rounded-lg", full: "rounded-full" },
    divider: "border-2 border-zinc-950 dark:border-zinc-50",
    colorPolicy: "Vivid solid blocks (yellow/pink/sky/emerald). Hard-offset shadows are the signature — never soft. Black borders on every surface.",
  },
  {
    slug: "kinetic-typography",
    sectionPadding: "py-20 sm:py-24",
    sectionGap: "gap-16",
    containerMax: "max-w-6xl",
    cardPadding: "p-6",
    gridGap: "gap-4",
    typeRatio: 2.0,
    type: {
      display: "text-7xl sm:text-9xl",
      headline: "text-4xl sm:text-7xl",
      title: "text-xl font-bold",
      body: "text-base",
      bodyLarge: "text-lg",
      caption: "text-xs text-muted",
      eyebrow: "kinetic-eyebrow",
      mono: "font-mono text-xs",
    },
    displayWeight: "font-extrabold tracking-tight",
    spacingScale: [4, 8, 16, 24, 32, 48, 64, 96, 128],
    radiusScale: { none: "rounded-none", sm: "rounded-md", md: "rounded-xl", lg: "rounded-2xl", full: "rounded-full" },
    divider: "border-zinc-900/10 dark:border-zinc-100/10",
    colorPolicy: "Type IS the design. Accent = kinetic-gradient-text on display only. Body stays monochrome. Restraint elsewhere.",
  },
  {
    slug: "swiss-modernist",
    sectionPadding: "py-20 sm:py-24",
    sectionGap: "gap-16",
    containerMax: "max-w-6xl",
    cardPadding: "p-6",
    gridGap: "gap-px bg-[rgb(var(--swiss-rule))]",
    typeRatio: 1.5,
    type: {
      display: "text-5xl sm:text-7xl lg:text-8xl",
      headline: "text-3xl sm:text-5xl",
      title: "text-xl font-medium",
      body: "text-base",
      bodyLarge: "text-lg",
      caption: "text-sm text-[rgb(var(--swiss-muted))]",
      eyebrow: "swiss-eyebrow",
      mono: "swiss-mono text-xs",
    },
    displayWeight: "font-medium tracking-tight",
    spacingScale: [4, 8, 16, 24, 48, 64, 96],
    radiusScale: { none: "rounded-none", sm: "rounded-none", md: "rounded-none", lg: "rounded-none", full: "rounded-full" },
    divider: "border-[rgb(var(--swiss-rule))]",
    colorPolicy: "Paper + ink + hairlines. Single red accent (red-600) ONLY for destructive states or one editorial flourish per page. Never gradient.",
  },
  {
    slug: "ai-native",
    sectionPadding: "py-20 sm:py-24",
    sectionGap: "gap-12",
    containerMax: "max-w-6xl",
    cardPadding: "p-6",
    gridGap: "gap-4",
    typeRatio: 1.6,
    type: {
      display: "text-6xl sm:text-8xl",
      headline: "text-3xl sm:text-5xl",
      title: "text-xl font-semibold",
      body: "text-base",
      bodyLarge: "text-lg",
      caption: "text-sm text-[rgb(var(--ai-ink-muted))]",
      eyebrow: "text-[11px] font-medium uppercase tracking-wider text-[rgb(var(--ai-ink-muted))]",
      mono: "font-mono text-xs",
    },
    displayWeight: "ai-display",
    spacingScale: [4, 8, 16, 24, 32, 64, 96],
    radiusScale: { none: "rounded-none", sm: "rounded-lg", md: "rounded-2xl", lg: "rounded-3xl", full: "rounded-full" },
    divider: "border-[rgb(var(--ai-ring))]",
    colorPolicy: "Holographic aurora reserved for: primary CTAs, brand chip, hero display text. Body content stays monochrome. State-reactive: thinking adds shimmer, streaming adds cursor.",
  },
  {
    slug: "risograph",
    sectionPadding: "py-16 sm:py-20",
    sectionGap: "gap-12",
    containerMax: "max-w-6xl",
    cardPadding: "p-5 sm:p-6",
    gridGap: "gap-4 sm:gap-6",
    typeRatio: 1.4,
    type: {
      display: "text-7xl sm:text-9xl",
      headline: "text-4xl sm:text-6xl",
      title: "text-2xl font-extrabold uppercase",
      body: "text-base",
      bodyLarge: "text-lg",
      caption: "text-xs",
      eyebrow: "riso-eyebrow",
      mono: "font-mono text-xs",
    },
    displayWeight: "riso-display",
    spacingScale: [4, 8, 16, 24, 40, 64],
    radiusScale: { none: "rounded-none", sm: "rounded-sm", md: "rounded-md", lg: "rounded-md", full: "rounded-full" },
    divider: "border-2 border-[rgb(var(--riso-ink))]",
    colorPolicy: "Pink/blue/yellow/ink solid blocks. Halftone overlays for warmth. Slight rotation jitter (riso-rotate-*) on max 1-in-3 cards.",
  },
];

/** Look up rhythm config for a style slug. */
export function rhythmFor(slug: string): StyleRhythm | undefined {
  return rhythm.find((r) => r.slug === slug);
}

/**
 * Universal rules — apply across ALL styles.
 * AI models that miss these produce technically-correct but cheap-looking UIs.
 */
export const universalRules = [
  "Always wrap pages in the matching <{Style}Background /> component (e.g. AiBackground for ai-native).",
  "Section padding goes on the <section> element, not the parent <main>.",
  "Use container's containerMax for content-width sections; full-bleed bg goes on parent.",
  "Eyebrow (small uppercase label) ALWAYS comes before headline, separated by ~24px.",
  "Display headlines use 1-3 lines max — break with <br/> for rhythm.",
  "Subtitle paragraphs cap at max-w-2xl (~60-70 chars) for readability.",
  "Stats rows use grid-cols-2 sm:grid-cols-4 — never 3 (visual asymmetry).",
  "Pricing tiers: 2 or 3 cards — middle one gets 'recommended' badge if 3.",
  "Footer goes on its own border-t section, never inside <main>.",
  "Mobile breakpoint: design for 375px viewport first; everything else is enhancement.",
  "Don't combine styles vertically without spacing. Each style 'world' needs breathing room.",
  "Animated motion components (ai-aurora, kinetic-marquee) honor prefers-reduced-motion automatically — don't bypass.",
];
