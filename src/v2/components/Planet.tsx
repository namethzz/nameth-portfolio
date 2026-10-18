import { getPlanet, planetStyle } from "@/src/v2/content/planets";

/**
 * A project's planet, drawn in CSS: a lit sphere with a slowly turning surface
 * texture and an optional ring. Purely decorative.
 */
export default function Planet({ number, className = "" }: { number: string; className?: string }) {
  const planet = getPlanet(number);
  return (
    <span
      className={`v2-planet v2-planet-${planet.pattern}${planet.ring ? " has-ring" : ""} ${className}`}
      style={planetStyle(number)}
      aria-hidden="true"
    >
      {planet.ring && <span className="v2-planet-ring v2-planet-ring-back" />}
      <span className="v2-planet-body">
        <span className="v2-planet-surface" />
        <span className="v2-planet-shade" />
      </span>
      {planet.ring && <span className="v2-planet-ring v2-planet-ring-front" />}
    </span>
  );
}
