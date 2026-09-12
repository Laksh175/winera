import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.join(__dirname, '../data/winera12Blogs.json');
const rawData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

function htmlToMarkdown(htmlStr) {
  if (!htmlStr) return '';
  let str = htmlStr;

  // Clean bogus breaks
  str = str.replace(/<br\s*data-mce-bogus=["']1["']\s*\/?>/gi, '');

  // Convert Headings h2, h3, h4 to ### Heading
  str = str.replace(/<h[1234][^>]*>([\s\S]*?)<\/h[1234]>/gi, (match, content) => {
    const cleanText = content.replace(/<[^>]+>/g, '').trim();
    if (!cleanText) return '';
    return `\n\n### ${cleanText}\n\n`;
  });

  // Convert list items <li> text </li>
  str = str.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (match, content) => {
    const cleanText = content.replace(/<[^>]+>/g, '').trim();
    return `\n- ${cleanText}`;
  });

  // Convert paragraphs <p> text </p>
  str = str.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (match, content) => {
    const cleanText = content.replace(/<[^>]+>/g, '').trim();
    if (!cleanText) return '';
    return `\n\n${cleanText}`;
  });

  // Remove remaining HTML tags
  str = str.replace(/<[^>]+>/g, '');

  // Decode HTML entities
  str = str.replace(/&nbsp;/g, ' ')
           .replace(/&amp;/g, '&')
           .replace(/&lt;/g, '<')
           .replace(/&gt;/g, '>')
           .replace(/&quot;/g, '"')
           .replace(/&#39;/g, "'");

  // Clean excessive blank lines
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

const formattedPosts = rawData.map((b, idx) => {
  const titleParts = b.title.split(':');
  let mainTitle = b.title;
  let subtitle = '';
  if (titleParts.length > 1) {
    mainTitle = titleParts[0].trim() + ':';
    subtitle = titleParts.slice(1).join(':').trim();
  }

  const rawHtmlContent = b.content?.content || b.meta_description || '';
  const fullContent = htmlToMarkdown(rawHtmlContent);

  const image = b.content?.images?.[0] || 'https://api.winera.in/storage/media/b25c5f97-b7c8-4be0-a101-7a1240445669.png';
  const excerpt = b.content?.description || b.meta_description || fullContent.slice(0, 160) + '...';

  return {
    id: idx + 1,
    slug: b.slug,
    title: mainTitle,
    subtitle: subtitle,
    excerpt: excerpt,
    date: formatDate(b.created_at),
    author: b.user?.name && b.user.name !== 'Thanks Web' ? b.user.name : 'Divyang Mandani',
    category: 'INSIGHTS',
    readTime: `${Math.max(3, Math.ceil(fullContent.split(/\s+/).length / 200))} min read`,
    image: image,
    fullContent: fullContent
  };
});

const fileContent = `// Auto-generated 12 Blogs from Winera.in Official API
export const BLOG_POSTS = ${JSON.stringify(formattedPosts, null, 2)};
`;

const jsPath = path.join(__dirname, '../data/blogData.js');
fs.writeFileSync(jsPath, fileContent);
console.log(`Saved ${formattedPosts.length} blogs to ${jsPath}`);
