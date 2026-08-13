# Scrolls — Product & Technical Spec (Draft v0.1)

A vertical, snap-scroll website for browsing cultural classics — The Kiss,
The Scream, and every other major artwork you'd want in a feed — built on
the TikTok interaction model instead of a gallery grid.

---

## 1. Core interaction model

One artwork fills the screen at a time; scrolling snaps to the next.
TikTok is video-native, so it gets motion for free — a static image feed
needs to earn that same "alive" feeling. Suggestion (yours to keep or cut):
a slow, subtle Ken Burns-style pan/zoom on the image while it's in view,
rather than a static frame. Cheap to do with CSS, and it's the single
biggest thing that would make this *feel* like a reel instead of a
slideshow.

**Card anatomy** (mirrors your description):

```
┌───────────────────────┐
│                    ┌──┐│
│                    │👤││ ← artist photo
│                    └┬─┘│
│                    (+) │ ← follow, overlapping the avatar's bottom edge
│                        │
│      [ A R T W O R K  │
│         F U L L       │
│         B L E E D ]   │  ♡ 12.4k  ← like
│                        │  🔖 2.1k  ← save
│                        │  💬 340   ← comment
│                        │  ↗        ← share
│                        │
│ Gustav Klimt           │
│ "The Kiss" (1908) —    │
│ oil and gold leaf on…  │
│ Read more →            │
└───────────────────────┘
```

- **Top-right rail**: artist photo (circular), follow `+` button
  overlapping its bottom edge — exactly the TikTok placement.
- **Right rail, below that**: like / save / comment / share, stacked,
  each with a count.
- **Bottom-left**: artist name, artwork title + year, a short (2–3 line)
  description, "Read more →" linking out to the fuller writeup.

**Desktop** doesn't need to reinvent this — TikTok's own web layout is the
model: the card stays phone-proportioned and centered, the action rail
sits fixed beside it rather than overlapping the image, and comments open
as a panel next to the card instead of a full-screen takeover. Worth
adding purely because desktop has the room for it: up/down arrow keys to
move between artworks.

## 2. Content sourcing & rights

This is the part that can quietly sink the project if skipped, so it gets
its own section: "major artworks" spans everything from Paleolithic cave
art to pieces from a living artist's estate, and only some of that is
actually free to redistribute.

- **Source from open-access museum APIs**, not scraped image search:
  the Met's Open Access API, the Rijksmuseum API, the Art Institute of
  Chicago's API, and Wikimedia Commons all expose public-domain artworks
  with structured metadata (title, artist, year, medium, current
  location) and licensing flags — pull from these rather than sourcing
  images individually by hand.
- **Filter on public-domain status explicitly** at ingestion time (the
  API's own open-access/CC0 flag, or artist death year + the relevant
  term — 70 years in most places, 95 in the US for older works) rather
  than assuming "famous" means "free to use." A number of 20th-century
  pieces people think of as classics are still under copyright.
- **Descriptions**: pull the opening extract from the museum record or
  Wikipedia rather than writing hundreds of originals by hand; "Read
  more →" links out to that same source page. Straightforward and keeps
  you from having to author curatorial text at scale.
- Treat ingestion as a **one-time/periodic pipeline** (a management
  command hitting these APIs and upserting into Postgres), not something
  fetched live per page view.

## 3. Data model

Django apps: `catalog` (artists/artworks/ingestion), `social`
(follow/like/save/comment), `accounts`.

- **Artist** — `name`, `photo_url`, `short_bio`, `birth_year`,
  `death_year`, `source_url`.
- **Artwork** — `artist` (FK), `title`, `year`, `medium`, `image_url`,
  `short_description`, `full_description_url`, `source_museum`,
  `license` (public domain / CC0 / etc., set at ingestion).
- **Viewer** — Django `User`, JWT auth (same pattern as ShelfChef).
- **Follow** — `viewer` (FK), `artist` (FK).
- **Like** / **Save** — `viewer` (FK), `artwork` (FK).
- **Comment** — `viewer` (FK), `artwork` (FK), `text`, `created_at`,
  `is_hidden` (basic moderation flag).

## 4. Backend (Django + DRF)

No realtime layer needed here — unlike the party quiz project, this is a
content feed, not a live multiplayer session, so plain DRF over WSGI/ASGI
is enough.

- `GET /api/feed/` — cursor-paginated artwork feed
- `GET /api/artworks/{id}/` — single artwork detail
- `POST /api/artworks/{id}/like/`, `/save/`, `/comments/`
- `POST /api/artists/{id}/follow/`
- Ingestion: a management command per source API, run periodically
  (cron or a simple Celery beat task later), idempotent upsert keyed on
  the source museum's own object ID so re-runs don't duplicate records.

## 5. Frontend (React + Vite)

- CSS `scroll-snap` for the vertical feed rather than a JS-driven
  carousel — simpler, and native momentum scroll on mobile for free.
- Windowing/virtualization on the feed: only the current card plus one
  ahead/behind need to be mounted with full-res images; everything
  further away should be unmounted or swapped for a placeholder, or a
  content-heavy image feed will eat memory fast on longer sessions.
- Preload the next 1–2 images ahead of scroll position; lazy-load
  everything else.
- Deploy: Cloudflare Pages, same as your other projects.

## 6. Deployment note

One new consideration versus your past projects: artwork images are
larger and more numerous than typical app assets, so serving them
straight off the VPS will get slow at scale. Worth putting them behind
object storage + CDN (Cloudflare R2 is the obvious pick given you're
already on Cloudflare) rather than serving from Django/Postgres directly.

## 7. Optional idea: background classical music

Flagging this since you said it's still undecided — the two real
obstacles if you come back to it:

- **Rights**: the *compositions* (Bach, Beethoven, etc.) are public
  domain, but a given *recording* of one usually isn't — the performing
  musicians/orchestra/label hold their own copyright on that specific
  recording. You'd need public-domain-recording sources specifically
  (MusOpen and IMSLP both exist for this reason), not just any classical
  track you find.
- **Browser autoplay**: browsers block autoplay-with-sound until the user
  has interacted with the page. Realistic pattern: start muted, and once
  the user taps/clicks anywhere (or an explicit unmute control), audio
  plays for the rest of the session — same workaround TikTok itself uses.
- Matching a piece to each artwork is a curation task on top of the
  technical piece, not something that resolves itself — worth treating as
  its own project phase rather than a checkbox on this one.

## 8. Assumptions flagged for confirmation

- Same stack as your other projects — React + Vite on Cloudflare Pages,
  Django + DRF + PostgreSQL on your VPS — carried over since you didn't
  restate it this time; flag if this one's different.
- Guest browsing allowed with no account; account required only to like,
  save, follow, or comment.
- "Read more" = links out to the external source (museum/Wikipedia page),
  not an in-app full article — say so if you'd rather build a full detail
  page in-app instead.

## 9. Suggested build phases

1. **Core feed** — ingest a first batch of public-domain artworks,
   vertical snap-scroll, artist rail with photo, no auth yet (browse-only).
2. **Social layer** — accounts, like/save/follow/comment.
3. **Polish** — the Ken Burns motion treatment, the "read more" flow,
   basic comment moderation.
4. **Optional** — background music experiment.
