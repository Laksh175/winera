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
    return `<a href="${href}" style="display: inline; color: #0284c7; font-weight: normal; text-decoration: underline;"${targetAttr}>`;
  });

  // 4. Clean text alignment and unwanted whitespace across ALL content:
  // Remove justify alignment bloat that causes uneven gaps between words
  html = html
    .replace(/text-align\s*:\s*justify\s*;?/gi, '')
    .replace(/\bql-align-justify\b/gi, '');

  // Protect <pre> and <code> blocks from whitespace manipulation
  const codeBlocks = [];
  html = html.replace(/<(pre|code)[^>]*>[\s\S]*?<\/\1>/gi, (m) => {
    codeBlocks.push(m);
    return `<!--__WINERA_CODE_BLOCK_${codeBlocks.length - 1}__-->`;
  });

  // Normalize 2 or more non-breaking spaces or consecutive whitespace into a single space
  html = html.replace(/(?:&nbsp;|\u00a0)+/gi, ' ');

  // Strip redundant boilerplate styles added by editors that interfere with spacing
  html = html
    .replace(/background-color\s*:\s*transparent\s*;?/gi, '')
    .replace(/color\s*:\s*rgb\(0,\s*0,\s*0\)\s*;?/gi, '')
    .replace(/\s*style=["']\s*["']/gi, '');

  // Unwrap standalone punctuation spans (e.g. <span style="...">,</span> -> ,)
  html = html.replace(/<span[^>]*>([,.:;!?])<\/span>/gi, '$1');

  // 1. Remove ANY empty inline tags completely (NEVER replace with a space)
  let prevHtml;
  do {
    prevHtml = html;
    html = html.replace(/<(span|strong|em|b|i|u|a)[^>]*>\s*<\/\1>/gi, '');
  } while (html !== prevHtml);

  // 2. No space before punctuation (e.g. 'companies ,', 'included .', '</span> ,', '</a> ,')
  html = html.replace(/\s+(<\/(?:span|strong|em|b|i|u|a)>)\s*([,.:;!?])/gi, '$1$2');
  html = html.replace(/(<\/(?:span|strong|em|b|i|u|a)>)\s+([,.:;!?])/gi, '$1$2');
  html = html.replace(/\s+([,.:;!?])/g, '$1');

  // 3. Move trailing spaces inside inline tags to OUTSIDE the tag (unless immediately followed by punctuation)
  html = html.replace(/([^\s>])\s+(<\/(?:span|strong|em|b|i|u|a)>)(?!\s*[,.:;!?])/gi, '$1$2 ');

  // 4. Move leading spaces inside inline tags to BEFORE the tag
  html = html.replace(/(<(?:span|strong|em|b|i|u|a)[^>]*>)\s+([^\s<])/gi, ' $1$2');

  // 5. Ensure single space after punctuation when followed by words or tags
  html = html.replace(/([,;:!?])\s*(<(?:span|strong|em|b|i|u|a)[^>]*>)\s*([^\s<])/gi, '$1 $2$3');
  html = html.replace(/([,;:!?])\s+([^\s<])/gi, '$1 $2');

  // 6. Clean spaces across adjacent inline tags
  html = html.replace(/(<\/(?:span|strong|em|b|i|u|a)>)\s+(<(?:span|strong|em|b|i|u|a)[^>]*>)\s+/gi, '$1 $2');
  html = html.replace(/\s+(<\/(?:span|strong|em|b|i|u|a)>)\s+(<(?:span|strong|em|b|i|u|a)[^>]*>)/gi, '$1 $2');

  // 7. Clean leading spaces at beginning of block elements (<p>, <h1-6>, <li>, <td>, <th>)
  html = html.replace(/(<(?:p|h[1-6]|li|td|th)[^>]*>)\s+/gi, '$1');
  html = html.replace(/(<(?:p|h[1-6]|li|td|th)[^>]*>(?:<(?:span|strong|em|b|i)[^>]*>)+)\s+/gi, '$1');
  // Clean leading spaces after <br>
  html = html.replace(/(<br\s*\/?>)\s+/gi, '$1');
  // Clean trailing spaces before closing tags of blocks
  html = html.replace(/\s+(<\/(?:p|h[1-6]|li|td|th)>)/gi, '$1');
  html = html.replace(/\s+((?:<\/(?:span|strong|em|b|i)>)+<\/(?:p|h[1-6]|li|td|th)>)/gi, '$1');

  // 8. Collapse duplicate horizontal spaces
  html = html.replace(/[ \t]{2,}/g, ' ');

  // Restore code blocks
  html = html.replace(/<!--__WINERA_CODE_BLOCK_(\d+)__-->/g, (m, idx) => codeBlocks[Number(idx)] || '');

  // 5. Clean and wrap tables in .winera-blog-table-responsive
  if (html.includes('<table')) {
    html = html.replace(/<div[^>]*class=["'][^"']*winera-blog-table-responsive[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi, '$1');
    html = html.replace(/(<table[\s\S]*?<\/table>)/gi, '<div class="winera-blog-table-responsive">$1</div>');
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
