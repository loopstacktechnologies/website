#!/usr/bin/env python3
"""Update all LoopStack HTML files to use the real logo image."""

import re, os

PROJECT = "/home/rahulraval/Documents/Folder/Code_city/stack"
FILES   = ["index.html","about.html","services.html","portfolio.html","team.html","contact.html"]

# ── helpers ──────────────────────────────────────────────────────────────────
def load(f): return open(os.path.join(PROJECT, f), encoding="utf-8").read()
def save(f, txt): open(os.path.join(PROJECT, f), "w", encoding="utf-8").write(txt)

# ── 1. PRELOADER: replace logo-wrap content ──────────────────────────────────
OLD_PRELOADER = '<div class="preloader-logo-wrap"><span class="preloader-logo-text">LS</span></div>'
NEW_PRELOADER = '''<div class="preloader-logo-wrap">
      <img src="images/logo.jpg" alt="LoopStack Technologies" class="preloader-logo-img" />
    </div>'''

# ── 2. HEADER LOGO (main nav) ─────────────────────────────────────────────────
# Pattern: <a href="XXX.html" class="logo"> ... </a>  (first occurrence per file = header logo)
# We replace the INNER content of that <a> with just the <img>
LOGO_INNER_PATTERN = re.compile(
    r'(<a href="[^"]*" class="logo">)'   # group 1: opening tag
    r'.*?'                                 # inner content (lazy)
    r'(</a>)',                             # group 2: closing tag
    re.DOTALL
)

NEW_LOGO_INNER = r'\1\n        <img src="images/logo.jpg" alt="LoopStack Technologies" class="header-logo-img" />\n      \2'

# ── 3. FOOTER LOGO (footer-brand section) ────────────────────────────────────
# Pattern: <div class="footer-logo"> ... </div>
FOOTER_LOGO_PATTERN = re.compile(
    r'<div class="footer-logo">.*?</div>\s*<div class="footer-logo-txt">.*?</div>',
    re.DOTALL
)
NEW_FOOTER_LOGO = '<div class="footer-logo"><img src="images/logo.jpg" alt="LoopStack Technologies" class="footer-logo-img" /></div>'

# ── Process each file ─────────────────────────────────────────────────────────
for fname in FILES:
    txt = load(fname)
    original = txt

    # 1. Preloader logo
    txt = txt.replace(OLD_PRELOADER, NEW_PRELOADER)

    # 2. Header/nav logos – replace ALL logo inner content (header + mobile menu + any occurrence)
    txt = LOGO_INNER_PATTERN.sub(NEW_LOGO_INNER, txt)

    # 3. Footer logo block
    txt = FOOTER_LOGO_PATTERN.sub(NEW_FOOTER_LOGO, txt)

    if txt != original:
        save(fname, txt)
        print(f"✅ Updated: {fname}")
    else:
        print(f"⚠️  No change: {fname}")

print("\nAll done.")
