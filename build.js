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
  // gap
  css += line(`gap-${i}px`, "gap", `${i}px`);
  // width / height
  css += line(`w-${i}px`, "width", `${i}px`);
  css += line(`h-${i}px`, "height", `${i}px`);
}

// responsive (min-width: 1600px) – uses suffix -1600
css += `\n@media (min-width: ${XL_MIN}px) {\n`;
for (let i = 1; i <= MAX; i++) {
  css += `  .m-${i}px-${XL_MIN} { margin: ${i}px; }\n`;
  css += `  .p-${i}px-${XL_MIN} { padding: ${i}px; }\n`;
  css += `  .gap-${i}px-${XL_MIN} { gap: ${i}px; }\n`;
  css += `  .w-${i}px-${XL_MIN} { width: ${i}px; }\n`;
  css += `  .h-${i}px-${XL_MIN} { height: ${i}px; }\n`;
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
