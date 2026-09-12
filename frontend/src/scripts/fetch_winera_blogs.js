import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchBlogs() {
  try {
    const res1 = await fetch('https://api.winera.in/api/blogs?page=1');
    const json1 = await res1.json();
    const page1Blogs = json1.blogs?.data || [];

    const res2 = await fetch('https://api.winera.in/api/blogs?page=2');
    const json2 = await res2.json();
    const page2Blogs = json2.blogs?.data || [];

    const allBlogs = [...page1Blogs, ...page2Blogs].slice(0, 12);
    console.log(`Fetched ${allBlogs.length} blogs list from API`);

    const detailedBlogs = [];

    for (let i = 0; i < allBlogs.length; i++) {
      const b = allBlogs[i];
      console.log(`Fetching details for blog ${i+1}/${allBlogs.length}: ${b.slug}`);

      let detail = b;
      try {
        const dRes = await fetch(`https://api.winera.in/api/blogs/${b.slug}`);
        if (dRes.ok) {
          const dJson = await dRes.json();
          if (dJson.blog) detail = dJson.blog;
        }
      } catch (e) {
        console.warn(`Failed to fetch detail for ${b.slug}`, e.message);
      }

      detailedBlogs.push(detail);
    }

    const outputPath = path.join(__dirname, '../data/winera12Blogs.json');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(detailedBlogs, null, 2));
    console.log(`Successfully saved 12 blogs to ${outputPath}`);
  } catch (err) {
    console.error('Error fetching blogs:', err);
  }
}

fetchBlogs();
