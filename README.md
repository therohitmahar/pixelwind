# Pixelwind – Tailwind’s pixel-perfect cousin

Lightweight, utility-first CSS with pixel-based classes for spacing, gap, width, and height (1–30px). No config. No build step.

## Install

npm i pixelwind

## Use

<!-- HTML -->
<link rel="stylesheet" href="./node_modules/pixelwind/pixelwind.min.css" />

<!-- or JS bundlers -->

import "pixelwind/pixelwind.css";

## Examples

```html
<div class="p-10px mb-20px gap-5px">Box</div>
<div class="w-120px h-30px">Sized</div>
<div class="p-12px-1600">Larger padding ≥1600px</div>
```
