import os
from PIL import Image, ImageDraw, ImageFont

def create_placeholder(filepath, width, height, title, subtitle, tag="PLACEHOLDER"):
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    # Background color: warm ivory #F6F5F0
    img = Image.new("RGB", (width, height), color=(246, 245, 240))
    draw = ImageDraw.Draw(img)

    # Outer border
    draw.rectangle([16, 16, width - 17, height - 17], outline=(225, 222, 212), width=2)
    # Inner dashed or subtle accent line
    draw.rectangle([28, 28, width - 29, height - 29], outline=(238, 236, 228), width=1)

    # Accent decorative top bar
    draw.rectangle([30, 30, width - 30, 36], fill=(45, 90, 70)) # Sage accent

    # Use default font
    try:
        font_title = ImageFont.truetype("arial.ttf", 28)
        font_sub = ImageFont.truetype("arial.ttf", 16)
        font_tag = ImageFont.truetype("arial.ttf", 13)
        font_desc = ImageFont.truetype("arial.ttf", 14)
    except Exception:
        font_title = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        font_tag = ImageFont.load_default()
        font_desc = ImageFont.load_default()

    # Draw Tag pill
    pill_w = 160
    pill_h = 28
    pill_x = (width - pill_w) // 2
    pill_y = height // 2 - 70
    draw.rectangle([pill_x, pill_y, pill_x + pill_w, pill_y + pill_h], fill=(234, 242, 237), outline=(194, 217, 205), width=1)
    
    # Tag text
    draw.text((pill_x + 18, pill_y + 6), tag, fill=(45, 90, 70), font=font_tag)

    # Title text
    # Approximate text bounding
    draw.text((width // 2 - 180, height // 2 - 25), title, fill=(24, 24, 26), font=font_title)
    
    # Subtitle text
    draw.text((width // 2 - 160, height // 2 + 20), subtitle, fill=(113, 113, 122), font=font_sub)

    # Bottom helper note
    footer_text = "Replace file in: " + os.path.basename(os.path.dirname(filepath)) + "/" + os.path.basename(filepath)
    draw.text((width // 2 - 170, height - 60), footer_text, fill=(161, 161, 170), font=font_desc)

    img.save(filepath, "JPEG", quality=90)
    print(f"Created {filepath}")

# 1. Profile photo
create_placeholder(
    "public/images/profile.jpg",
    800, 1000,
    "Kristian Novan",
    "Portrait Photo Placeholder (3:4 ratio)",
    "PROFILE PHOTO"
)

# 2. Activities: Walubi 1-8
for i in range(1, 9):
    create_placeholder(
        f"public/images/activities/walubi-{i:02d}.jpg",
        800, 560,
        f"Campus Activity #{i:02d}",
        "WALUBI Committee & Campus Events",
        "ACTIVITY PHOTO"
    )

# 3. Activities: MC 1-6
for i in range(1, 7):
    create_placeholder(
        f"public/images/activities/mc-{i:02d}.jpg",
        800, 560,
        f"Master of Ceremony #{i:02d}",
        "Public Speaking & Campus Moderation",
        "MC PHOTO"
    )

# 4. Project images
projects = [
    ("airsense-01.jpg", "AirSense Dashboard", "AOL — Machine Learning"),
    ("nivscan-01.jpg", "NiVScan", "AOL — Natural Language Processing"),
    ("promod-01.jpg", "ProMod AI — Overview", "AOL — Computational Biology"),
    ("promod-02.jpg", "ProMod AI — Model", "Post-Translational Modification"),
    ("finance-01.jpg", "Finance Application", "AOL — Software Engineering"),
    ("platgizi-01.jpg", "PlatGizi", "Smart Menu Planning System"),
    ("ecorouter-01.jpg", "EcoRouter AI", "CompFest AI Competition"),
    ("skinical-01.jpg", "Skinical", "AOL — Computer Vision"),
    ("travel-01.jpg", "Travel App — Screen 1", "AOL — HCI Design & Exploration"),
    ("travel-02.jpg", "Travel App — Screen 2", "AOL — HCI User Journey & Flow"),
    ("travel-03.jpg", "Travel App — Screen 3", "AOL — HCI Final Interface"),
]

for filename, title, sub in projects:
    create_placeholder(
        f"public/images/projects/{filename}",
        800, 520,
        title,
        sub,
        "PROJECT PREVIEW"
    )

print("All placeholder images created successfully!")
