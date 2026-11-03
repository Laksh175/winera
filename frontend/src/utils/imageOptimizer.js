export function optImg(url) {
  if (!url || typeof url !== 'string') return url;
  if (url.includes('track-flying-cinema-10p-standard-2')) {
    return 'https://res.cloudinary.com/achfsmlm/image/upload/v1791888603/winera_vr_games_v2/track-flying-cinema-10p-standard-2_vr.jpg';
  }
  if (url.includes('res.cloudinary.com') && url.includes('/upload/') && !url.includes('/f_auto,q_auto/')) {
    return url.replace('/upload/', '/upload/f_auto,q_auto/');
  }
  return url;
}

export function optimizeSiteDataImages(obj) {
  if (!obj || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map(item => optimizeSiteDataImages(item));
  }

  const newObj = {};
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    if (typeof val === 'string') {
      newObj[key] = optImg(val);
    } else if (typeof val === 'object' && val !== null) {
      newObj[key] = optimizeSiteDataImages(val);
    } else {
      newObj[key] = val;
    }
  }
  return newObj;
}
