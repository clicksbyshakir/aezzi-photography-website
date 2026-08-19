# Local images

Photographs currently load from the WordPress media library the previous site used.
To serve them from this repository instead:

1. Download the originals and drop them in this folder (keep the filenames).
2. In `assets/js/site-data.js`, replace each `https://…/wp-content/uploads/…` URL with
   the matching local path, e.g. `assets/img/ajnuts-1.jpg`.
3. Do the same for the two hard-coded portrait `<img src>` values in `index.html`
   and `about.html`, and for the `og:image` tags in the page `<head>`s.

Export at roughly 1600px on the long edge for gallery frames and 2000px for the hero
slideshow, then run them through an optimiser (Squoosh, ImageOptim, `cwebp`). Keeping
each file under ~300 KB keeps the galleries quick on Kenyan mobile data.
