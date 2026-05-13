#!/usr/bin/env python3
"""
Applied Materials Color Palette Generator
Follows COLOR_GUIDE.md OKLCH methodology strictly.
Agent MUST write code for math, never compute manually.
"""

import math

# ── sRGB ↔ Linear sRGB ──
def gamma_to_linear(c):
    c = max(0.0, min(1.0, c))
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

def linear_to_gamma(c):
    c = max(0.0, min(1.0, c))
    return 12.92 * c if c <= 0.0031308 else 1.055 * (c ** (1.0 / 2.4)) - 0.055

# ── Hex ↔ sRGB ──
def hex_to_rgb(hex_str):
    h = hex_str.lstrip("#")
    return tuple(int(h[i:i+2], 16) / 255.0 for i in (0, 2, 4))

def rgb_to_hex(r, g, b):
    def f(c):
        return format(int(round(max(0, min(255, c * 255)))), "02x")
    return f"#{f(r)}{f(g)}{f(b)}"

# ── sRGB ↔ OKLab → OKLCH ──
def rgb_to_oklab(r, g, b):
    # sRGB → linear
    rl, gl, bl = gamma_to_linear(r), gamma_to_linear(g), gamma_to_linear(b)
    # linear sRGB → LMS
    l_ = 0.8189330101 * rl + 0.3618667424 * gl - 0.1288597137 * bl
    m_ = 0.0329845436 * rl + 0.9293118715 * gl + 0.0361456387 * bl
    s_ = 0.0482003018 * rl + 0.2643662691 * gl + 0.6338517070 * bl
    # LMS → OKLab (cube root)
    l = l_ ** (1/3) if l_ > 0 else -((-l_) ** (1/3))
    m = m_ ** (1/3) if m_ > 0 else -((-m_) ** (1/3))
    s = s_ ** (1/3) if s_ > 0 else -((-s_) ** (1/3))
    L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s
    a = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s
    bval = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s
    return (L, a, bval)

def oklab_to_rgb(L, a, bval):
    # OKLab → LMS
    l = L + 0.3963377774 * a + 0.2158037573 * bval
    m = L - 0.1055613458 * a - 0.0638541728 * bval
    s = L - 0.0894841775 * a - 1.2914855480 * bval
    # cube
    l_ = l ** 3 if l > 0 else -((-l) ** 3)
    m_ = m ** 3 if m > 0 else -((-m) ** 3)
    s_ = s ** 3 if s > 0 else -((-s) ** 3)
    # LMS → linear sRGB
    rl = +4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_
    gl = -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_
    bl = -0.0041960863 * l_ - 0.7034186147 * m_ + 1.7076147010 * s_
    # linear → gamma
    return (linear_to_gamma(rl), linear_to_gamma(gl), linear_to_gamma(bl))

def oklab_to_oklch(L, a, bval):
    C = math.hypot(a, bval)
    H = math.degrees(math.atan2(bval, a))
    if H < 0:
        H += 360
    return (L, C, H)

def oklch_to_oklab(L, C, H):
    h_rad = math.radians(H)
    a = C * math.cos(h_rad)
    bval = C * math.sin(h_rad)
    return (L, a, bval)

def rgb_to_oklch(r, g, b):
    return oklab_to_oklch(*rgb_to_oklab(r, g, b))

def oklch_to_rgb(L, C, H):
    return oklab_to_rgb(*oklch_to_oklab(L, C, H))

# ── Relative Luminance (WCAG) ──
def relative_luminance(r, g, b):
    """r,g,b are linear sRGB values."""
    return 0.2126 * r + 0.7152 * g + 0.0722 * b

def contrast_ratio(hex1, hex2):
    r1, g1, b1 = hex_to_rgb(hex1)
    r2, g2, b2 = hex_to_rgb(hex2)
    y1 = relative_luminance(gamma_to_linear(r1), gamma_to_linear(g1), gamma_to_linear(b1))
    y2 = relative_luminance(gamma_to_linear(r2), gamma_to_linear(g2), gamma_to_linear(b2))
    lighter = max(y1, y2)
    darker = min(y1, y2)
    return (lighter + 0.05) / (darker + 0.05)

def best_text_color(bg_hex):
    """Returns 'white' or 'black' for best contrast on bg."""
    bg_r, bg_g, bg_b = hex_to_rgb(bg_hex)
    y = relative_luminance(gamma_to_linear(bg_r), gamma_to_linear(bg_g), gamma_to_linear(bg_b))
    white_cr = (1.0 + 0.05) / (y + 0.05)
    black_cr = (y + 0.05) / (0.0 + 0.05)
    return "white" if white_cr >= black_cr else "black"

