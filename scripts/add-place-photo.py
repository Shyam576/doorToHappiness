#!/usr/bin/env python3
"""Add your own photograph for a place (or a whole dzongkhag) in one command.

  python3 scripts/add-place-photo.py PHOTO.jpg dagana "Daga Dzong" --author "Your Name"
  python3 scripts/add-place-photo.py PHOTO.jpg dagana --district --author "Your Name"      # dzongkhag hero image

What it does
  1. Saves the photo as one high-quality WebP (max 1920 px wide) under public/images/places/<dzongkhag>/
  2. Points that place's `image` in src/data/popularDestination.json at that file
     (or, with --district, adds it as the first dzongkhag photo)
  3. Records a credit in src/data/imageCredits.json so it appears on /photo-credits

Only use photographs you took or have written permission to use. Requires Pillow (pip install pillow).
Use --dry-run to see what would change without writing anything.
"""
import argparse, datetime, json, os, re, sys

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("This script needs Pillow:  pip install pillow")

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DATA = os.path.join(ROOT, "src", "data", "popularDestination.json")
CREDITS = os.path.join(ROOT, "src", "data", "imageCredits.json")


def slugify(text):
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")[:56]


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("photo")
    ap.add_argument("dzongkhag", help="dzongkhag slug, e.g. dagana, pemagatshel, zhemgang")
    ap.add_argument("place", nargs="?", help='place name exactly as in the data, e.g. "Daga Dzong"')
    ap.add_argument("--district", action="store_true", help="use as the dzongkhag's lead photo instead of a place photo")
    ap.add_argument("--author", required=True, help="photographer's name (shown on /photo-credits)")
    ap.add_argument("--license", default="Used with permission of the photographer", help="licence or permission statement")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()
    if not a.district and not a.place:
        ap.error("give a place name, or use --district")

    data = json.load(open(DATA, encoding="utf-8"))
    dz = next((d for d in data if d["slug"] == a.dzongkhag), None)
    if not dz:
        sys.exit(f"Unknown dzongkhag '{a.dzongkhag}'. Options: " + ", ".join(d["slug"] for d in data))
    place = None
    if not a.district:
        place = next((p for p in dz["placesToVisit"] if p["name"].lower() == a.place.lower()), None)
        if not place:
            sys.exit(f"'{a.place}' not found in {a.dzongkhag}. Places: " + "; ".join(p["name"] for p in dz["placesToVisit"]))

    base = slugify(a.place if place else f"{a.dzongkhag}-district-{datetime.date.today().isoformat()}")
    out_dir = os.path.join(ROOT, "public", "images", "places", a.dzongkhag)
    im = ImageOps.exif_transpose(Image.open(a.photo)).convert("RGB")
    ww = min(1920, im.width)
    r = im.resize((ww, round(im.height * ww / im.width)), Image.LANCZOS) if ww != im.width else im
    path = os.path.join(out_dir, f"{base}.webp")
    written = [path]
    if not a.dry_run:
        os.makedirs(out_dir, exist_ok=True)
        r.save(path, "WEBP", quality=80, method=6)
    web = f"/images/places/{a.dzongkhag}/{base}.webp"

    if place:
        place["image"] = web
    else:
        dz["media"]["images"] = [web] + [u for u in dz["media"].get("images", []) if u != web]

    credits = json.load(open(CREDITS, encoding="utf-8"))
    credits["credits"].append({
        "file": web, "title": (a.place or f"{dz['name']} district") + " (own photograph)", "source": "Door to Happiness Holiday",
        "source_url": "", "author": a.author, "license": a.license, "license_url": "",
        "used_for": [f"{a.dzongkhag}:{a.place or 'district'}"], "original_size": f"{im.width}x{im.height}",
        "retrieved": datetime.date.today().isoformat(),
    })

    print(("DRY RUN - would write" if a.dry_run else "Wrote"), *[os.path.relpath(p, ROOT) for p in written], sep="\n  ")
    print(f"Set {a.dzongkhag}/{a.place or 'district image'} -> {web}")
    if not a.dry_run:
        # popularDestination.json is tab-indented; this round-trips byte for byte, so the diff is just the image change
        open(DATA, "w", encoding="utf-8").write(json.dumps(data, indent="\t", ensure_ascii=False) + "\n")
        credits["credits"].sort(key=lambda c: c["file"])
        json.dump(credits, open(CREDITS, "w", encoding="utf-8"), indent=1)


if __name__ == "__main__":
    main()
