import type { CSSProperties } from "react";

/**
 * Each project's planet: three surface tones, a glow and a surface pattern.
 * Keyed by project number so the list can grow or be reordered freely.
 */
export type Planet = {
  light: string;
  base: string;
  dark: string;
  glow: string;
  /** Surface texture drawn over the sphere. */
  pattern: "bands" | "dunes" | "swirl" | "stripes" | "grid";
  ring?: boolean;
};

const planets: Record<string, Planet> = {
  // THAI TAY — construction materials: copper desert crossed by price lines.
  "01": { light: "#F4B48C", base: "#B84F3A", dark: "#3A130C", glow: "rgba(232, 128, 88, .45)", pattern: "grid", ring: true },
  // Economic Crops Chat — fertile green with cloud bands.
  "02": { light: "#C8E6A0", base: "#3E8E5A", dark: "#0D2A1A", glow: "rgba(110, 196, 130, .4)", pattern: "swirl" },
  // OTW.SHOP — warm amber trade world.
  "03": { light: "#F7D58A", base: "#C98A2E", dark: "#3A2208", glow: "rgba(240, 180, 80, .4)", pattern: "dunes" },
  // AirClean — icy blue air.
  "04": { light: "#E4F6FF", base: "#5FB4DE", dark: "#0E2C44", glow: "rgba(120, 200, 245, .45)", pattern: "bands", ring: true },
  // KickHub — pitch green with field stripes.
  "05": { light: "#D9F59A", base: "#6DAA2C", dark: "#16310A", glow: "rgba(170, 230, 90, .4)", pattern: "stripes" },
};

const fallback: Planet = { light: "#C9D6EA", base: "#5B6E91", dark: "#121A2B", glow: "rgba(150, 180, 230, .35)", pattern: "bands" };

export function getPlanet(number: string): Planet {
  return planets[number] ?? fallback;
}

/** CSS custom properties consumed by the .v2-planet styles. */
export function planetStyle(number: string): CSSProperties {
  const planet = getPlanet(number);
  return {
    ["--planet-light" as string]: planet.light,
    ["--planet-base" as string]: planet.base,
    ["--planet-dark" as string]: planet.dark,
    ["--planet-glow" as string]: planet.glow,
  };
}
