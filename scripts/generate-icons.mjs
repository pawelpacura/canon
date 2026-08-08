import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const manifest = JSON.parse(
  readFileSync(join(__dirname, "icons.manifest.json"), "utf8")
);
const svgRoot = join(root, "node_modules/@material-symbols/svg-300/outlined");
const outDir = join(root, "src/icons/generated");

mkdirSync(outDir, { recursive: true });

function extractPaths(svg) {
  const paths = [];
  const re = /<path\b[^>]*\bd="([^"]+)"/g;
  let match;
  while ((match = re.exec(svg)) !== null) {
    paths.push(match[1]);
  }
  return paths;
}

for (const [exportName, symbolName] of Object.entries(manifest)) {
  const svgPath = join(svgRoot, `${symbolName}.svg`);
  let svg;
  try {
    svg = readFileSync(svgPath, "utf8");
  } catch {
    throw new Error(`Missing Material Symbol: ${symbolName}.svg (${exportName})`);
  }

  const paths = extractPaths(svg);
  if (paths.length === 0) {
    throw new Error(`No <path> found in ${symbolName}.svg`);
  }

  const pathLines = paths
    .map((d) => `  { d: ${JSON.stringify(d)} }`)
    .join(",\n");

  const source = `import { createDsIcon } from "../createDsIcon";

/** Material Symbols: ${symbolName} (outlined, weight 300) */
export const ${exportName} = createDsIcon("${exportName}", [
${pathLines}
]);
`;

  writeFileSync(join(outDir, `${exportName}.tsx`), source, "utf8");
  console.log(`generated ${exportName} <- ${symbolName}`);
}
