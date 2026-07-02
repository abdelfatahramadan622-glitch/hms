export interface Breadcrumb {
  label: string;
  path?: string;
  icon?: string;
  isActive: boolean;
}

export function createBreadcrumb(
  label: string,
  path?: string,
  icon?: string
): Breadcrumb {
  return { label, path, icon, isActive: !path };
}

export function buildBreadcrumbs(
  items: Array<{ label: string; path?: string; icon?: string }>
): Breadcrumb[] {
  return items.map((item, index) => ({
    ...item,
    isActive: index === items.length - 1,
  }));
}