/**
 * Utility to calculate read time and word count from HTML or plain text.
 * Standard industry formula: Average adult reading speed is 200 words per minute.
 */

export const getWordCount = (htmlOrText) => {
  if (!htmlOrText || typeof htmlOrText !== 'string') return 0;
  const clean = htmlOrText
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");
  const words = clean.trim().split(/\s+/).filter(Boolean);
  return words.length;
};

export const calculateReadTime = (htmlOrText) => {
  const count = getWordCount(htmlOrText);
  if (count === 0) return '1 min read';
  // 200 words per minute, min 1 min read
  const minutes = Math.max(1, Math.ceil(count / 200));
  return `${minutes} min read`;
};
