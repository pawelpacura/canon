/**
 * Clone gold-standard shell Tests (138:9148) onto Designs page.
 * Written to avoid MCP JSON-breaking patterns (see mcp-code-constraints.md).
 *
 * Pass VIEW_NAME as the only intentional edit after paste into use_figma,
 * or replace the placeholder string below before running.
 */
const COLON = String.fromCharCode(58);
const page = figma.root.children.find(function (p) {
  return p.name === 'Designs';
});
await figma.setCurrentPageAsync(page);

const sourceId = '138' + COLON + '9148';
const source = await figma.getNodeByIdAsync(sourceId);
if (!source || source.type !== 'FRAME') {
  return { error: 'gold standard 138:9148 missing' };
}

let maxX = 0;
const kids = page.children;
for (let i = 0; i < kids.length; i++) {
  const c = kids[i];
  const right = c.x + c.width;
  if (right > maxX) maxX = right;
}

const clone = source.clone();
clone.name = 'VIEW_NAME';
clone.x = maxX + 200;
clone.y = source.y;

return {
  createdNodeIds: [clone.id],
  x: clone.x,
  y: clone.y,
  name: clone.name,
};
