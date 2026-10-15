// lowercase-frontmatter.js
const fs = require("node:fs");
const path = require("node:path");

const root = process.argv[2];

if (!root || !fs.existsSync(root) || !fs.statSync(root).isDirectory()) {
  console.error("Usage: node lowercase-frontmatter.js <folder>");
  process.exit(1);
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(file);
    } else if (/\.(md|mdx)$/i.test(entry.name)) {
      updateFile(file);
    }
  }
}

function updateFile(file) {
  const text = fs.readFileSync(file, "utf8");
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/);

  if (!match) return;

  const updatedYaml = match[1].replace(
    /^([ \t]*(?:guestPic|image|musiColor)[ \t]*:[ \t]*)(.*)$/gim,
    (_, keyAndColon, value) => keyAndColon + value.toLowerCase()
  );

  if (updatedYaml !== match[1]) {
    fs.writeFileSync(file, text.replace(match[0], match[0].replace(match[1], updatedYaml)));
    console.log(`Updated ${file}`);
  }
}

walk(root);