# ── Palette Generation ──

# Lightness stops per COLOR_GUIDE.md
LIGHTNESS_STOPS = [
    0.97,  # 50
    0.93,  # 100
    0.87,  # 200
    0.78,  # 300
    0.69,  # 400
    0.60,  # 500
    0.51,  # 600
    0.43,  # 700
    0.36,  # 800
    0.29,  # 900
    0.25,  # 950
]

SHADE_NAMES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

def parabolic_chroma(L, peak_chroma):
    """Chroma peaks at L=0.6, tapers to zero at L=0.6±0.5."""
    return peak_chroma * max(0.0, 1.0 - ((L - 0.6) / 0.5) ** 2)

def generate_shades(hue, peak_chroma):
    """Generate 11 OKLCH shades for a given hue and peak chroma."""
    shades = {}
    for name, L in zip(SHADE_NAMES, LIGHTNESS_STOPS):
        C = parabolic_chroma(L, peak_chroma)
        # Clamp C to peak and to reasonable gamut limits
        C = min(C, peak_chroma)
        # Simple gamut mapping: if RGB out of bounds, reduce C
        rgb = oklch_to_rgb(L, C, hue)
        while any(c < -0.001 or c > 1.001 for c in rgb) and C > 0:
            C -= 0.001
            rgb = oklch_to_rgb(L, C, hue)
        C = max(0, C)
        rgb = tuple(max(0, min(1, c)) for c in rgb)
        hex_val = rgb_to_hex(*rgb)
        shades[name] = {
            "oklch": f"oklch({L:.3f} {C:.4f} {hue:.1f})",
            "hex": hex_val,
            "L": L, "C": C, "H": hue,
        }
    return shades

def generate_dark_shades(hue, peak_chroma):
    """Dark mode: reverse lightness indices."""
    dark_L = LIGHTNESS_STOPS[::-1]  # reversed
    shades = {}
    for name, L in zip(SHADE_NAMES, dark_L):
        C = parabolic_chroma(L, peak_chroma)
        C = min(C, peak_chroma)
        rgb = oklch_to_rgb(L, C, hue)
        while any(c < -0.001 or c > 1.001 for c in rgb) and C > 0:
            C -= 0.001
            rgb = oklch_to_rgb(L, C, hue)
        C = max(0, C)
        rgb = tuple(max(0, min(1, c)) for c in rgb)
        hex_val = rgb_to_hex(*rgb)
        shades[name] = {
            "oklch": f"oklch({L:.3f} {C:.4f} {hue:.1f})",
            "hex": hex_val,
            "L": L, "C": C, "H": hue,
        }
    return shades

