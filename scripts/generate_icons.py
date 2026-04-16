#!/usr/bin/env python3
"""Generate TISM turtle app icons."""

from PIL import Image, ImageDraw
import math
import os

# TISM Colors
TURQUOISE = (20, 168, 148)  # #14A894
TURQUOISE_DARK = (13, 125, 110)  # #0D7D6E
CREAM = (255, 250, 245)  # #FFFAF5
EARTH_BROWN = (26, 21, 18)  # #1A1512
EARTH_TAN = (221, 211, 200)  # #DDD3C8

def draw_turtle(draw, cx, cy, scale, color):
    """Draw a turtle centered at (cx, cy) with given scale and color."""

    # Shell (main body) - ellipse
    shell_rx, shell_ry = 180 * scale, 160 * scale
    draw.ellipse(
        [cx - shell_rx, cy - shell_ry, cx + shell_rx, cy + shell_ry],
        fill=color
    )

    # Shell pattern - concentric ellipses (lighter)
    lighter = tuple(min(255, c + 40) for c in color)
    for i, (rx_factor, ry_factor) in enumerate([(0.67, 0.625), (0.28, 0.31)]):
        rx, ry = shell_rx * rx_factor, shell_ry * ry_factor
        draw.ellipse(
            [cx - rx, cy - ry, cx + rx, cy + ry],
            outline=lighter,
            width=int(15 * scale)
        )

    # Head - ellipse at top
    head_rx, head_ry = 60 * scale, 70 * scale
    head_cy = cy - 200 * scale
    draw.ellipse(
        [cx - head_rx, head_cy - head_ry, cx + head_rx, head_cy + head_ry],
        fill=color
    )

    # Legs - 4 ellipses at corners
    leg_positions = [
        (-160, -80, -30),  # front left
        (160, -80, 30),    # front right
        (-160, 100, 30),   # back left
        (160, 100, -30),   # back right
    ]

    for lx, ly, angle in leg_positions:
        leg_cx = cx + lx * scale
        leg_cy = cy + ly * scale
        leg_rx, leg_ry = 50 * scale, 40 * scale

        # Draw rotated ellipse using polygon approximation
        points = []
        for i in range(36):
            theta = i * 10 * math.pi / 180
            rot_angle = angle * math.pi / 180
            x = leg_rx * math.cos(theta)
            y = leg_ry * math.sin(theta)
            # Rotate
            rx = x * math.cos(rot_angle) - y * math.sin(rot_angle)
            ry = x * math.sin(rot_angle) + y * math.cos(rot_angle)
            points.append((leg_cx + rx, leg_cy + ry))
        draw.polygon(points, fill=color)

    # Tail - small ellipse at bottom
    tail_rx, tail_ry = 30 * scale, 50 * scale
    tail_cy = cy + 200 * scale
    draw.ellipse(
        [cx - tail_rx, tail_cy - tail_ry, cx + tail_rx, tail_cy + tail_ry],
        fill=color
    )


def create_icon(size, bg_color, turtle_color, filename):
    """Create an icon with the given colors."""
    img = Image.new('RGBA', (size, size), bg_color)
    draw = ImageDraw.Draw(img)

    cx, cy = size // 2, size // 2 + 20  # Slightly lower center for visual balance
    scale = size / 1024

    draw_turtle(draw, cx, cy, scale, turtle_color)

    img.save(filename)
    print(f"Created: {filename}")


def main():
    output_dir = "assets/app-icons"
    os.makedirs(output_dir, exist_ok=True)

    size = 1024

    # Default icons
    icons = [
        # (bg_color, turtle_color, name_suffix)
        (CREAM, TURQUOISE, "default_next"),
        (CREAM, TURQUOISE, "legacy_light"),
        (EARTH_BROWN, TURQUOISE, "legacy_dark"),

        # Core flat variants
        (TURQUOISE, CREAM, "core_flat_blue"),  # Inverted
        ((255, 255, 255, 255), TURQUOISE, "core_flat_white"),
        ((0, 0, 0, 255), TURQUOISE, "core_flat_black"),

        # Themed variants (using earth tones)
        ((45, 35, 30, 255), TURQUOISE, "core_midnight"),  # Dark earth
        ((255, 200, 150, 255), TURQUOISE_DARK, "core_sunrise"),  # Warm
        ((255, 150, 100, 255), TURQUOISE_DARK, "core_sunset"),  # Orange
        ((100, 80, 60, 255), (180, 220, 180), "core_bonfire"),  # Earth with sage
        ((20, 40, 60, 255), (100, 200, 180), "core_aurora"),  # Night sky with aurora
        (CREAM, EARTH_BROWN, "core_classic"),  # Classic earth tones
    ]

    for bg, turtle, suffix in icons:
        # Ensure colors are tuples with alpha
        if len(bg) == 3:
            bg = bg + (255,)
        if len(turtle) == 3:
            turtle = turtle + (255,)

        # Android icon
        create_icon(size, bg, turtle[:3], f"{output_dir}/android_icon_{suffix}.png")
        # iOS icon
        create_icon(size, bg, turtle[:3], f"{output_dir}/ios_icon_{suffix}.png")

    print("\nDone! Created all icons.")


if __name__ == "__main__":
    main()
