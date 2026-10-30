# GeoExcel website redesign

A redesign of [geoexcel.group](https://www.geoexcel.group/), built for the GeoExcel 48-hour website redesign challenge (28 to 30 October 2026).

This is a separate project. It does not modify GeoExcel's live website or access any of its systems, and it is **not** GeoExcel's official site.

| | |
|---|---|
| Live site | https://geoexcel-redesign.vercel.app/ |
| Source code | https://github.com/SR9064/geoexcel-redesign |
| Problem and solution note | Submitted as a separate document |

## The problem this redesign addresses

GeoExcel has a broad catalogue (45 listings) and real export registrations, but its website makes a buyer scroll, guess and re-type. An importer who knows what they need, for example non-basmati parboiled rice in 25 kg PP bags, cannot get from landing to a complete quote request without scrolling long pages and re-entering everything in a generic contact form. Interest does not turn into qualified enquiries.

The redesign is built around one journey: **find a product, add it to an enquiry, send one complete request.** The full reasoning, the observations behind it and the questions for GeoExcel are in the problem and solution note.

## What was built

| Page | Route | What it does |
|---|---|---|
| Home | `/` | Hero, a "Find my product" quick-start (product type and pack size), category tiles with photos, how an enquiry works, the registrations GeoExcel lists, and a short group story |
| About | `/about` | Group timeline summarised from the current site, with a staggered entrance and a hover lift on each entry |
| Products | `/products` | Searchable, filterable catalogue (category, origin, pack size, plus rice type and process). Filters live in the URL, so a filtered view can be shared or bookmarked. Compact cards with full details on demand and **Add to enquiry** |
| Enquiry | `/enquiry` | The basket becomes a structured quote request: quantity per product, destination country, buyer type, optional packaging preference, and contact details |
| Certificates | `/certificates` | An image carousel of each original document, with a summary card beside it (issuer, number, scope, dates as listed, link to the official portal) |
| Sustainability | `/sustainability` | GeoExcel's own statements, shown plainly, with a note on what the site does not evidence |
| Contact | `/contact` | Address, phone, email and an OpenStreetMap embed |

`/credentials` redirects to `/certificates`.

### Catalogue contents (45 listings)

12 rice varieties, 14 whole spices, 9 IQF and frozen products, 9 oils and ghee, and 1 Fashion & Lifestyle entry. The live site shows only photographs for Fashion & Lifestyle, so it is one honest entry with a photo slider, and every unknown detail is marked "to be confirmed by GeoExcel".

### Fixes to problems seen on the current site

- Navigation collapses into a menu below 1024 px instead of getting cramped.
- Products sit in compact, bordered cards instead of white-on-white blocks with misaligned images and text.
- The certificate carousel swaps images instantly, with buttons and keyboard arrows.
- A single consistent layout, built mobile-first.
- Clean URLs instead of template names such as `/general-9` or `/copy-of-rice`.
- A working map with a link to a larger one.
- An enquiry form that captures product, quantity, destination and buyer type, which the current contact form and chat widget do not.

## Tech stack

- **Vite** and **React** (JavaScript, not TypeScript)
- **React Router** for pages and clean URLs
- **Tailwind CSS v4** (via the `@tailwindcss/vite` plugin)
- **Formspree** for form submission (no custom backend)
- **OpenStreetMap** embed for the map (no API key)
- Font: DM Sans (free, from Google Fonts)

### Decisions worth explaining

- **No animation library.** Motion is CSS only: hover transitions, a small entrance animation on the About page, and a zoom on product photos. `prefers-reduced-motion` is respected. The problem is about the enquiry flow, not animation.
- **One data layer.** All products live in `src/data/` and share one shape, so filters, cards, the basket and the enquiry form all read the same source.
- **The basket stores product ids only**, saved in `localStorage` so it survives a refresh. Product details are looked up from the data files.
- **No backend.** The form posts to Formspree. A production version would add a CRM or email workflow.
- **Mobile-first.** Layouts start as one column and widen at 640, 768 and 1024 px. Tap targets are at least 44 px high.
- **Honest data.** Where the source is missing, contradictory or looks wrong, the value is left blank rather than guessed.

## Getting started

Requirements: Node.js (a recent LTS release; run `node -v` to check) and npm.

```bash
git clone https://github.com/SR9064/geoexcel-redesign.git
cd geoexcel-redesign
npm install
npm run dev
```

Open the address printed in the terminal (usually `http://localhost:5173`).

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create the production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `node check-images.mjs` | Check that product photos and certificate images have the expected file names |

### The enquiry form

`src/config.js` holds the Formspree form address, and the live site posts enquiries to it. **If you run your own copy, replace it with your own form**, otherwise test enquiries go to the original owner's inbox:

1. Create a free form at [formspree.io](https://formspree.io) and copy its URL (it looks like `https://formspree.io/f/xxxxxxxx`).
2. Paste it into `src/config.js`:
   ```js
   export const FORM_ENDPOINT = 'https://formspree.io/f/xxxxxxxx'
   ```

If `FORM_ENDPOINT` is left empty, the form runs in **demo mode**: it validates and shows the success screen, but sends nothing, and the page says so.

### Optional switches

- `src/pages/Certificates.jsx`: set `SHOW_SUMMARY` to `false` to show only the document carousels, without the summary cards.
- `src/data/contact.js`: contact details and the map position.

## Deployment

Deployed on **Vercel** from the GitHub repository (framework preset: Vite, no environment variables). `vercel.json` rewrites every path to `index.html`, so routes such as `/products` still work after a page refresh. Every push to `main` redeploys.

To deploy your own copy: push the repository to GitHub, import it at vercel.com, and click Deploy.

## Project structure

```
src/
  components/   Navbar, Footer, ProductCard, FilterBar, CredentialCard, Carousel
  context/      EnquiryContext.jsx  (the enquiry basket)
  data/         rice, spices, iqf, oils, fashion, products (combined),
                credentials, contact
  pages/        Home, About, Products, Enquiry, Certificates, Sustainability, Contact
  config.js     Form endpoint
public/images/
  products/       product photos, named <product-id>.png (plus the home banner)
  certificates/   certificate pages, named <id>-<page>.png
  logo.png, sdg-goals.png
vercel.json     route rewrite for single-page-app refreshes
check-images.mjs  checks image file names
```

## Where the content comes from

All content comes from GeoExcel's own public website, reviewed on 28 to 30 October 2026. Nothing about the company, its products, its certifications or its sustainability work was invented.

- **Data is transcribed, not corrected.** Where the source contradicts itself or looks wrong, the value is left blank (shown as "To be confirmed by GeoExcel") or the conflict is recorded in the product's `notes`. Examples: two rice entries carry another variety's specification text, and the nutmeg description is the mace text.
- **Quantities, units and buyer types** in the enquiry form are assumptions for GeoExcel to adjust.
- **HS codes** are shown exactly as listed and are marked as to be confirmed.
- **Images** are GeoExcel's own images from its current website, used here only for this assignment. Where a product had no usable photo, a coloured category block is shown. Photos that show a third-party brand name were left out.
- **Certificates:** the carousel shows the original documents as published on GeoExcel's site. The summary cards leave out the IEC number, because an IEC is the company's PAN.
- **Sustainability** shows GeoExcel's statements as its own. The UN Sustainable Development Goals artwork is shown as on GeoExcel's site, with a note that this does not imply endorsement by the United Nations.

## Known limitations

- **Specifications are unverified.** Several need GeoExcel's confirmation; they are listed in the problem and solution note.
- **Certificate numbers and dates** were read from the documents on the current site and should be checked against the official portals. No credential is shown as "valid" or "verified", because current status cannot be confirmed from here. The FSSAI licence's first page lists validity to 20 February 2025 and refers to a validity annexure that was not reviewed. The Council for Leather Exports registration lists validity to 31 March 2024.
- **Fashion & Lifestyle** is a single catalogue entry, because the live site shows photographs only.
- **The map position is approximate.** It can be adjusted in `src/data/contact.js`.
- **No backend or CRM.** Enquiries go to the Formspree account's email, with no spam protection beyond a hidden honeypot field.
- **Product data is static.** A CMS would let GeoExcel edit products itself.
- **No automated tests.** Checking was manual.
- **Not in scope:** multilingual content, buyer accounts, pricing, verified live credential checks, and analytics.

## Accessibility

Semantic headings and landmarks, labelled form fields with error messages tied to their inputs, a keyboard-operable menu, filters, photo sliders and carousel, visible focus, 44 px tap targets, and reduced-motion support. This is a good-practice effort and has not been formally audited.

## Tools

Built with the help of an AI coding assistant (Claude). I can explain the code and the decisions in it.