/** Resolve public assets for both root hosting and GitHub Pages project URLs. */
export function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}
