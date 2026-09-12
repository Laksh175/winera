import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.join(__dirname, '../data/winera12Blogs.json');
const rawData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const assetsDir = path.join(__dirname, '../assets/blogs');
fs.mkdirSync(assetsDir, { recursive: true });

async function downloadImagesAndUpdate() {
  const imageImports = [];
  const formattedPosts = [];

  for (let idx = 0; idx < rawData.length; idx++) {
    const b = rawData[idx];
    const remoteUrl = b.content?.images?.[0] || 'https://api.winera.in/storage/media/b25c5f97-b7c8-4be0-a101-7a1240445669.png';
    const ext = path.extname(remoteUrl.split('?')[0]) || '.png';
    const filename = `blog-cover-${idx + 1}${ext}`;
    const localPath = path.join(assetsDir, filename);

    console.log(`[${idx + 1}/12] Downloading image: ${remoteUrl} -> ${filename}`);
    try {
      const res = await fetch(remoteUrl);
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(localPath, buffer);
      console.log(`Saved ${filename} (${buffer.length} bytes)`);
    } catch (e) {
      console.warn(`Failed to download image ${remoteUrl}`, e.message);
    }

    const varName = `blogImg${idx + 1}`;
    imageImports.push(`import ${varName} from '../assets/blogs/${filename}';`);

    const titleParts = b.title.split(':');
    let mainTitle = b.title;
    let subtitle = '';
    if (titleParts.length > 1) {
      mainTitle = titleParts[0].trim() + ':';
      subtitle = titleParts.slice(1).join(':').trim();
    }

    const rawHtmlContent = b.content?.content || b.meta_description || '';
    const fullContent = htmlToMarkdown(rawHtmlContent);
    const excerpt = b.content?.description || b.meta_description || fullContent.slice(0, 160) + '...';

    formattedPosts.push({
      id: idx + 1,
      slug: b.slug,
      title: mainTitle,
      subtitle: subtitle,
      excerpt: excerpt,
      date: formatDate(b.created_at),
      author: b.user?.name && b.user.name !== 'Thanks Web' ? b.user.name : 'Divyang Mandani',
      category: 'INSIGHTS',
      readTime: `${Math.max(3, Math.ceil(fullContent.split(/\s+/).length / 200))} min read`,
      imageVarName: varName,
      fullContent: fullContent
    });
  }

  // Generate JS module code with imports
  let moduleCode = `// Auto-generated 12 Blogs with Local Image Assets
${imageImports.join('\n')}

export const BLOG_POSTS = [
${formattedPosts.map(p => `  {
    id: ${p.id},
    slug: ${JSON.stringify(p.slug)},
    title: ${JSON.stringify(p.title)},
    subtitle: ${JSON.stringify(p.subtitle)},
    excerpt: ${JSON.stringify(p.excerpt)},
    date: ${JSON.stringify(p.date)},
    author: ${JSON.stringify(p.author)},
    category: ${JSON.stringify(p.category)},
    readTime: ${JSON.stringify(p.readTime)},
    image: ${p.imageVarName},
    fullContent: ${JSON.stringify(p.fullContent)}
  }`).join(',\n')}
];
`;

  const jsPath = path.join(__dirname, '../data/blogData.js');
  fs.writeFileSync(jsPath, moduleCode);
  console.log(`Successfully updated ${jsPath} with local image imports!`);
}

function htmlToMarkdown(htmlStr) {
  if (!htmlStr) return '';
  let str = htmlStr;

  str = str.replace(/<br\s*data-mce-bogus=["']1["']\s*\/?>/gi, '');

  str = str.replace(/<h[1234][^>]*>([\s\S]*?)<\/h[1234]>/gi, (match, content) => {
    const cleanText = content.replace(/<[^>]+>/g, '').trim();
    if (!cleanText) return '';
    return `\n\n### ${cleanText}\n\n`;
  });

  str = str.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (match, content) => {
    const cleanText = content.replace(/<[^>]+>/g, '').trim();
    return `\n- ${cleanText}`;
  });

  str = str.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (match, content) => {
    const cleanText = content.replace(/<[^>]+>/g, '').trim();
    if (!cleanText) return '';
    return `\n\n${cleanText}`;
  });

  str = str.replace(/<[^>]+>/g, '');

  str = str.replace(/&nbsp;/g, ' ')
           .replace(/&amp;/g, '&')
           .replace(/&lt;/g, '<')
           .replace(/&gt;/g, '>')
           .replace(/&quot;/g, '"')
           .replace(/&#39;/g, "'");

  str = str.replace(/\n{3,}/g, '\n\n').trim();
  return str;
}

function formatDate(isoStr) {
  if (!isoStr) return 'AUG 22, 2026';
  try {
    const d = new Date(isoStr);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  } catch (e) {
    return 'AUG 22, 2026';
  }
}

downloadImagesAndUpdate();
