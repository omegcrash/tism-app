#!/usr/bin/env python3
"""Generate all TISM turtle assets."""

from PIL import Image, ImageDraw
import math
import os

# TISM Colors
TURQUOISE = (20, 168, 148)  # #14A894
TURQUOISE_DARK = (13, 125, 110)  # #0D7D6E
CREAM = (255, 250, 245)  # #FFFAF5
EARTH_BROWN = (26, 21, 18)  # #1A1512
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
TRANSPARENT = (0, 0, 0, 0)


def draw_turtle(draw, cx, cy, scale, color, outline_only=False):
    """Draw a turtle centered at (cx, cy) with given scale and color."""

    # Shell (main body) - ellipse
    shell_rx, shell_ry = 180 * scale, 160 * scale
    if outline_only:
        draw.ellipse(
            [cx - shell_rx, cy - shell_ry, cx + shell_rx, cy + shell_ry],
            outline=color,
            width=max(1, int(20 * scale))
        )
    else:
        draw.ellipse(
            [cx - shell_rx, cy - shell_ry, cx + shell_rx, cy + shell_ry],
            fill=color
        )

    # Shell pattern - concentric ellipses
    if not outline_only:
        lighter = tuple(min(255, c + 40) for c in color[:3])
        for rx_factor, ry_factor in [(0.67, 0.625), (0.28, 0.31)]:
            rx, ry = shell_rx * rx_factor, shell_ry * ry_factor
            draw.ellipse(
                [cx - rx, cy - ry, cx + rx, cy + ry],
                outline=lighter,
                width=max(1, int(15 * scale))
            )

    # Head - ellipse at top
    head_rx, head_ry = 60 * scale, 70 * scale
    head_cy = cy - 200 * scale
    if outline_only:
        draw.ellipse(
            [cx - head_rx, head_cy - head_ry, cx + head_rx, head_cy + head_ry],
            outline=color,
            width=max(1, int(20 * scale))
        )
    else:
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
            rx = x * math.cos(rot_angle) - y * math.sin(rot_angle)
            ry = x * math.sin(rot_angle) + y * math.cos(rot_angle)
            points.append((leg_cx + rx, leg_cy + ry))
        if outline_only:
            draw.polygon(points, outline=color)
        else:
            draw.polygon(points, fill=color)

    # Tail - small ellipse at bottom
    tail_rx, tail_ry = 30 * scale, 50 * scale
    tail_cy = cy + 200 * scale
    if outline_only:
        draw.ellipse(
            [cx - tail_rx, tail_cy - tail_ry, cx + tail_rx, tail_cy + tail_ry],
            outline=color,
            width=max(1, int(20 * scale))
        )
    else:
        draw.ellipse(
            [cx - tail_rx, tail_cy - tail_ry, cx + tail_rx, tail_cy + tail_ry],
            fill=color
        )


def create_icon(size, bg_color, turtle_color, filename, outline_only=False):
    """Create an icon with the given colors."""
    img = Image.new('RGBA', (size, size), bg_color)
    draw = ImageDraw.Draw(img)

    cx, cy = size // 2, size // 2 + int(20 * size / 1024)
    scale = size / 1024

    draw_turtle(draw, cx, cy, scale, turtle_color, outline_only)

    img.save(filename)
    print(f"Created: {filename}")


def main():
    # Android adaptive icon foreground (turtle on transparent)
    create_icon(1024, TRANSPARENT, TURQUOISE, "assets/icon-android-foreground.png")

    # Android monochrome (white turtle on transparent for theming)
    create_icon(1024, TRANSPARENT, WHITE, "assets/icon-android-monochrome.png")

    # Android notification icon (small, white on transparent)
    create_icon(96, TRANSPARENT, WHITE, "assets/icon-android-notification.png")

    # Logo (turquoise turtle on cream)
    create_icon(512, CREAM + (255,), TURQUOISE, "assets/logo.png")

    # Favicon (small turquoise turtle on transparent)
    create_icon(64, TRANSPARENT, TURQUOISE, "assets/favicon.png")

    # Splash screen logo (white turtle for dark backgrounds)
    create_icon(306, TRANSPARENT, WHITE, "assets/splash/android-splash-logo-white.png")

    # Main splash screens
    # Light splash - turquoise background with cream turtle
    img = Image.new('RGBA', (1284, 2778), (0, 106, 255, 255))  # Bluesky blue, we'll use TISM turquoise
    draw = ImageDraw.Draw(img)
    cx, cy = 1284 // 2, 2778 // 2
    scale = 0.8
    draw_turtle(draw, cx, cy, scale, CREAM)
    img.save("assets/splash/splash.png")
    print("Created: assets/splash/splash.png")

    # Dark splash
    img = Image.new('RGBA', (1284, 2778), (0, 40, 97, 255))  # Dark blue
    draw = ImageDraw.Draw(img)
    draw_turtle(draw, cx, cy, scale, CREAM)
    img.save("assets/splash/splash-dark.png")
    print("Created: assets/splash/splash-dark.png")

    print("\nDone! Created all additional assets.")


if __name__ == "__main__":
    main()
