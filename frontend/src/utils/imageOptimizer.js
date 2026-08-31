export function optImg(url) {
  if (!url || typeof url !== 'string') return url;
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
