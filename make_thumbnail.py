from PIL import Image, ImageOps
from pathlib import Path

input_path = Path("src/assets/sketchbloom/teaser.png")
output_path = Path("public/thumbnail.png")

target_w, target_h = 1200, 630

img = Image.open(input_path).convert("RGB")

# Resize ảnh để vừa trong khung 1200x630, không crop mất nội dung
img.thumbnail((target_w, target_h), Image.LANCZOS)

# Tạo nền trắng
canvas = Image.new("RGB", (target_w, target_h), "white")

# Căn giữa teaser
x = (target_w - img.width) // 2
y = (target_h - img.height) // 2
canvas.paste(img, (x, y))

output_path.parent.mkdir(parents=True, exist_ok=True)
canvas.save(output_path, quality=95)

print(f"Saved thumbnail to {output_path}")