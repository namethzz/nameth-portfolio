/**
 * Query-based preview routing so direct project links also work on static hosts.
 * A clean path-based router can replace this when Railway rewrites are configured.
 */
export const previewPath = import.meta.env.BASE_URL + "preview-v2.html";

export const projectSlugs = ["thai-tay", "economic-crops-chat", "otw-shop"] as const;
export type ProjectSlug = typeof projectSlugs[number];

export function getProjectIndex(): number {
  const value = new URLSearchParams(window.location.search).get("project");
  return projectSlugs.findIndex((slug) => slug === value);
}

export function projectHref(index: number): string {
  const slug = projectSlugs[index];
  return slug ? previewPath + "?project=" + encodeURIComponent(slug) : previewPath;
}

export function sectionHref(section: "home" | "work" | "about" | "skills" | "contact"): string {
  return previewPath + "#" + section;
}
