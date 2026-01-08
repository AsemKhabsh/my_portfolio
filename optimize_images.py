import os
from pathlib import Path
from PIL import Image

def optimize_images():
    # Target directory
    images_dir = Path("images")
    if not images_dir.exists():
        print("Images directory not found.")
        return

    # Extensions to convert
    valid_extensions = {'.png', '.jpg', '.jpeg'}
    
    # Counter
    converted_count = 0

    print(f"Scanning {images_dir.absolute()}...")

    for file_path in images_dir.iterdir():
        if file_path.suffix.lower() in valid_extensions:
            # Construct new filename
            new_file_path = file_path.with_suffix('.webp')
            
            # Skip if webp already exists
            if new_file_path.exists():
                print(f"Skipping {file_path.name} (WebP exists)")
                continue

            try:
                # Open and convert
                with Image.open(file_path) as img:
                    # Save as WebP
                    img.save(new_file_path, 'WEBP', quality=85)
                    print(f"Converted: {file_path.name} -> {new_file_path.name}")
                    converted_count += 1
            except Exception as e:
                print(f"Failed to convert {file_path.name}: {e}")

    print(f"Optimization complete. {converted_count} images converted.")

if __name__ == "__main__":
    optimize_images()
