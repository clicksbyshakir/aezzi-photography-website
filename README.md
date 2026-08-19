# Aezziphotography

The website for **Abdulhussain Ezzi** — a photographer based in Nairobi, Kenya, working in
wildlife, travel, weddings and interior/real-estate photography, and offering content
creation and social media management for companies.

Rebuilt from the previous WordPress (Kaze theme + Jetpack) version as a plain static site:
no build step, no framework, no database. Open the HTML files and they work.

---

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Front page — hero slideshow, the five specialisms, intro, featured services, three testimonials |
| `portfolio.html` | Galleries by category, filterable, with a keyboard/swipe lightbox |
| `services.html` | Every service, the content-creation retainer, and how booking works |
| `about.html` | Behind the Lens — the full biography |
| `testimonials.html` | All 20 client testimonials, filterable by type of work |
| `contact.html` | Contact details and the enquiry form |
| `404.html` | Not-found page |

## Layout

```
assets/
  css/styles.css     design tokens + every component
  js/site-data.js    ← all content that changes: photos, testimonials, services, contact
  js/main.js         nav, slideshow, galleries, lightbox, filters, form
  img/               local photographs (see assets/img/README.md)
robots.txt  sitemap.xml  .nojekyll
```

## Editing the site

Almost everything lives in **`assets/js/site-data.js`**. You do not need to touch the HTML
for day-to-day changes.

**Add photographs to a gallery** — find the set in `GALLERIES` and add an entry:

```js
{ src: "assets/img/lion-mara-01.jpg", w: 1600, h: 1067,
  alt: "A lioness at dusk in the Maasai Mara", caption: "Maasai Mara" }
```

`w` and `h` are the pixel dimensions; they let the browser reserve space so the page does
not jump while photos load. `alt` describes the photograph for screen readers and search
engines. `caption` appears under the photo in the lightbox.

A gallery with an empty `images: []` still gets a tile on the front page, marked as an
archive in progress and linking to the contact form — that is how **Wildlife**, **Weddings
& Events** and **Travel** currently show. Add photographs and they go live automatically,
including in the portfolio filters.

**Add a testimonial** — append to `TESTIMONIALS`. New `category` values become new filter
buttons on their own.

**Change a service** — edit `SERVICES`. `featured: true` puts it on the front page (four
work best); every entry appears on the services page regardless.

**Change contact details** — edit `SITE`. Email, phone, WhatsApp and Instagram are wired
into the header, footer, contact page and the floating WhatsApp button from that one object.

## Colours

The palette is a light, earthy savanna scheme — sand page, dry-clay surfaces, bark text and
a terracotta accent — defined as custom properties at the top of `assets/css/styles.css`:

| Token | Value | Used for |
| --- | --- | --- |
| `--bg` | `#f7f2e8` sand | page background |
| `--bg-elev` | `#efe8d9` dry clay | cards, footer, form fields |
| `--bg-elev-2` | `#e4dac6` deep clay | focused fields, hover states |
| `--text` | `#2b241b` bark | body copy and headings |
| `--muted` | `#5e5445` warm stone | secondary text |
| `--accent` | `#8f4a28` terracotta | buttons, labels, links, rules |
| `--accent-bright` | `#73391e` burnt umber | accent hover |

Changing those seven values re-skins the whole site. Every text/background pairing above
clears WCAG AA (4.5:1 for body text), so if you swap them, keep the accent dark enough to
stay legible on all three surfaces — not just on `--bg`.

Two things stay dark on purpose and are **not** controlled by those tokens: text sitting on
a photograph (the hero and the category tiles, which keep a warm scrim behind white text via
the `--on-photo-*` and `--scrim` tokens), and the lightbox, because photographs read best
against a dark surround.

## Photographs

Images currently load from the WordPress media library the old site used
(`aezziphotography.com` and `aezziphotographydotcom.wordpress.com`). That keeps the site
looking right today, but it means the photographs depend on the old host staying up.
**Moving them into `assets/img/` is the first thing worth doing** — see
`assets/img/README.md` for the steps and the sizes to export.

## The enquiry form

Out of the box the form has no server: on submit it opens the visitor's email app with
every field already written into the message. That always works on a static host, but it
loses anyone who has no mail client set up.

To have it submit properly, sign up for a form service (Formspree, Basin, Web3Forms, or
Netlify Forms if hosting there), then paste the endpoint into `site-data.js`:

```js
formEndpoint: "https://formspree.io/f/xxxxxxxx"
```

The form posts to it and shows a success or failure message in place. A honeypot field
already filters out the simplest spam bots.

## Running it locally

Any static server will do — the pages load `site-data.js` and `main.js`, so opening the
files straight from disk with `file://` works in most browsers but not all.

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying

The site is plain files, so anything that serves static content works:

- **GitHub Pages** — Settings → Pages → deploy from the branch root. `.nojekyll` is already
  there so the `assets/` folder is served untouched.
- **Netlify / Vercel / Cloudflare Pages** — connect the repository, leave the build command
  empty, set the publish directory to the repository root.
- **Any web host** — upload the files over FTP.

Point `aezziphotography.com` at whichever you choose. `sitemap.xml` and `robots.txt`
already reference that domain; update them if the domain changes.

## Notes for later

- The old site embedded an Instagram feed and a Mailchimp signup through Jetpack. Neither
  survives outside WordPress. The Instagram links across the site point at
  [@aezziwildlife](https://www.instagram.com/aezziwildlife/); if a live feed is wanted,
  an embed service such as LightWidget or Elfsight drops into `about.html`.
- 360° virtual tours are listed as a service but no tour is embedded yet. Kuula and
  Matterport both give an `<iframe>` that can go straight into `services.html`.
