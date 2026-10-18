/**
 * Query-based routing so direct project links also work on static hosts.
 * A clean path-based router can replace this when Railway rewrites are configured.
 */
export const homePath = import.meta.env.BASE_URL;

export const projectSlugs = ["thai-tay", "economic-crops-chat", "otw-shop", "airclean", "kickhub"] as const;
export type ProjectSlug = typeof projectSlugs[number];

export function getProjectIndex(): number {
  const value = new URLSearchParams(window.location.search).get("project");
  return projectSlugs.findIndex((slug) => slug === value);
}

export function projectHref(index: number): string {
  const slug = projectSlugs[index];
  return slug ? homePath + "?project=" + encodeURIComponent(slug) : homePath;
}

export function sectionHref(section: "home" | "work" | "about" | "skills" | "contact"): string {
  return homePath + "#" + section;
}
