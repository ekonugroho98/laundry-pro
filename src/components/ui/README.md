# Swiss Modernist — AI Reference

Style 09 of 11. **API-compatible** with Glassmorphism / Aurora / Bento /
Mesh — same 44-component scope, same 6 demo pages. Visual treatment is
the **anti-thesis** of AI-Native: paper + hairlines + mono metadata, no
gradients, no shadows, single accent or none at all.

> "Editorial grid — Linear / Vercel / Resend / Plain lineage."
> The signature is **restraint**: depth via whitespace and hairline 1px
> rules, never via blur, shadow, or color flood. Bold weights cap at
> **500**. Layout itself (12-col grid) is the editorial fingerprint.

---

## TL;DR for AI

You're building a UI in swiss-modernist style. Read this section first.

1. **Style identity**: paper surface + 1px hairline rules + mono metadata + ink type. NO shadows. NO border-radius (except avatars, status dots, spinners). NO gradients.
2. **Imports**: `@/components/swiss-modernist/<file>` → `Swiss<Pascal>` exports (kebab-case file → PascalCase export).
3. **Required providers**: `<ThemeProvider>` (already in `app/layout.tsx`). For toasts: `<SwissToastProvider>`.
4. **Background**: `<SwissBackground variant="paper" | "grid" | "baseline" | "blank" />` — `paper` for dashboards, `grid` for marketing/anatomy showcases.
5. **CSS utilities** (in `globals.css`): `.swiss-grid` (12-col), `.swiss-grid-bg` (column gutters bg), `.swiss-headline` / `.swiss-display` (weight 500, tight tracking), `.swiss-eyebrow` (mono uppercase 11px), `.swiss-mono` (tabular nums), `.swiss-rule` / `.swiss-rule-vertical` (1px hairlines), `.swiss-link` (underlined link).
6. **All 6 demo pages share**: `<SwissNavbar>` (full-width, hairline border-b, mono nav links, NOT a floating pill) + `Cmd/Ctrl+K` listener opening `<SwissCommandPalette>`.
7. **Accent discipline**: red-600 light / red-400 dark, used FLAT or NOT AT ALL. Never as gradient. Use sparingly (destructive button, errors, one CTA per page max).

---

## What's different from previous styles

| Aspect | Glass | Bento | AI-Native | **Swiss** |
|---|---|---|---|---|
| Signature | Frost / blur | Asymmetric tile layout | Holographic / animated | **Hairline rules + 12-col grid** |
| Surface | Translucent + blur | Solid + 1px ring | Iridescent + gradient | **Pure paper, 1px hairline border** |
| Corners | `rounded-xl/2xl` | `rounded-md` | `rounded-2xl` | **Sharp 0px** (avatars/dots/spinners excepted) |
| Shadows | Soft drop shadow | Minimal | Glow + chroma | **None — depth via whitespace & rules** |
| Color use | Mood (uniform bg) | Per-tile accent | Multi-hue gradient | **Single accent (red), flat or not at all** |
| Bold weight cap | 600-700 | 700 | 600-800 | **500** (the visual fingerprint) |
| Nav links | Sans, pill hover | Sans | Sans, glow on hover | **Mono uppercase, underline on hover** |
| Metadata | Sans muted | Sans muted | Sans | **Mono uppercase eyebrow** |
| Background req | Colorful aurora MANDATORY | Subtle dotted bg | Animated gradient | **Pure paper (or column-gutter grid)** |
| Best for | Dashboards w/ mood | Marketing tile pages | Generative product UIs | **Docs, pricing, dev tools, editorial reading** |

Rule of thumb: if you're tempted to add a shadow, gradient, or bold
weight 600+, you're not building Swiss anymore.

---

## Anatomy (memorize these 6 layers)

Every Swiss surface stacks these effects, in order. See
`/swiss-modernist/anatomy` for an interactive breakdown.

| # | Layer | Light value | Dark value |
|---|---|---|---|
| 1 | Paper surface (no fill variation) | `rgb(255 255 255)` | `rgb(9 9 9)` |
| 2 | Hairline rule (1px border) | `rgb(229 229 229)` | `rgb(38 38 38)` |
| 3 | Strong rule (1px, emphasis) | `rgb(163 163 163)` | `rgb(82 82 82)` |
| 4 | Ink (text + filled surfaces) | `rgb(15 15 15)` | `rgb(245 245 245)` |
| 5 | Muted (metadata, mono labels) | `rgb(115 115 115)` | `rgb(140 140 140)` |
| 6 | Accent (flat only, used sparingly) | `rgb(220 38 38)` | `rgb(248 113 113)` |

