# OVTAS — project page

Project website for **"Exploring Vision-Language Models for Open-Vocabulary Zero-Shot Action
Segmentation"** (Unmesh, Ramesh, Patel, Jain, Ramani).

Target URL: <https://aunmesh.github.io/ovtas/> — the address already referenced in the paper.

## Deploying to GitHub Pages

1. Create a public repo named **`ovtas`** under the `aunmesh` account.
2. Copy the contents of this folder (`index.html`, `static/`, this README) into the repo root and
   push to `main`.
3. In the repo: **Settings → Pages → Build and deployment**, set *Source* to
   **Deploy from a branch**, branch `main`, folder `/ (root)`, then Save.
4. The site goes live at `https://aunmesh.github.io/ovtas/` within a minute or two.

```bash
git init
git add .
git commit -m "Add OVTAS project page"
git branch -M main
git remote add origin https://github.com/aunmesh/ovtas.git
git push -u origin main
```

To preview locally before pushing:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Layout

```
index.html                     Single-page site — all content lives here
static/css/style.css           Theme
static/js/main.js              Tab switching, copy-to-clipboard, table scroll hints
static/mathjax/                MathJax 3 (vendored, so equations render with no CDN call)
static/images/
  pipeline.png                 Rendered from figures/TPGAS_pipeline.pdf at 220 dpi
  prior_approach.png           figures/their_approach.png
  our_approach.png             figures/our_approach.png
  vlm_family.png               figures/vlm_family.png
  vlm_sizes.png                figures/vlm_sizes.png
  qualitative/                 4 segmentation examples per dataset
```

## Things you'll want to edit

**When the code and features are released.** Search `index.html` for `btn-soon`. Replace each of
the two placeholder `<span class="btn btn-soon">…</span>` blocks with a real link, e.g.

```html
<a class="btn" href="https://github.com/aunmesh/ovtas" target="_blank" rel="noopener">
  <span class="ico">&#60;/&#62;</span> Code
</a>
```

Then update the "Code &amp; Feature Release" section (`id="release"`) — swap the *coming soon*
notice for the download links, and drop the `[Release in preparation — see below.]` note at the end
of the abstract.

**arXiv links.** `2602.21406` appears in three places: the arXiv button, the PDF button and the
BibTeX block. Search for `2602.21406` to change all three at once.

**BibTeX entry type.** The entry is currently `@article` with an arXiv `journal` field. If the
paper is accepted at a venue, switch it to `@inproceedings` with `booktitle`.

**Venue line.** The line above the title reads "arXiv Preprint · 2026" — search for `class="venue"`.

**Adding qualitative examples.** Drop more PNGs into `static/images/qualitative/` following the
`<dataset>_example_NNN.png` naming, then add a `<figure>` row inside the matching
`data-panel="q-gtea" | "q-sal" | "q-bf"` block.

## Notes

- Every number on the page was transcribed from the LaTeX source and checked back against it
  cell by cell, including all ablation drop figures.
- MathJax is vendored under `static/mathjax/` (~1.7 MB) rather than loaded from a CDN, so the page
  renders offline and doesn't break if a CDN is blocked. The only external request is the Inter
  webfont from Google Fonts, which degrades to system fonts if unavailable.
- Total site size is about 4 MB.
- No build step, no dependencies — it's static HTML.
