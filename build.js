// build.js
const fs = require("fs");
const path = require("path");

const MAX = 30; // 1–30px utilities
const XL_MIN = 1600; // optional responsive suffix: -1600

const header = `/* Pixelwind – pixel-based utility classes (1–${MAX}px)
   margin:  m-, mt-, mr-, mb-, ml-
   padding: p-, pt-, pr-, pb-, pl-
   gap:     gap-
   size:    w-, h-
   responsive (min-width:${XL_MIN}px): suffix "-${XL_MIN}"
*/\n`;

let css = header;

// helpers
const line = (cls, prop, val) => `.${cls} { ${prop}: ${val}; }\n`;

function getResponsiveValue(i) {
  const points = [
    { x: 1, y: 1.5 },
    { x: 2, y: 3 },
    { x: 4, y: 5.5 },
    { x: 6, y: 8 },
    { x: 8, y: 12 },
    { x: 9, y: 12 },
    { x: 12, y: 16 },
    { x: 16, y: 20 },
    { x: 18, y: 24 },
    { x: 30, y: 42 },
  ];

  // If exact match, return it
  const match = points.find((p) => p.x === i);
  if (match) return match.y;

  // Linear interpolation
  for (let k = 0; k < points.length - 1; k++) {
    const p1 = points[k];
    const p2 = points[k + 1];
    if (i > p1.x && i < p2.x) {
      const ratio = (i - p1.x) / (p2.x - p1.x);
      const val = p1.y + ratio * (p2.y - p1.y);
      return Math.round(val * 1000) / 1000;
    }
  }

  // Extrapolate for values > 30 using the last slope (1.3)
  if (i > 30) {
    const last = points[points.length - 1];
    // Slope between 18 (24) and 30 (42) is 1.5
    const val = last.y + (i - last.x) * 1.3;
    return Math.round(val * 1000) / 1000;
  }

  return i;
}

// base rules
for (let i = 1; i <= MAX; i++) {
  // margin
  css += line(`m-${i}px`, "margin", `${i}px`);
  css += line(`mt-${i}px`, "margin-top", `${i}px`);
  css += line(`mr-${i}px`, "margin-right", `${i}px`);
  css += line(`mb-${i}px`, "margin-bottom", `${i}px`);
  css += line(`ml-${i}px`, "margin-left", `${i}px`);
  // padding
  css += line(`p-${i}px`, "padding", `${i}px`);
  css += line(`pt-${i}px`, "padding-top", `${i}px`);
  css += line(`pr-${i}px`, "padding-right", `${i}px`);
  css += line(`pb-${i}px`, "padding-bottom", `${i}px`);
  css += line(`pl-${i}px`, "padding-left", `${i}px`);
  css += line(`px-${i}px`, "padding-inline", `${i}px`);
  css += line(`py-${i}px`, "padding-block", `${i}px`);
  // gap
  css += line(`gap-${i}px`, "gap", `${i}px`);
  // width / height
  css += line(`w-${i}px`, "width", `${i}px`);
  css += line(`h-${i}px`, "height", `${i}px`);
  css += line(`text-${i}px`, "font-size", `${i}px`);
}
// for width/height 40,50,----300 with gap of 10
for (let i = 40; i <= 300; i += 10) {
  css += line(`w-${i}px`, "width", `${i}px`);
  css += line(`h-${i}px`, "height", `${i}px`);
}

// responsive (min-width: 1600px) – uses suffix -1600
css += `\n@media (min-width: ${XL_MIN}px) {\n`;
for (let i = 1; i <= MAX; i++) {
  const val = getResponsiveValue(i);
  css += `  .m-${i}px { margin: ${val}px; }\n`;
  css += `  .p-${i}px { padding: ${val}px; }\n`;
  css += `  .gap-${i}px { gap: ${val}px; }\n`;
  css += `  .w-${i}px { width: ${val}px; }\n`;
  css += `  .h-${i}px { height: ${val}px; }\n`;
}
// responsive for larger sizes
for (let i = 40; i <= 300; i += 10) {
  const val = getResponsiveValue(i);
  css += `  .w-${i}px { width: ${val}px; }\n`;
  css += `  .h-${i}px { height: ${val}px; }\n`;
}
css += `}\n`;

// write pretty
fs.writeFileSync(path.join(__dirname, "pixelwind.css"), css, "utf8");

// write minified
const min = css
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/\s+/g, " ")
  .replace(/\s?{\s?/g, "{")
  .replace(/;\s?/g, ";")
  .replace(/}\s?/g, "}")
  .trim();

fs.writeFileSync(path.join(__dirname, "pixelwind.min.css"), min, "utf8");
console.log("✅ Built pixelwind.css and pixelwind.min.css");