The 7th implicit layer: **12-column grid** as chrome. Layout is the
signature; restraint is the rendering. See `tokens.ts` for canonical
values; `globals.css` for the CSS variables (`--swiss-paper`, `--swiss-ink`,
`--swiss-rule`, `--swiss-rule-strong`, `--swiss-muted`, `--swiss-accent`).

---

## Component decision matrix

When AI is unsure which component to pick, use these tables. APIs are
identical to Glassmorphism (same 44 components, same props).

### Overlays — pick one

| Use case | Component | Why |
|---|---|---|
| Hover hint, decorative, no actions inside | **SwissTooltip** | Paper surface + hairline; hover-only |
| Click-trigger info bubble with buttons/inputs inside | **SwissPopover** | Click-trigger, accepts focusable children |
| Single-select action menu | **SwissDropdown** | Menu semantics, items + onSelect |
| Single-select form value with options | **SwissSelect** | Combobox semantics, search support |
| Page-blocking confirm/full-screen modal | **SwissModal** | Centered overlay, ESC + backdrop click |
| Destructive "Are you sure?" prompt | **SwissConfirmDialog** | Built on Modal, accent-color confirm button |
| Side panel for record details, filters, edit-in-place | **SwissDrawer** | Side/bottom sheet, doesn't lose page context |
| Search-by-keystroke command launcher | **SwissCommandPalette** | ⌘K pattern, grouping + arrow nav |

### Tabs vs Segmented

| Use case | Component | Swiss treatment |
|---|---|---|
| Switching between **content panels** on a single page | **SwissTabs** | **1px ink underline indicator** (not filled box) |
| Switching a **filter** or **single value** | **SwissSegmented** | **Ink-filled active cell**, no slide animation |

Rule: content panels → Tabs. Filter values used elsewhere → Segmented.

### Loading states — pick one

| Use case | Component |
|---|---|
| Whole section / list loading | **SwissSkeleton** (hairline-edged shimmer block) |
| Inline indicator (next to button text) | **SwissSpinner** (1px circular stroke) |
| Async submit button | **SwissButton** with `loading` prop |

### Sidebar on mobile

Always wrap the desktop sidebar in `<SwissMobileNav>` for phones:

```tsx
<div className="hidden lg:block">{desktopSidebar}</div>
<SwissMobileNav className="lg:hidden">
  <SwissSidebar embedded {...sidebarProps} />
</SwissMobileNav>
```

Inside `<SwissMobileNav>`, children can call `useSwissMobileNav().close()`
to auto-dismiss after a tap.

### Form patterns

```tsx
<SwissFormField label="Email" required error={emailError}>
  {({ id, "aria-invalid": invalid }) => (
    <SwissInput id={id} aria-invalid={invalid} ... />
  )}
</SwissFormField>
```

Use the **render-prop** form when you need to wire `id` + `aria-invalid`
to the input. Otherwise pass children directly.

---

## Components (44 files · 15 + 24 + 5)

### Primitives (15)

| Component | File | Required props | Key gotcha |
|---|---|---|---|
| SwissButton | `button.tsx` | — | 5 variants: `default`, `primary` (ink fill), `ghost`, `outline`, `destructive` (accent outline) — sharp corners, no transform on hover |
| SwissCard (+ Header/Title/Description) | `card.tsx` | — | Paper + hairline only. `eyebrow` prop renders mono uppercase label above content with bottom rule |
| SwissInput | `input.tsx` | — | Hairline bottom-border or full border; wrap in `SwissFormField` for label+error |
| SwissTextarea | `textarea.tsx` | — | Resizable by default; pair with FormField |
| SwissBadge | `badge.tsx` | — | 4 tones: `ink` (filled), `outline`, `mono` (mono numerals, no chrome), `accent` (red outline) |
| SwissSwitch | `switch.tsx` | `checked`, `onChange` | Controlled only; sharp track, square thumb |
| SwissSlider | `slider.tsx` | `value`, `onChange` | Range 0–100 default; 1px track, ink thumb |
| SwissCheckbox | `checkbox.tsx` | `checked`, `onChange` | Sharp square, ink fill when checked; label + description supported |
| SwissRadioGroup | `radio.tsx` | `value`, `onChange`, `options` | RadioGroup only — no standalone Radio (round dot is the ONE exception to sharp-corners rule) |
| SwissAvatar (+ Group) | `avatar.tsx` | `initials` OR `src` | Round (avatar exception); `<SwissAvatarGroup max={4}>` for stacked |
| SwissProgress | `progress.tsx` | `value` (0–100) | 1px track, ink fill; mono label allowed |
| SwissSkeleton | `skeleton.tsx` | — | Sized via className (`h-4 w-32` etc.) — sharp, hairline-edged |
| SwissSpinner | `spinner.tsx` | — | 4 sizes; 1px stroke, ink color (round exception) |
| SwissKbd | `kbd.tsx` | — | Mono, sharp corners, 1px hairline border |
| SwissStatusDot | `status-dot.tsx` | — | Round dot exception; online/offline/away/busy + optional pulse |

