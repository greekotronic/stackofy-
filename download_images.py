"""
Stackofy Image Downloader
Generiert und lädt alle Bilder automatisch herunter via Pollinations AI.
Speichert sie direkt in den images/ Ordner.

Verwendung:
1. Script in E:\Eigene Dateien\Stackofy-Clean\ ablegen
2. Doppelklick auf die Datei ODER Terminal: python download_images.py
"""

import urllib.request
import urllib.parse
import os
import time
import random

# Pfad zum images Ordner - relativ zum Script-Speicherort
IMAGES_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "images")

IMAGES = [

    # ── REISHI ────────────────────────────────────────────────────────────
    {
        "file": "hero-reishi-guide.jpg",
        "w": 1216, "h": 704,
        "prompt": "Reishi mushroom Ganoderma lucidum growing on dark mossy log in forest, wide cinematic 16:9 composition, moody atmospheric forest light, rich deep red and earthy tones, editorial nature photography"
    },
    {
        "file": "reishi-dried-powder.jpg",
        "w": 900, "h": 420,
        "prompt": "dried reishi mushroom slices and dark red powder in black ceramic bowl on dark wet slate, wide 16:9 composition, warm amber side lighting, minimal editorial botanical photography"
    },
    {
        "file": "reishi-immune-cells.jpg",
        "w": 900, "h": 420,
        "prompt": "abstract visualization of glowing immune cells and natural killer cells in bloodstream, wide cinematic 16:9 composition, gold and deep green bioluminescent quality, dark background, scientific editorial aesthetic"
    },

    # ── CORDYCEPS ─────────────────────────────────────────────────────────
    {
        "file": "hero-cordyceps-guide.jpg",
        "w": 1216, "h": 704,
        "prompt": "Cordyceps mushroom growing on dark forest floor with dramatic side lighting, wide cinematic 16:9 composition, deep orange and earthy tones, moody atmospheric editorial nature photography"
    },
    {
        "file": "cordyceps-powder-capsules.jpg",
        "w": 900, "h": 420,
        "prompt": "cordyceps mushroom powder and capsules arranged on dark stone surface, wide 16:9 composition, warm gold side lighting, minimal editorial supplement photography"
    },
    {
        "file": "cordyceps-mitochondria.jpg",
        "w": 900, "h": 420,
        "prompt": "abstract visualization of glowing mitochondria producing ATP energy, wide cinematic 16:9 composition, deep orange and gold bioluminescent quality, dark background, scientific editorial aesthetic"
    },

    # ── CHAGA ─────────────────────────────────────────────────────────────
    {
        "file": "hero-chaga-guide.jpg",
        "w": 1216, "h": 704,
        "prompt": "Chaga mushroom conk on birch tree bark in winter forest, wide cinematic 16:9 composition, dark moody tones, snow dusted bark, dramatic side lighting, editorial nature photography"
    },
    {
        "file": "chaga-chunks-tea.jpg",
        "w": 900, "h": 420,
        "prompt": "rough dark chaga mushroom chunks and dark amber tea in black ceramic cup on slate surface, wide 16:9 composition, warm side lighting, minimal editorial botanical photography"
    },
    {
        "file": "chaga-antioxidant.jpg",
        "w": 900, "h": 420,
        "prompt": "abstract visualization of antioxidant molecules neutralizing free radicals, wide cinematic 16:9 composition, deep amber and gold bioluminescent quality, dark background, scientific editorial aesthetic"
    },

    # ── TURKEY TAIL ───────────────────────────────────────────────────────
    {
        "file": "hero-turkeytail-guide.jpg",
        "w": 1216, "h": 704,
        "prompt": "Turkey tail mushroom Trametes versicolor fan-shaped bracket fungi on mossy log, wide cinematic 16:9 composition, rich multicolor brown gold teal tones, soft forest light, editorial nature photography"
    },
    {
        "file": "turkeytail-closeup.jpg",
        "w": 900, "h": 420,
        "prompt": "extreme macro close-up of turkey tail mushroom surface showing concentric color bands, wide 16:9 composition, warm forest light, editorial botanical photography, detailed texture"
    },
    {
        "file": "turkeytail-gut-microbiome.jpg",
        "w": 900, "h": 420,
        "prompt": "abstract visualization of healthy gut microbiome with glowing beneficial bacteria, wide cinematic 16:9 composition, teal and gold bioluminescent quality, dark background, scientific editorial aesthetic"
    },

    # ── MAITAKE ───────────────────────────────────────────────────────────
    {
        "file": "hero-maitake-guide.jpg",
        "w": 1216, "h": 704,
        "prompt": "Maitake hen of the woods mushroom cluster on forest floor, wide cinematic 16:9 composition, rich earthy brown and forest green tones, soft dramatic side lighting, editorial nature photography"
    },
    {
        "file": "maitake-fresh-closeup.jpg",
        "w": 900, "h": 420,
        "prompt": "fresh maitake mushroom fronds arranged on dark wet slate surface, wide 16:9 composition, soft gold side lighting, editorial food photography, minimal and moody"
    },
    {
        "file": "maitake-blood-sugar.jpg",
        "w": 900, "h": 420,
        "prompt": "abstract visualization of stable blood glucose curve as smooth glowing line graph, wide cinematic 16:9 composition, deep green and gold tones, dark background, scientific editorial aesthetic"
    },

    # ── MUSHROOM PROTOCOL ─────────────────────────────────────────────────
    {
        "file": "hero-mushroom-protocol.jpg",
        "w": 1216, "h": 704,
        "prompt": "six different medicinal mushrooms reishi chaga turkey tail lion's mane cordyceps maitake arranged dramatically on dark wet slate, wide cinematic 16:9 composition, gold side lighting, premium editorial food photography"
    },
    {
        "file": "mushroom-protocol-stack.jpg",
        "w": 900, "h": 420,
        "prompt": "overhead flat lay of six dark supplement capsule bottles labeled with mushroom names on dark slate surface, wide 16:9 composition, soft gold lighting, minimal editorial product photography"
    },

]


