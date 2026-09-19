/** Only a configured HTTPS origin can be used for public SEO URLs. */
export function getSiteOrigin(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password &&
      url.pathname === '/' && !url.search && !url.hash ? url.origin : '';
  } catch {
    return '';
  }
}
