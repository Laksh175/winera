export const sanitizeAndFormatHtml = (input) => {
  if (!input || typeof input !== 'string') return '';
  let html = input;

  // 1. Remove editor cursor artifacts and unwanted span tags (such as Quill clipboard artifacts <span style="background-color: transparent; color: rgb(0, 0, 0);">)
  html = html.replace(/<span class="ql-cursor">.*?<\/span>/gi, '');
  html = html.replace(/<\/?span[^>]*>/gi, '');

  // 2. Convert markdown to HTML tags if markdown syntax exists
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/(^|[^\*])\*(?!\*)(.+?)\*(?!\*)/g, '$1<em>$2</em>');
  html = html.replace(/~~(.+?)~~/g, '<del>$1</del>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // 3. Ensure links have proper color, font-weight and security attributes
  html = html.replace(/<a\s+[^>]*?href=["']?([^"'\s>]+)["']?[^>]*>/gi, (match, href) => {
    const isWineraOrRelative = href.startsWith('/') || href.startsWith('#') || href.includes('winera.in');
    const targetAttr = isWineraOrRelative ? '' : ' target="_blank" rel="noopener noreferrer"';
    return `<a href="${href}" style="color: #0284c7; font-weight: 700; text-decoration: underline;"${targetAttr}>`;
  });

  // 4. Auto-heal any accidentally split sentences (e.g. bolded prefix split across </p><p> or <br>)
  html = html.replace(/<\/p>\s*<p[^>]*>\s*([a-z])/gi, ' $1');
  html = html.replace(/(<\/strong>|<\/b>|<\/a>|<\/u>|<\/em>)\s*<\/p>\s*<p[^>]*>\s*/gi, '$1 ');
  html = html.replace(/([^\.\!\?\:\n>])\s*<br\s*\/?>\s*([a-z])/gi, '$1 $2');

  // 5. Strip redundant outer <p>...</p> if whole content is wrapped in paragraph
  const trimmed = html.trim();
  if (/^<p[^>]*>[\s\S]*<\/p>$/i.test(trimmed) && (trimmed.match(/<\/p>/gi) || []).length === 1) {
    html = trimmed.replace(/^<p[^>]*>/i, '').replace(/<\/p>$/i, '');
  }

  return html;
};

export const normalizeRawContent = (raw) => {
  if (!raw) return '';
  let str = String(raw);

  // 1. Convert literal string representations of newlines ("\\n", "\\r\\n") to real newlines
  str = str.replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n').replace(/\\r/g, '\n');

  // Strip ql-cursor or unwanted meta spans
  str = str.replace(/<span class="ql-cursor">.*?<\/span>/gi, '');
  str = str.replace(/<\/?span[^>]*>/gi, '');

  // Convert HTML headings to markdown ###
  str = str.replace(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi, (match, headingContent) => {
    const cleanHeading = headingContent.replace(/<[^>]+>/g, '').trim();
    return cleanHeading ? `\n\n### ${cleanHeading}\n\n` : '';
  });

  // Convert lists
  str = str.replace(/<ul>([\s\S]*?)<\/ul>/gi, (match, listContent) => {
    return '\n' + listContent.replace(/<li>(.*?)<\/li>/gi, '- $1\n').trim() + '\n\n';
  });
  str = str.replace(/<ol>([\s\S]*?)<\/ol>/gi, (match, listContent) => {
    let idx = 1;
    return '\n' + listContent.replace(/<li>(.*?)<\/li>/gi, () => `${idx++}. $1\n`).trim() + '\n\n';
  });

  // Replace <p>...</p> blocks with double newlines
  str = str.replace(/<p[^>]*>/gi, '').replace(/<\/p>/gi, '\n\n');

  // Replace <br\s*/?> with single newline
  str = str.replace(/<br\s*\/?>/gi, '\n');

  // Clean multiple newlines
  str = str.replace(/\n{3,}/g, '\n\n');
  return str.trim();
};
