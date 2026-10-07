import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mapFilePath = path.resolve(__dirname, 'cloudinaryAssetsMap.json');
const map = JSON.parse(fs.readFileSync(mapFilePath, 'utf-8'));

const directoriesToScan = [
  path.resolve(__dirname, '../../../frontend/src/pages'),
  path.resolve(__dirname, '../../../frontend/src/components')
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;

  // Pattern: import <ident> from ['"](.*assets\/([^'"]+))['"];?
  const importRegex = /import\s+([A-Za-z0-9_$]+)\s+from\s+['"]([^'"]*assets\/([^'"]+))['"];?/g;

  content = content.replace(importRegex, (match, varName, importPath, filename) => {
    // Check if filename exists in map (or if filename without query exists)
    const cleanFilename = filename.split('?')[0].split('#')[0];
    if (map[cleanFilename]) {
      const cloudinaryUrl = map[cleanFilename];
      return `const ${varName} = "${cloudinaryUrl}";`;
    }
    return match;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ Updated asset references in ${path.basename(filePath)}`);
  }
}

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      processFile(fullPath);
    }
  }
}

console.log('--- Replacing local asset imports with Cloudinary CDN constants across all frontend pages and components ---');
for (const dir of directoriesToScan) {
  scanDir(dir);
}
console.log('--- Done! All fallback assets now point to Cloudinary. ---');
