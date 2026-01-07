# Pixelwind

### Pixel-perfect utility classes for modern UI work

**Pixelwind** is a lightweight, utility-first CSS package that gives you **exact pixel-based spacing and sizing utilities** — without configuration, build steps, or scale guessing.

If your design says **13px**, you write **13px**.

---

## Why Pixelwind?

* 🎯 **Exact pixel control** — no spacing scales, no approximation
* 🧠 **Self-documenting utilities** — readable at a glance
* ⚡ **Zero config & zero build** — works instantly
* 🧩 **Plays well with Tailwind** — use both together
* 📦 **Tiny & focused** — does one thing, does it well

---

## Installation

```bash
npm install pixelwind
```

---

## Usage

### With bundlers (Vite, Webpack, Next.js, etc.)

```js
import "pixelwind/pixelwind.css";
```

### Directly in HTML

```html
<link rel="stylesheet" href="./node_modules/pixelwind/pixelwind.min.css" />
```

---

## Available Utilities

Pixelwind currently provides pixel-based utilities from **1px to 30px** for:

* **Padding** → `p`, `pt`, `pr`, `pb`, `pl`
* **Margin** → `m`, `mt`, `mr`, `mb`, `ml`
* **Gap** → `gap`
* **Width** → `w`
* **Height** → `h`

---

## Examples

```html
<!-- Spacing -->
<div class="p-10px mb-20px gap-5px">Box</div>

<!-- Sizing -->
<div class="w-120px h-30px">Sized</div>

<!-- Directional padding -->
<div class="pt-8px pl-14px">Precise</div>
```

Each class maps **directly to CSS**:

```css
p-10px → padding: 10px;
w-120px → width: 120px;
gap-5px → gap: 5px;
```

---

## Using Pixelwind with Tailwind

Pixelwind is **not a Tailwind replacement** — it complements it.

Use Tailwind for:

* Layout
* Typography
* Colors
* Responsive design

Use Pixelwind when you need:

* Exact spacing from design specs
* One-off pixel values
* Clean alternatives to inline styles

They work together without conflict.

---

## When Pixelwind Shines

* Design-heavy UIs
* Docs & component libraries
* Prototypes & demos
* Pixel-perfect layouts
* Teams working closely with designers

---

## Browser Support

Pixelwind is pure CSS and works in all modern browsers.

---

## License

MIT © 2025 Rohit Mahar


