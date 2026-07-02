export function buildPath(...segments: (string | number)[]): string {
  return segments.map((s) => String(s).replace(/^\/|\/$/g, '')).join('/');
}

export function withQueryParams(path: string, params: Record<string, string | number | boolean>): string {
  const query = Object.entries(params)
    .filter(([, v]) => v !== null && v !== undefined && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join('&');
  return query ? `${path}?${query}` : path;
}

export function getRouteParam(url: string, paramName: string): string | null {
  const match = url.match(new RegExp(`[?&]${paramName}=([^&]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function isActiveRoute(currentUrl: string, targetPath: string): boolean {
  return currentUrl === targetPath || currentUrl.startsWith(`${targetPath}/`);
}