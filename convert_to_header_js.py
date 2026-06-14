"""
Stackofy - Convert all HTML files to use shared header.js
Run this in the Stackofy-Clean folder:
  python convert_to_header_js.py
"""

import os
import re

# Files to process - relative to Stackofy-Clean folder
FILES = {
    # Root files
    'index.html': 'root',
    'about.html': 'root',
    'articles.html': 'root',
    'your-stack.html': 'root',
    # Article files
    'articles/nmn-supplements-guide.html': 'article',
    'articles/omega-3-complete-guide.html': 'article',
    'articles/vitamin-d3-k2-guide.html': 'article',
    'articles/magnesium-guide.html': 'article',
    'articles/zinc-guide.html': 'article',
    'articles/selenium-guide.html': 'article',
    'articles/coq10-guide.html': 'article',
    'articles/vitamin-c-guide.html': 'article',
    'articles/pqq-guide.html': 'article',
}

# CSS to add for hero-img and article-img if missing
MISSING_CSS = """
    .hero-img img { width: 100%; height: 100%; object-fit: cover; opacity: 0.7; }
    .article-img { width: 100%; border-radius: 12px; margin: 1.5rem 0; overflow: hidden; }
    .article-img img { width: 100%; height: auto; max-height: 420px; object-fit: cover; display: block; }"""

def process_file(filepath):
    if not os.path.exists(filepath):
        print(f"  SKIP (not found): {filepath}")
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    changes = []

    # 1. Add header.js script tag in <head> if not already there
    if 'header.js' not in content:
        content = content.replace(
            '</head>',
            '  <script src="/header.js"></script>\n</head>'
        )
        changes.append('added header.js')

    # 2. Remove old header element (everything from <header to </header>)
    header_pattern = re.compile(r'\s*<header[\s\S]*?</header>', re.MULTILINE)
    if header_pattern.search(content):
        content = header_pattern.sub('', content)
        changes.append('removed old header')

    # 3. Remove old mobile-menu div
    mobile_pattern = re.compile(r'\s*<div[^>]*id=["\']mobile-menu["\'][\s\S]*?</div>', re.MULTILINE)
    if mobile_pattern.search(content):
        content = mobile_pattern.sub('', content)
        changes.append('removed old mobile menu')

    # 4. Remove old footer element
    footer_pattern = re.compile(r'\s*<footer[\s\S]*?</footer>', re.MULTILINE)
    if footer_pattern.search(content):
        content = footer_pattern.sub('', content)
        changes.append('removed old footer')

    # 5. Remove old toggleDark, toggleMenu functions from scripts
    # (header.js handles these now as stackofyToggleDark / stackofyToggleMenu)
    content = re.sub(r'\s*function toggleDark\(\)[\s\S]*?}\s*\n', '\n', content)
    content = re.sub(r'\s*function toggleDark\(\) \{[\s\S]*?\n    \}\n', '\n', content)
    content = re.sub(r'\s*function toggleMenu\(\) \{[^\}]*\}\s*\n', '\n', content)
    content = re.sub(r"\s*if \(localStorage\.getItem\('theme'\)[^\n]*\n[^\n]*\n[^\n]*\}\s*\n", '\n', content)
    changes.append('cleaned up old JS functions')

    # 6. Add missing CSS for hero-img img and article-img if not present
    if 'hero-img img' not in content and '.article-hero' in content:
        content = content.replace('  </style>', MISSING_CSS + '\n  </style>')
        changes.append('added missing hero/article img CSS')

    # 7. Remove old back button if present (for your-stack)
    content = re.sub(r'<a href="/"[^>]*>← Back to Stackofy</a>\s*\n?', '', content)

    # 8. Remove old logo CSS classes that are no longer needed
    # (Keep them in case they're referenced, just clean up unused logo-icon divs in HTML)
    logo_icon_pattern = re.compile(
        r'<div class="logo-icon">\s*<div class="capsule"></div>.*?</div>\s*',
        re.DOTALL
    )
    if logo_icon_pattern.search(content):
        content = logo_icon_pattern.sub('', content)
        changes.append('removed old logo-icon div')

    # 9. Remove inline SVG logos that were added manually
    svg_logo_pattern = re.compile(
        r'<svg width="32" height="32"[\s\S]*?</svg>\s*\n?\s*Stackofy',
        re.MULTILINE
    )
    if svg_logo_pattern.search(content):
        content = svg_logo_pattern.sub('Stackofy', content)
        changes.append('removed inline SVG logo')

    # 10. Clean up empty <a class="logo"> tags that remain
    content = re.sub(
        r'<a class="logo"[^>]*>\s*\n?\s*Stackofy\s*\n?\s*</a>',
        '',
        content
    )

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  UPDATED: {filepath} - {', '.join(changes)}")
    else:
        print(f"  NO CHANGES: {filepath}")


def main():
    print("Stackofy - Converting to shared header.js")
    print("=" * 50)

    for filepath, ftype in FILES.items():
        print(f"\nProcessing: {filepath}")
        process_file(filepath)

    print("\n" + "=" * 50)
    print("Done! Now run:")
    print("  git add .")
    print("  git commit -m 'convert all pages to shared header.js'")
    print("  git push")


if __name__ == '__main__':
    main()
