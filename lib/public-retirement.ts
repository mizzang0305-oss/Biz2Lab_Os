// Keep original content in source control while ending public delivery.
export function isRetiredPublicPath(pathname: string): boolean {
  let path = pathname;
  try { path = decodeURIComponent(path); } catch { /* malformed paths are handled by the router */ }
  return ["/health", "/images/onurim", "/social/onurim", "/pagefind"].some(prefix => path === prefix || path.startsWith(`${prefix}/`));
}

export function isRetiredImage(url: string, origin: string): boolean {
  try { return isRetiredPublicPath(new URL(url, origin).pathname); } catch { return false; }
}