def download_image(img_data, images_dir, max_retries=3):
    filepath = os.path.join(images_dir, img_data["file"])

    if os.path.exists(filepath):
        print(f"  Exists, skipping: {img_data['file']}")
        return True

    prompt_encoded = urllib.parse.quote(img_data["prompt"])

    for attempt in range(1, max_retries + 1):
        seed = random.randint(1, 999999)
        url = (
            f"https://image.pollinations.ai/prompt/{prompt_encoded}"
            f"?width={img_data['w']}&height={img_data['h']}"
            f"&model=flux&seed={seed}&nologo=true"
        )
        try:
            if attempt > 1:
                print(f"  Retry {attempt}/{max_retries}: {img_data['file']}")
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                "Accept": "image/jpeg,image/*",
            }
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=90) as response:
                data = response.read()
                if len(data) < 5000:
                    print(f"  Response too small ({len(data)} bytes), retrying...")
                    time.sleep(3)
                    continue
                with open(filepath, "wb") as f:
                    f.write(data)
            print(f"  OK  {img_data['file']} ({len(data) // 1024} KB)")
            return True
        except Exception as e:
            print(f"  Attempt {attempt} failed: {e}")
            if attempt < max_retries:
                wait = attempt * 4
                print(f"     Waiting {wait}s before retry...")
                time.sleep(wait)

    print(f"  SKIPPED after {max_retries} attempts: {img_data['file']}")
    return False


def main():
    print("=" * 55)
    print("  Stackofy Image Downloader - Powered by Pollinations")
    print("=" * 55)
    print(f"\nImages folder: {IMAGES_DIR}\n")

    os.makedirs(IMAGES_DIR, exist_ok=True)

    total = len(IMAGES)
    success = 0

    for i, img in enumerate(IMAGES, 1):
        print(f"[{i}/{total}] {img['file']}")
        result = download_image(img, IMAGES_DIR)
        if result:
            if os.path.exists(os.path.join(IMAGES_DIR, img["file"])):
                success += 1
        if i < total:
            time.sleep(2)

    print("\n" + "=" * 55)
    print(f"  Done: {success}/{total} images in images/ folder")
    print("=" * 55)
    input("\nPress Enter to close...")


if __name__ == "__main__":
    main()
