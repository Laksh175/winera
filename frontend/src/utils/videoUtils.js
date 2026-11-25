/**
 * Video URL Validation and Extraction Utilities
 * 
 * Ensures that buttons like "Watch Video" are only displayed when a genuine,
 * playable video URL (YouTube, Vimeo, or direct MP4/WebM) is configured.
 * Filters out empty values, bare domains (e.g. 'https://youtube.com'), WhatsApp links, etc.
 */

/**
 * Checks whether a given string is a valid, playable video URL.
 * @param {string} url - The video URL to validate
 * @returns {boolean} True if url is a valid video link, false otherwise
 */
export function isValidVideoUrl(url) {
  if (!url || typeof url !== 'string') return false;
  const clean = url.trim();
  if (!clean || clean === '#' || clean.toLowerCase() === 'about:blank') return false;

  const lower = clean.toLowerCase();

  // Exclude placeholder domain-only URLs with no specific video ID
  const invalidPlaceholders = [
    'https://youtube.com',
    'https://www.youtube.com',
    'http://youtube.com',
    'http://www.youtube.com',
    'https://youtube.com/',
    'https://www.youtube.com/',
    'http://youtube.com/',
    'http://www.youtube.com/',
    'https://youtu.be',
    'https://youtu.be/',
    'http://youtu.be',
    'http://youtu.be/',
    'youtube.com',
    'www.youtube.com',
    'https://vimeo.com',
    'https://vimeo.com/',
    'https://google.com',
    'https://www.google.com'
  ];
  if (invalidPlaceholders.includes(lower)) return false;

  // Exclude WhatsApp / social / internal links
  if (
    lower.includes('wa.me') ||
    lower.includes('whatsapp.com') ||
    lower.includes('instagram.com') ||
    lower.includes('facebook.com') ||
    lower.includes('mailto:') ||
    lower.includes('tel:')
  ) {
    return false;
  }

  // Direct playable video files
  if (clean.match(/\.(mp4|webm|ogg)($|\?)/i)) return true;

  // YouTube standard, embed, shorts, or youtu.be link with valid video ID (11 chars)
  const ytReg = /(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/))([^"&?\/\s]{11})/i;
  const ytMatch = clean.match(ytReg);
  if (ytMatch && ytMatch[1] && ytMatch[1].length === 11) {
    return true;
  }

  // YouTube embed links
  if (clean.includes('youtube.com/embed/') || clean.includes('youtube-nocookie.com/embed/')) {
    return true;
  }

  // Vimeo with video ID
  if (/vimeo\.com\/(?:video\/)?\d+/i.test(clean)) {
    return true;
  }

  return false;
}

/**
 * Extracts embed info for supported video players.
 * Returns null if the URL is not a valid video.
 * @param {string} url - The video URL
 * @returns {{ type: 'youtube' | 'direct' | 'vimeo', embedUrl?: string, url?: string } | null}
 */
export function getVideoEmbedInfo(url) {
  if (!isValidVideoUrl(url)) return null;

  const clean = url.trim();

  // Direct video file
  if (clean.match(/\.(mp4|webm|ogg)($|\?)/i)) {
    return { type: 'direct', url: clean };
  }

  // YouTube video extraction
  const ytReg = /(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/))([^"&?\/\s]{11})/i;
  const ytMatch = clean.match(ytReg);
  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1&enablejsapi=1`
    };
  }

  // YouTube embed link
  if (clean.includes('youtube.com/embed/') || clean.includes('youtube-nocookie.com/embed/')) {
    const separator = clean.includes('?') ? '&' : '?';
    return {
      type: 'youtube',
      embedUrl: `${clean}${separator}autoplay=1&rel=0&modestbranding=1&controls=1`
    };
  }

  // Vimeo
  const vimeoMatch = clean.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`
    };
  }

  return null;
}