# ── Main ──
if __name__ == "__main__":
    # Applied Materials primary brand color
    PRIMARY_HEX = "#569BBE"
    pr, pg, pb = hex_to_rgb(PRIMARY_HEX)
    pL, pC, pH = rgb_to_oklch(pr, pg, pb)
    print(f"Primary {PRIMARY_HEX} → OKLCH: L={pL:.4f} C={pC:.4f} H={pH:.2f}")

    # Use the hue from the brand color, set peak chroma per guide (0.13–0.15)
    PRIMARY_HUE = pH
    PRIMARY_PEAK_C = 0.14

    # Neutral: same hue, very low chroma (0.015)
    NEUTRAL_PEAK_C = 0.015

    # Semantic colors per guide
    ERROR_HUE = 25.0
    ERROR_PEAK_C = 0.15
    WARNING_HUE = 70.0
    WARNING_PEAK_C = 0.12
    SUCCESS_HUE = 155.0
    SUCCESS_PEAK_C = 0.13

    # Generate all palettes
    primary_light = generate_shades(PRIMARY_HUE, PRIMARY_PEAK_C)
    primary_dark = generate_dark_shades(PRIMARY_HUE, PRIMARY_PEAK_C)
    neutral_light = generate_shades(PRIMARY_HUE, NEUTRAL_PEAK_C)
    neutral_dark = generate_dark_shades(PRIMARY_HUE, NEUTRAL_PEAK_C)
    error_light = generate_shades(ERROR_HUE, ERROR_PEAK_C)
    error_dark = generate_dark_shades(ERROR_HUE, ERROR_PEAK_C)
    warning_light = generate_shades(WARNING_HUE, WARNING_PEAK_C)
    warning_dark = generate_dark_shades(WARNING_HUE, WARNING_PEAK_C)
    success_light = generate_shades(SUCCESS_HUE, SUCCESS_PEAK_C)
    success_dark = generate_dark_shades(SUCCESS_HUE, SUCCESS_PEAK_C)

    # Secondary/accent: complementary (180°) and analogous (+30°)
    # For a tech brand, let's use a split-complementary warm accent
    ACCENT1_HUE = (PRIMARY_HUE + 180) % 360  # Complementary
    ACCENT1_PEAK_C = 0.13
    accent1_light = generate_shades(ACCENT1_HUE, ACCENT1_PEAK_C)
    accent1_dark = generate_dark_shades(ACCENT1_HUE, ACCENT1_PEAK_C)

    ACCENT2_HUE = (PRIMARY_HUE + 30) % 360  # Analogous
    ACCENT2_PEAK_C = 0.12
    accent2_light = generate_shades(ACCENT2_HUE, ACCENT2_PEAK_C)
    accent2_dark = generate_dark_shades(ACCENT2_HUE, ACCENT2_PEAK_C)

    def print_palette(name, light, dark=None):
        print(f"\n=== {name} ===")
        for sn in SHADE_NAMES:
            s = light[sn]
            print(f"  {sn:3d}: {s['hex']}  {s['oklch']}")
        if dark:
            print(f"  --- dark mode ---")
            for sn in SHADE_NAMES:
                s = dark[sn]
                print(f"  {sn:3d}: {s['hex']}  {s['oklch']}")

    print_palette("Primary", primary_light, primary_dark)
    print_palette("Neutral", neutral_light, neutral_dark)
    print_palette("Error", error_light, error_dark)
    print_palette("Warning", warning_light, warning_dark)
    print_palette("Success", success_light, success_dark)
    print_palette("Accent 1 (Complementary)", accent1_light, accent1_dark)
    print_palette("Accent 2 (Analogous)", accent2_light, accent2_dark)

    # WCAG Validation
    print("\n=== WCAG Contrast Validation ===")
    def validate_role(light_shades, name):
        bg600 = light_shades[600]["hex"]
        cr_600 = contrast_ratio(bg600, "#ffffff")
        bg700 = light_shades[700]["hex"]
        cr_700 = contrast_ratio(bg700, "#ffffff")
        bg400 = light_shades[400]["hex"]  # for dark mode
        cr_400_dark = contrast_ratio(bg400, "#121212")
        print(f"{name}:")
        print(f"  600 on white: {cr_600:.2f}:1 {'PASS AA' if cr_600 >= 4.5 else 'FAIL'}")
        print(f"  700 on white: {cr_700:.2f}:1 {'PASS AA' if cr_700 >= 4.5 else 'FAIL'}")
        print(f"  400 on #121212: {cr_400_dark:.2f}:1 {'PASS AA' if cr_400_dark >= 4.5 else 'FAIL'}")

    validate_role(primary_light, "Primary")
    validate_role(neutral_light, "Neutral")
    validate_role(error_light, "Error")
    validate_role(warning_light, "Warning")
    validate_role(success_light, "Success")

    # Export to JSON for HTML generation
    import json
    export = {
        "primaryHue": round(PRIMARY_HUE, 2),
        "roles": {
            "primary": {"light": {str(k): v["hex"] for k, v in primary_light.items()}, "dark": {str(k): v["hex"] for k, v in primary_dark.items()}},
            "neutral": {"light": {str(k): v["hex"] for k, v in neutral_light.items()}, "dark": {str(k): v["hex"] for k, v in neutral_dark.items()}},
            "error": {"light": {str(k): v["hex"] for k, v in error_light.items()}, "dark": {str(k): v["hex"] for k, v in error_dark.items()}},
            "warning": {"light": {str(k): v["hex"] for k, v in warning_light.items()}, "dark": {str(k): v["hex"] for k, v in warning_dark.items()}},
            "success": {"light": {str(k): v["hex"] for k, v in success_light.items()}, "dark": {str(k): v["hex"] for k, v in success_dark.items()}},
            "accent1": {"light": {str(k): v["hex"] for k, v in accent1_light.items()}, "dark": {str(k): v["hex"] for k, v in accent1_dark.items()}},
            "accent2": {"light": {str(k): v["hex"] for k, v in accent2_light.items()}, "dark": {str(k): v["hex"] for k, v in accent2_dark.items()}},
        }
    }
    with open("am_palette.json", "w") as f:
        json.dump(export, f, indent=2)
    print("\nPalette exported to am_palette.json")
