export const sanitizeAndFormatHtml = (input) => {
  if (!input || typeof input !== 'string') return '';
  let html = input;

  // 1. Remove editor cursor artifacts only (preserve styled spans for text colors & highlights)
  html = html.replace(/<span class="ql-cursor">.*?<\/span>/gi, '');

  // 2. Convert markdown to HTML tags if markdown syntax exists
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/(^|[^\*])\*(?!\*)(.+?)\*(?!\*)/g, '$1<em>$2</em>');
  html = html.replace(/~~(.+?)~~/g, '<del>$1</del>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // 3. Ensure links have proper color, normal font-weight (never forced bold) and security attributes
  html = html.replace(/(<a\s+[^>]*?style=["'][^"']*?)font-weight\s*:\s*(?:700|800|bold)\s*;?/gi, '$1');
  html = html.replace(/<a\s+[^>]*?href=["']?([^"'\s>]+)["']?[^>]*>/gi, (match, href) => {
    const isWineraOrRelative = href.startsWith('/') || href.startsWith('#') || href.includes('winera.in');
    const targetAttr = isWineraOrRelative ? '' : ' target="_blank" rel="noopener noreferrer"';
    return `<a href="${href}" style="color: #0284c7; font-weight: normal; text-decoration: underline;"${targetAttr}>`;
  });

  // 4. Clean table spacing: remove text-align justify (which causes huge gaps between words) and normalize multiple spaces
  if (html.includes('<table')) {
    html = html.replace(/<table[\s\S]*?<\/table>/gi, (tableHtml) => {
      let cleaned = tableHtml
        .replace(/text-align\s*:\s*justify\s*;?/gi, '')
        .replace(/\bql-align-justify\b/gi, '')
        .replace(/(?:&nbsp;|\u00a0){2,}/gi, ' ');
      // Normalize runs of spaces inside table cell content
      cleaned = cleaned.replace(/(<t[dh][^>]*>)([\s\S]*?)(<\/t[dh]>)/gi, (m, open, body, close) => {
        const normalizedBody = body
          .replace(/[ \t]{2,}/g, ' ')
          .replace(/<p[^>]*class=["'][^"']*ql-align-justify[^"']*["'][^>]*>/gi, '<p>')
          .replace(/<p\s+style=["'][^"']*text-align\s*:\s*justify[^"']*["'][^>]*>/gi, '<p>');
        return `${open}${normalizedBody}${close}`;
      });
      return cleaned;
    });
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
