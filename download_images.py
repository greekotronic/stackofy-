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

# Alle Bilder die generiert werden sollen
IMAGES = [

    # ── FOUNDATION STACK ──────────────────────────────────────────────────
    {
        "file": "hero-foundation-stack.jpg",
        "w": 1216, "h": 704,,
        "prompt": "overhead flat lay vitamin D3 K2 capsules magnesium tablets omega-3 fish oil bottles on dark wet slate, soft gold side lighting, editorial supplement photography, deep forest green tones, cinematic"
    },
    {
        "file": "foundation-stack-nutrients.jpg",
        "w": 900, "h": 420,
        "prompt": "macro close-up vitamin D3 capsules with soft sunlight casting golden shadows on dark stone surface, minimal editorial supplement photography, warm gold and green tones"
    },
    {
        "file": "foundation-stack-sun.jpg",
        "w": 900, "h": 420,
        "prompt": "sunlight streaming through forest leaves creating vitamin D concept, nature longevity health, deep forest green tones, editorial lifestyle photography, soft golden light"
    },

    # ── ANTI-AGING STACK ──────────────────────────────────────────────────
    {
        "file": "hero-antiaging-stack.jpg",
        "w": 1216, "h": 704,,
        "prompt": "elegant dark glass bottles NMN resveratrol CoQ10 supplements arranged on dark stone surface, longevity anti-aging concept, dramatic gold side lighting, premium editorial product photography, deep green tones"
    },
    {
        "file": "antiaging-stack-cells.jpg",
        "w": 900, "h": 420,
        "prompt": "abstract macro visualization glowing mitochondria and DNA strands, gold and green bioluminescent quality, dark background, longevity cellular aging concept, scientific editorial aesthetic"
    },
    {
        "file": "antiaging-stack-foods.jpg",
        "w": 900, "h": 420,
        "prompt": "overhead flat lay resveratrol rich foods red grapes dark berries nuts on dark slate, anti-aging superfoods concept, editorial food photography, deep green gold tones"
    },

    # ── SLEEP STACK ───────────────────────────────────────────────────────
    {
        "file": "hero-sleep-stack.jpg",
        "w": 1216, "h": 704,,
        "prompt": "moody close-up magnesium glycinate capsules and chamomile flowers on dark slate, soft moonlight blue and green tones, calm atmospheric editorial photography, sleep supplement concept"
    },
    {
        "file": "sleep-stack-calm.jpg",
        "w": 900, "h": 420,
        "prompt": "dark ceramic cup warm herbal tea with soft evening candlelight on dark wood surface, calm nighttime ritual, editorial lifestyle photography, blue green tones"
    },
    {
        "file": "sleep-stack-night.jpg",
        "w": 900, "h": 420,
        "prompt": "abstract visualization calm brain waves and sleep cycle concept, dark background, soft blue green bioluminescent glow, scientific editorial aesthetic, peaceful"
    },

    # ── BRAIN STACK ───────────────────────────────────────────────────────
    {
        "file": "hero-brain-stack.jpg",
        "w": 1216, "h": 704,,
        "prompt": "abstract macro glowing neural connections and brain synapses, deep forest green and gold bioluminescent quality, dark background, cognitive performance concept, scientific editorial aesthetic"
    },
    {
        "file": "brain-stack-focus.jpg",
        "w": 900, "h": 420,
        "prompt": "overhead flat lay lion's mane mushroom omega-3 capsules and walnuts on dark slate, brain health foods, soft gold side lighting, editorial food photography, minimal"
    },
    {
        "file": "brain-stack-neurons.jpg",
        "w": 900, "h": 420,
        "prompt": "dramatic macro close-up lion's mane mushroom on dark wet slate, white neural-like tendrils, editorial food photography, deep forest green and gold tones, scientific beauty"
    },

    # ── BIOHACKER COFFEE ──────────────────────────────────────────────────
    {
        "file": "hero-biohacker-coffee.jpg",
        "w": 1216, "h": 704,,
        "prompt": "dramatic overhead shot dark ceramic mug steaming coffee on black slate, coconut oil cinnamon sticks raw cacao powder cardamom pods arranged around it, soft morning gold light, editorial food photography, moody premium"
    },
    {
        "file": "coffee-ingredients-flatlay.jpg",
        "w": 900, "h": 420,
        "prompt": "flat lay biohacker coffee ingredients coconut oil glass jar dark cacao powder cinnamon sticks cardamom pods collagen powder on dark stone surface, warm amber side lighting, minimal editorial style"
    },
    {
        "file": "coffee-thermos-morning.jpg",
        "w": 900, "h": 420,
        "prompt": "sleek dark thermos flask next to specialty coffee bag on wooden desk with morning light streaming in, minimalist lifestyle photography, warm tones, premium editorial"
    },

    # ── PERSONAL STACK ────────────────────────────────────────────────────
    {
        "file": "hero-personal-stack.jpg",
        "w": 1216, "h": 704,,
        "prompt": "overhead flat lay weekly pill organizer filled with supplements next to notebook with handwritten notes, coffee thermos and reading glasses on dark slate, warm morning light, editorial lifestyle photography"
    },
    {
        "file": "personal-stack-morning.jpg",
        "w": 900, "h": 420,
        "prompt": "five small groups of supplements arranged in a row on dark stone surface each group with small handwritten label card, soft gold morning side lighting, organized intentional lifestyle photography"
    },
    {
        "file": "personal-stack-ai-research.jpg",
        "w": 900, "h": 420,
        "prompt": "dark laptop screen with scientific papers supplement research, handwritten notes beside it, coffee cup, warm evening light, minimal editorial aesthetic, research concept"
    },

    # ── REDUNDANT STACKS ──────────────────────────────────────────────────
    {
        "file": "hero-redundant-stacks.jpg",
        "w": 1216, "h": 704,,
        "prompt": "overhead flat lay many supplement capsules and pills in various colors scattered on dark slate, editorial style, dark moody lighting, gold and green accents, some crossed out"
    },
    {
        "file": "stack-audit-table.jpg",
        "w": 900, "h": 420,
        "prompt": "two identical supplement bottles side by side on dark surface, one with checkmark and one with X, clean editorial product photography, dark background, minimal"
    },
    {
        "file": "smart-stack-simple.jpg",
        "w": 900, "h": 420,
        "prompt": "three elegant minimalist supplement bottles arranged in a triangle on dark stone surface, soft gold side lighting, less is more concept, premium editorial aesthetic"
    },
]


