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

  // Match YAML frontmatter at the start of the file.
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(content);
  if (!match) continue;

  const data = YAML.parse(match[1]);
  if (!data || typeof data !== 'object' || Array.isArray(data)) continue;

  const hasLegacyFields = Array.from({ length: 7 }, (_, index) => index + 1)
    .some((n) =>
      ['title', 'color', 'link'].some((field) =>
        Object.hasOwn(data, `track${n}_${field}`)
      )
    );

  if (!hasLegacyFields) continue;

  for (let n = 1; n <= 7; n++) {
    const oldFields = {
      title: `track${n}_title`,
      color: `track${n}_color`,
      link: `track${n}_link`,
    };

    const hasTrackData = Object.values(oldFields).some((key) =>
      Object.hasOwn(data, key)
    );
    if (!hasTrackData) continue;

    const trackKey = `track${n}`;
    const track =
      data[trackKey] && typeof data[trackKey] === 'object' && !Array.isArray(data[trackKey])
        ? data[trackKey]
        : {};

    for (const [field, oldKey] of Object.entries(oldFields)) {
      const value = data[oldKey];

      // Ignore blank/null legacy values; keep any value that exists.
      if (value !== undefined && value !== null && value !== '') {
        track[field] = value;
      }

      delete data[oldKey];
    }

    if (Object.keys(track).length > 0) {
      data[trackKey] = track;
    }
  }

  const newFrontmatter = `---\n${YAML.stringify(data).trimEnd()}\n---\n`;
  const updated = newFrontmatter + content.slice(match[0].length);

  fs.writeFileSync(file, updated, 'utf8');
  changed++;
}

console.log(`Updated ${changed} Markdown file(s) in ${root}`);
