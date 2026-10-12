import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const root = process.argv[2] ?? 'src/content';

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
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(content);

  if (!match) continue;

  let data;
  try {
    data = YAML.parse(match[1]);
  } catch (error) {
    console.warn(`Skipping invalid frontmatter: ${file}`);
    continue;
  }

  if (!data || typeof data !== 'object' || Array.isArray(data) ||
      !Object.hasOwn(data, 'category')) {
    continue;
  }

  const raw = data.category;
  const release =
    typeof raw === 'number' && Number.isInteger(raw)
      ? raw
      : typeof raw === 'string' && /^\d+$/.test(raw.trim())
        ? Number(raw.trim())
        : null;

  if (release === null) {
    console.warn(`Skipping non-numeric category in ${file}: ${raw}`);
    continue;
  }

  if (Object.hasOwn(data, 'release') && data.release !== release) {
    console.warn(`Skipping ${file}: it already has a different release value`);
    continue;
  }

  data.release = release;
  delete data.category;

  const newFrontmatter = `---\n${YAML.stringify(data).trimEnd()}\n---\n`;
  fs.writeFileSync(
    file,
    newFrontmatter + content.slice(match[0].length),
    'utf8'
  );

  changed++;
}

console.log(`Updated ${changed} Markdown file(s) in ${root}`);