def download_image(img_data, images_dir, max_retries=3):
    filepath = os.path.join(images_dir, img_data["file"])

    # Überspringe wenn Datei bereits existiert
    if os.path.exists(filepath):
        print(f"  ⏭  Exists, skipping: {img_data['file']}")
        return True

    prompt_encoded = urllib.parse.quote(img_data["prompt"])

    for attempt in range(1, max_retries + 1):
        seed = random.randint(1, 999999)
        url = (
            f"https://image.pollinations.ai/prompt/{prompt_encoded}"
            f"?width={img_data['w']}&height={img_data['h']}"
            f"&model=flux&seed={seed}&nologo=true&aspect_ratio=16:9"
        )
        try:
            if attempt > 1:
                print(f"  ↻  Retry {attempt}/{max_retries}: {img_data['file']}")
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                "Accept": "image/jpeg,image/*",
            }
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=90) as response:
                data = response.read()
                if len(data) < 5000:
                    print(f"  ✗  Response too small ({len(data)} bytes), retrying...")
                    time.sleep(3)
                    continue
                with open(filepath, "wb") as f:
                    f.write(data)
            print(f"  ✓  {img_data['file']} ({len(data) // 1024} KB)")
            return True
        except Exception as e:
            print(f"  ✗  Attempt {attempt} failed: {e}")
            if attempt < max_retries:
                wait = attempt * 4
                print(f"     Waiting {wait}s before retry...")
                time.sleep(wait)

    print(f"  ✗  SKIPPED after {max_retries} attempts: {img_data['file']}")
    return False


def main():
    print("=" * 55)
    print("  Stackofy Image Downloader - Powered by Pollinations")
    print("=" * 55)
    print(f"\nImages folder: {IMAGES_DIR}\n")

    # Erstelle images/ Ordner falls nicht vorhanden
    os.makedirs(IMAGES_DIR, exist_ok=True)

    total = len(IMAGES)
    success = 0
    skipped = 0

    for i, img in enumerate(IMAGES, 1):
        print(f"[{i}/{total}] {img['file']}")
        result = download_image(img, IMAGES_DIR)
        if result:
            if os.path.exists(os.path.join(IMAGES_DIR, img["file"])):
                success += 1
        # Kurze Pause zwischen Requests
        if i < total:
            time.sleep(2)
            # ── ASHWAGANDHA ───────────────────────────────────────────────────────
    {
        "file": "hero-ashwagandha.jpg",
        "w": 1216, "h": 704,
        "prompt": "dramatic macro close-up of ashwagandha root and powder in dark ceramic bowl on dark slate, warm amber side lighting, editorial food photography, deep forest green and gold tones, moody and scientific"
    },
    {
        "file": "ashwagandha-root-plant.jpg",
        "w": 900, "h": 420,
        "prompt": "overhead flat lay of dried ashwagandha roots orange berries and green leaves on dark wet stone surface, botanical editorial photography, warm gold side lighting, minimal"
    },
    {
        "file": "ashwagandha-stress-calm.jpg",
        "w": 900, "h": 420,
        "prompt": "abstract visualization of calm cortisol wave pattern descending, dark background, soft blue and green tones, scientific editorial aesthetic, stress reduction concept"
    },

    print("\n" + "=" * 55)
    print(f"  Done: {success}/{total} images in images/ folder")
    print("=" * 55)
    input("\nPress Enter to close...")


if __name__ == "__main__":
    main()
