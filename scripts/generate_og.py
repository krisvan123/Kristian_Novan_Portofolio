import os
from PIL import Image, ImageDraw, ImageFont

def generate_og():
    width = 1200
    height = 630
    
    # Create background
    img = Image.new("RGBA", (width, height), (15, 17, 23, 255))
    draw = ImageDraw.Draw(img)
    
    # Ambient gradient circles
    glow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse([(-100, -100), (500, 500)], fill=(45, 90, 67, 40))
    glow_draw.ellipse([(800, 300), (1300, 800)], fill=(30, 58, 138, 45))
    img = Image.alpha_composite(img, glow)
    draw = ImageDraw.Draw(img)

    # Decorative border
    draw.rectangle([(16, 16), (width - 16, height - 16)], outline=(40, 44, 58, 255), width=2)
    
    # Try loading clean system fonts
    font_large = None
    font_med = None
    font_small = None
    font_bold = None

    for font_path in [
        "C:\\Windows\\Fonts\\segoeui.ttf",
        "C:\\Windows\\Fonts\\arial.ttf",
        "C:\\Windows\\Fonts\\calibri.ttf"
    ]:
        if os.path.exists(font_path):
            try:
                font_large = ImageFont.truetype(font_path.replace(".ttf", "b.ttf") if os.path.exists(font_path.replace(".ttf", "b.ttf")) else font_path, 58)
                font_med = ImageFont.truetype(font_path, 28)
                font_small = ImageFont.truetype(font_path, 20)
                font_bold = ImageFont.truetype(font_path.replace(".ttf", "b.ttf") if os.path.exists(font_path.replace(".ttf", "b.ttf")) else font_path, 22)
                break
            except Exception:
                continue

    if font_large is None:
        font_large = ImageFont.load_default()
        font_med = ImageFont.load_default()
        font_small = ImageFont.load_default()
        font_bold = ImageFont.load_default()

    # Left content
    # 1. Eyebrow badge
    draw.rounded_rectangle([(80, 80), (380, 118)], radius=19, fill=(35, 45, 40, 255), outline=(16, 185, 129, 120), width=1)
    draw.text((104, 88), "BINUS UNIVERSITY · B2028", fill=(52, 211, 153, 255), font=font_small)

    # 2. Main Title
    draw.text((80, 145), "Kristian Novan", fill=(255, 255, 255, 255), font=font_large)

    # 3. Role
    draw.text((80, 230), "Computer Science Undergraduate", fill=(200, 205, 215, 255), font=font_med)

    # 4. Specialization & Focus
    draw.text((80, 280), "Specialization: Intelligent Systems (AI) · Semesters 4–5", fill=(148, 163, 184, 255), font=font_small)
    draw.text((80, 315), "Primary Focus: Machine Learning & Human-Centered UI/UX", fill=(148, 163, 184, 255), font=font_small)

    # 5. Feature Badges
    badges = [
        "Machine Learning",
        "UI/UX Design",
        "Case Studies",
        "Interactive 3D Games"
    ]
    bx = 80
    by = 400
    for b in badges:
        bw = len(b) * 11 + 24
        draw.rounded_rectangle([(bx, by), (bx + bw, by + 36)], radius=12, fill=(28, 32, 45, 255), outline=(55, 65, 81, 255), width=1)
        draw.text((bx + 12, by + 8), b, fill=(226, 232, 240, 255), font=font_small)
        bx += bw + 14

    # 6. Footer note
    draw.text((80, 520), "https://kristian-novan.vercel.app  ·  Jakarta, Indonesia", fill=(100, 116, 139, 255), font=font_small)

    # Right side profile portrait
    portrait_path = "f:\\KODINGAN\\KODING KODINGAN SMTER 5\\PORTOFOLIO\\public\\images\\profile\\ppp.jpg"
    if os.path.exists(portrait_path):
        try:
            portrait = Image.open(portrait_path).convert("RGBA")
            target_w = 340
            target_h = 425
            portrait = portrait.resize((target_w, target_h), Image.Resampling.LANCZOS)

            # Create rounded rectangle mask
            mask = Image.new("L", (target_w, target_h), 0)
            mask_draw = ImageDraw.Draw(mask)
            mask_draw.rounded_rectangle([(0, 0), (target_w, target_h)], radius=24, fill=255)

            # Shadow behind portrait
            draw.rounded_rectangle([(776, 88), (776 + target_w, 88 + target_h)], radius=24, fill=(10, 10, 15, 180))

            # Paste portrait with mask
            img.paste(portrait, (770, 80), mask)

            # Border over portrait
            draw.rounded_rectangle([(770, 80), (770 + target_w, 80 + target_h)], radius=24, outline=(255, 255, 255, 60), width=2)
        except Exception as e:
            print("Error pasting portrait:", e)

    output_path = "f:\\KODINGAN\\KODING KODINGAN SMTER 5\\PORTOFOLIO\\public\\opengraph-image.png"
    img.convert("RGB").save(output_path, "PNG", quality=95)
    print("Generated opengraph image at:", output_path)

if __name__ == "__main__":
    generate_og()
