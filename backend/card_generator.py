# Phase 3: Shareable PNG card generation
# Requires: pip install pillow

import io

def generate_card(report: dict) -> bytes:
    try:
        from PIL import Image, ImageDraw, ImageFont
    except ImportError:
        raise RuntimeError("Pillow not installed. Run: pip install pillow")

    W, H = 600, 340
    img = Image.new("RGB", (W, H), color="#0f0f11")
    draw = ImageDraw.Draw(img)

    archetype = report.get("archetype", {})
    name = archetype.get("name", "Unknown")
    desc = archetype.get("description", "")

    # Title
    draw.text((40, 30), "CodeBlood", fill="#a855f7")
    draw.text((40, 70), name, fill="#ffffff")
    draw.text((40, 110), desc, fill="#a1a1aa")

    # Stats
    stats = [
        ("Peak hour", f"{report.get('peak_hour', '?')}:00"),
        ("Vague commits", f"{report.get('vague_commit_pct', 0)}%"),
        ("Panic commits", str(report.get("panic_commits", 0))),
        ("Longest streak", f"{report.get('longest_streak_days', 0)} days"),
    ]
    for i, (label, value) in enumerate(stats):
        y = 170 + i * 38
        draw.text((40, y), label, fill="#71717a")
        draw.text((300, y), value, fill="#ffffff")

    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return buf.getvalue()
