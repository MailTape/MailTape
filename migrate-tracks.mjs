import fs from 'node:fs';
import path from 'node:path';

const root = process.argv[2] ?? 'src/content';

if (!fs.existsSync(root)) {
  console.error(`Folder not found: ${root} (run the script from your project root)`);
  process.exit(1);
}

function getMarkdownFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return getMarkdownFiles(fullPath);
    return entry.isFile() && entry.name.endsWith('.md') ? [fullPath] : [];
  });
}

let changed = 0;

for (const file of getMarkdownFiles(root)) {
  const content = fs.readFileSync(file, 'utf8');

  // Match frontmatter at the start, including files with a UTF-8 BOM.
  const match = /^(\uFEFF?---[ \t]*\r?\n)([\s\S]*?)(\r?\n---[ \t]*(?:\r?\n|$))/.exec(content);
  if (!match) continue;

  const frontmatter = match[2].replace(
    /^[ \t]*episode_URL[ \t]*:.*(?:\r?\n|$)/gm,
    ''
  );

  if (frontmatter === match[2]) continue;

  const updated =
    match[1] +
    frontmatter +
    match[3] +
    content.slice(match[0].length);

  fs.writeFileSync(file, updated, 'utf8');
  console.log(`Removed episode_URL from ${file}`);
  changed++;
}

console.log(`Done. Updated ${changed} file(s).`);