### Composite controls (24)

| Component | File | Notes |
|---|---|---|
| SwissNavbar | `navbar.tsx` | Full-width sticky bar, hairline `border-b`, subtle `backdrop-blur-md` for legibility. **Mono uppercase nav links** — the Swiss signature move. Default items wired to all 6 demo pages |
| SwissMobileNav (+ useSwissMobileNav) | `mobile-nav.tsx` | Wrap embedded sidebar; children can `close()`. Slide-in panel with hairline divider |
| SwissModal | `modal.tsx` | ESC + backdrop click + X button; sharp corners, paper surface |
| SwissConfirmDialog | `confirm-dialog.tsx` | For destructive actions; built-in async loading; accent-bordered confirm button |
| SwissDrawer | `drawer.tsx` | Left/right/bottom; max-w capped on phones; hairline divider between header and body |
| SwissTooltip | `tooltip.tsx` | Hover-only (no touch); paper + hairline (not dark fill) |
| SwissPopover | `popover.tsx` | Click-trigger; for interactive overlays |
| SwissDropdown | `dropdown.tsx` | Menu semantics; `items[].onSelect`; hairline-divided items |
| SwissSelect | `select.tsx` | Searchable combobox via `searchable` prop; ↑↓ Enter ESC |
| SwissDatePicker | `date-picker.tsx` | Single date, no range, no time |
| SwissFileUpload | `file-upload.tsx` | Drag & drop + click; dashed hairline frame; provides `onFiles(File[])` |
| SwissFormField | `form-field.tsx` | Label + helper + error wrapper; mono uppercase label option |
| SwissSegmented | `segmented.tsx` | Filter switching; **ink-filled active cell, NO slide animation** (distinct from Bento's pill slide) |
| SwissTabs | `tabs.tsx` | Content-panel switching; **1px ink underline indicator** (distinct from Bento's filled box) |
| SwissAccordion | `accordion.tsx` | Hairline-divided rows; `multiple` prop for many open at once |
| SwissStepper | `stepper.tsx` | `orientation: "horizontal"` / `"vertical"` / `"responsive"`; numbered with hairline connector |
| SwissToast (+ Provider + useSwissToast) | `toast.tsx` | `action` + `duration` props; `Infinity` = persistent; paper + hairline |
| SwissCommandPalette | `command-palette.tsx` | ⌘K pattern with grouping; mono shortcut hints |
| SwissDock | `dock.tsx` | Hairline-bordered toolbar (no magnification effect — Swiss is static) |
| SwissBanner | `banner.tsx` | 4 tones: info/success/warning/error — rendered as ink + left accent rule, NOT color flood |
| SwissBreadcrumb | `breadcrumb.tsx` | Last item is always current page (no link); slash separator, mono |
| SwissPagination | `pagination.tsx` | With truncation (1 … 5 6 7 … 12); mono numerals |
| SwissEmptyState | `empty-state.tsx` | For "no results"; supports `action` slot |
| SwissNotificationInbox | `notification-inbox.tsx` | Popover + unread count + mark-all-read; hairline-divided rows |

### Large composites (5)

| Component | File | Notes |
|---|---|---|
| SwissSidebar | `sidebar.tsx` | Sections + footer slot; hairline-divided groups; pass `embedded` for use inside MobileNav |
| SwissStatCard | `stat-card.tsx` | KPI with **mono numerals + hairline divider** + optional sparkline & delta badge |
| SwissSettingsPanel | `settings-panel.tsx` | Composes Switch + Slider + Segmented in one card; hairline between rows |
| SwissMediaPlayer | `media-player.tsx` | Editorial media block; play/pause + progress, mono timecodes |
| SwissTable | `table.tsx` | Sortable header, row-select, click-row, empty state; hairline rules between rows, mono numeric cells |

---

## Composition patterns

Common SaaS layouts — copy these into new pages.

### Pattern 1 — Page shell (use on every page)

```tsx
"use client";
import { useEffect, useState } from "react";
import { SwissBackground } from "@/components/swiss-modernist-background";
import { SwissNavbar } from "@/components/swiss-modernist/navbar";
import { SwissCommandPalette } from "@/components/swiss-modernist/command-palette";
import { SwissToastProvider } from "@/components/swiss-modernist/toast";

export default function Page() {
  return (
    <SwissToastProvider>
      <Inner />
    </SwissToastProvider>
  );
}

function Inner() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative min-h-screen">
      <SwissBackground variant="paper" />

      <header><SwissNavbar /></header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* page content — use .swiss-grid for editorial 12-col layouts */}
      </main>

      <SwissCommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        commands={[/* page-specific */]}
      />
    </div>
  );
}
```

### Pattern 2 — Editorial 12-col layout (signature usage)

```tsx
<div className="swiss-grid">
  <div className="col-span-12 md:col-span-3">
    <span className="swiss-eyebrow">Section 01 / Intro</span>
  </div>
  <div className="col-span-12 md:col-span-9">
    <h1 className="swiss-display text-5xl">
      The reference library<br />for modern UI styles.
    </h1>
    <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-[rgb(var(--swiss-muted))]">
      Restraint as a feature. Hairlines as depth. Mono as metadata.
    </p>
  </div>
</div>
```

The **12-column grid is the chrome** — let the layout do the design
work. Eyebrows go in col-span-3, body in col-span-9 (or 7+5, 4+8, etc.).

### Pattern 3 — Form with validation

```tsx
<SwissCard className="max-w-md">
  <form onSubmit={handleSubmit} className="space-y-4">
    <SwissFormField label="Email" required error={errors.email}>
      {({ id, "aria-invalid": invalid }) => (
        <SwissInput
          id={id}
          aria-invalid={invalid}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      )}
    </SwissFormField>

    <SwissFormField label="Plan" description="Pick what fits.">
      <SwissRadioGroup value={plan} onChange={setPlan} options={[...]} />
    </SwissFormField>

    <SwissButton variant="primary" type="submit" loading={submitting}>
      {submitting ? "Saving…" : "Submit"}
    </SwissButton>
  </form>
</SwissCard>
```

### Pattern 4 — Table page (Customers-style)

```tsx
<SwissBreadcrumb items={[...]} />

<div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
  <h1 className="swiss-headline text-3xl">Customers</h1>
  <div className="flex flex-col gap-2 sm:flex-row">
    <SwissInput className="w-full sm:w-64" placeholder="Search…" />
    <SwissButton variant="primary">+ Add</SwissButton>
  </div>
</div>

{rows.length === 0 ? (
  <SwissEmptyState title="No matches" action={<SwissButton size="sm">Reset</SwissButton>} />
) : (
  <>
    <SwissTable
      columns={cols}
      data={pageData}
      rowKey={(r) => r.id}
      selectable
      selectedKeys={selected}
      onSelectionChange={setSelected}
      onRowClick={(r) => { setActive(r); setDrawerOpen(true); }}
    />
    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-between">
      <span className="swiss-mono text-xs text-[rgb(var(--swiss-muted))]">
        Page {page} of {totalPages}
      </span>
      <SwissPagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  </>
)}

<SwissDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
  {/* record details */}
</SwissDrawer>
```

### Pattern 5 — Settings (Tabs + sections)

Swiss tabs use a 1px ink underline indicator:

```tsx
<SwissBreadcrumb items={[...]} />
<h1 className="swiss-headline text-3xl">Settings</h1>

<div className="-mx-6 overflow-x-auto px-6 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
  <SwissTabs tabs={[...]} value={tab} onChange={setTab} />
</div>

<div className="mt-6 space-y-5">
  {tab === "profile" && <ProfileTab />}
  {tab === "billing" && (
    <>
      <SwissBanner tone="warning" title="Trial ending in 5 days" action={...} />
      <SwissCard>...</SwissCard>
    </>
  )}
</div>
```

### Pattern 6 — Dashboard (sidebar + main)

```tsx
<header><SwissNavbar /></header>

<div className="mx-auto flex max-w-[1400px] gap-6 p-6">
  <div className="hidden lg:block h-[calc(100vh-7rem)] flex-none">
    {desktopSidebar}
  </div>

  <main className="min-w-0 flex-1 space-y-6">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-2">
        <SwissMobileNav className="flex-none lg:hidden">
          {mobileSidebar /* with embedded prop + useSwissMobileNav().close() */}
        </SwissMobileNav>
        <h1 className="swiss-headline text-2xl">{title}</h1>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {/* search button, primary CTA, avatar dropdown */}
      </div>
    </div>

    {/* StatCards — sm:grid-cols-2 xl:grid-cols-4 */}
    {/* Main columns — lg:grid-cols-3 */}
  </main>
</div>
```

---

## Responsive guidelines

This project follows **Tailwind v4 mobile-first**. Default = mobile,
prefixes scale up.

### Breakpoints (used consistently)

| Prefix | Min width | Use for |
|---|---|---|
| (none) | 0 | phones, mobile-first base |
| `sm:` | 640px | large phones, small tablets |
| `md:` | 768px | tablets |
| `lg:` | 1024px | desktop (sidebar shows, hamburger hides) |
| `xl:` | 1280px | wide desktop (4-column grids) |

### Stacking conventions

| Pattern | Mobile (default) | Desktop |
|---|---|---|
| Top bar | `flex-col gap-3` | `sm:flex-row sm:items-center sm:justify-between` |
| Card grid | (1 col) | `sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` |
| Editorial 12-col | `col-span-12` (everything full-width) | `md:col-span-3 + md:col-span-9` (or similar) |
| Form input + button | `w-full` then stacked | `sm:flex-row sm:w-auto` |
| Sidebar | hidden, hamburger shows | `hidden lg:block` |
| Long Tabs/Segmented | `overflow-x-auto -mx-6 px-6` | natural |

### Required mobile patterns

- **Sidebar must be wrapped** in `<SwissMobileNav>` for `<lg`, with `embedded` sidebar inside
- **Long Tabs/Segmented** rows must be wrapped in `overflow-x-auto -mx-N px-N` (scrollbar hidden via `[&::-webkit-scrollbar]:hidden [scrollbar-width:none]`)
- **Buttons in topbar** should drop labels via `<span className="hidden sm:inline">…</span>` when icon alone is enough
- **Stepper** with 4+ steps: pass `orientation="responsive"` for vertical-on-mobile
- **12-col grid**: on mobile, force `col-span-12` so everything stacks. The grid only "reads" at md+.

### Touch considerations

| Component | Touch behavior |
|---|---|
| Tooltip | Doesn't fire on tap (mouse-only). Document this in your UI. |
| Popover | Click-trigger → works on touch ✓ |
| Dock | Static — no magnification (Swiss never animates on hover) |
| All form inputs | Native touch ✓ |
| Modal/Drawer | ESC + backdrop tap + X button ✓ |

---

## Background variants — pick by page type

| Variant | Visual | Use for |
|---|---|---|
| `paper` | Pure paper, no markings | Dashboards, customer tables, settings — content-dense |
| `grid` | Vertical column-gutter lines (12-col guides faintly visible) | Marketing landing, anatomy showcases — when grid IS the design |
| `baseline` | Horizontal hairline rules (typographic baseline grid) | Editorial reading, long-form |
| `blank` | Nothing — just `--swiss-paper` color | When you're nesting Swiss inside another layout |

Default to `paper` for product UIs, `grid` for the marketing/anatomy
demos.

---

## When NOT to use Swiss Modernist

- **Consumer / playful products** — Swiss reads as serious, restrained, almost severe. Wrong vibe for kids' apps, games, social.
- **Brand-heavy marketing where color sells** — Swiss caps you at 1 accent. Picking Swiss for a colorful CPG brand fights the style.
- **Touch-first mobile-only apps** — Swiss's hairlines + small mono labels assume desktop precision. Mobile works but you lose some signature density.
- **Backgrounds that aren't paper** — Swiss is designed against pure paper / pure near-black. Layered over a photo or gradient it loses its bones.

---

## Don'ts (common AI mistakes)

- Don't add `box-shadow` — hairlines provide ALL depth (the #1 violation)
- Don't use `border-radius > 0` (except avatars, status dots, spinners — the documented round exceptions)
- Don't use gradients ANYWHERE — paper + ink + single accent only
- Don't bold beyond `font-weight: 500` — that's the visual fingerprint
- Don't add `backdrop-blur` to cards — only the navbar gets a subtle blur for legibility over scrolled content
- Don't use emoji or colored multi-hue icons — monochrome line icons only
- Don't flood with accent color — it's an outline / single-CTA tool, not a background fill
- Don't pick `SwissTabs` for filter values — use `SwissSegmented` (and vice versa: don't put content panels behind Segmented)
- Don't render `<SwissSidebar>` inside `<SwissMobileNav>` without `embedded` prop (double-card)
- Don't forget `<SwissToastProvider>` if you call `useSwissToast()`
- Don't import from other style folders (`glassmorphism`, `bento-grid`, `ai-native`, etc.) — the visual reset breaks if you cross styles
- Don't replace mono nav links with sans — you've just downgraded to a generic navbar
- Don't add motion / hover scale to buttons or tiles — Swiss is **static**

---

## Hard requirements

- `<SwissBackground />` MUST be the first child of the page wrapper (provides paper color)
- `<ThemeProvider>` MUST wrap the app
- `<SwissToastProvider>` MUST wrap the page if you call `useSwissToast()`
- `.swiss-grid`, `.swiss-grid-bg`, `.swiss-headline`, `.swiss-display`, `.swiss-eyebrow`, `.swiss-mono`, `.swiss-rule`, `.swiss-link` MUST be in `globals.css` (already shipped)
- Use `cn()` helper from `@/lib/cn` for class composition

---

## Known limitations

- **Tooltip / Popover**: no portal, no collision detection. For production-grade SaaS, swap to Floating UI or Radix.
- **DatePicker**: single date only. Range picking, time, locale formatting are out of scope.
- **Table**: client-side data only. No virtualization — keep <500 rows.
- **Tooltip touch**: hover-only, doesn't fire on tap.
- **Single accent only**: by design, but means status banners use the same red for "destructive" and "error" — disambiguate with copy, not color.

---

## Demo pages (live references)

| Route | What it shows | Pattern from above |
|---|---|---|
| `/swiss-modernist` | Style overview + signature page treatment + 4 background variants | — |
| `/swiss-modernist/anatomy` | Layer-by-layer (paper → rules → grid → mono → ink → accent) + 12-col grid showcase | — |
| `/swiss-modernist/dashboard` | SaaS dashboard composition (sidebar + StatCards + Table) | Pattern 6 |
| `/swiss-modernist/customers` | Table + pagination + drawer flow | Pattern 4 |
| `/swiss-modernist/settings` | Tabs (underline) + form primitives + banners | Pattern 5 |
| `/swiss-modernist/marketing` | Style-pure marketing landing — 12-col editorial layout, eyebrows, mono metadata | Pattern 2 |

---

## How to switch from Glass / Bento / AI-Native to Swiss

| From → Swiss | Imports | Components | Background | Hooks |
|---|---|---|---|---|
| Glass → Swiss | `glassmorphism` → `swiss-modernist` | `Glass*` → `Swiss*` | `AuroraBackground` → `SwissBackground variant="paper"` | `useToast` → `useSwissToast` |
| Bento → Swiss | `bento-grid` → `swiss-modernist` | `Bento*` → `Swiss*` | `BentoGridBackground` → `SwissBackground` | `useBentoToast` → `useSwissToast` |
| AI-Native → Swiss | `ai-native` → `swiss-modernist` | `AI*` → `Swiss*` | `AINativeBackground` → `SwissBackground` | `useAIToast` → `useSwissToast` |

Page structure, prop signatures, decision rules, and responsive classes
are **identical** across all styles. Only the visual treatment changes.
Removed when porting INTO Swiss: drop shadows, blur effects,
border-radius values, font-weights above 500, gradients, multi-color
accent props.

---

## Scope contract

When porting Swiss Modernist scope to another style, or vice versa:

- **Same 44 component files** with same exports & prop signatures
- **Same 6 demo pages** at `/<style>`, `/<style>/anatomy`, `/<style>/dashboard`, `/<style>/customers`, `/<style>/settings`, `/<style>/marketing`
- **Same shell pattern**: Background + Navbar (theme toggle + ⌘K + responsive hamburger) + ToastProvider
- **Same responsive breakpoints**: mobile-first, sm/md/lg consistent

Only the **visual treatment** changes — anatomy, tokens, surface
effects. The component API, page structure, and responsive rules stay
identical so AI can swap styles with `s/swiss-modernist/<other-style>/g`
and `s/Swiss/<Other>/g`.
