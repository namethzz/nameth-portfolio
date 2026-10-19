import { ReactLenis } from "lenis/react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { SiSpacex } from "react-icons/si";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { useRef, type ReactNode } from "react";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";
import "lenis/dist/lenis.css";

/*
 * Modern hero (smooth scroll + parallax + schedule), from 21st.dev.
 * The pieces are exported so the portfolio can use them on their own:
 *   SmoothScroll  — Lenis smooth scrolling for the whole page
 *   ParallaxImg   — an image that drifts from `start` to `end` px as it
 *                   crosses the viewport, then fades and shrinks away
 *   ScheduleItem  — a row of the launch-schedule list
 * SmoothScrollHero below is the original demo composition.
 */

/** Lenis smooth scrolling for the whole page; off for reduced motion. */
export const SmoothScroll = ({ children }: { children: ReactNode }) => {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp: 0.09 }}>
      {children}
    </ReactLenis>
  );
};

export const SmoothScrollHero = () => {
  return (
    <div className="bg-zinc-950">
      <SmoothScroll>
        <Nav />
        <Hero />
        <Schedule />
      </SmoothScroll>
    </div>
  );
};

const Nav = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-3 text-white">
      <SiSpacex className="text-3xl mix-blend-difference" />
      <button
        onClick={() => {
          document.getElementById("launch-schedule")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
        className="flex items-center gap-1 text-xs text-zinc-400"
      >
        LAUNCH SCHEDULE <FiArrowRight />
      </button>
    </nav>
  );
};

const SECTION_HEIGHT = 1500;

const CENTER_IMAGE =
  "https://cdn.21st.dev/assets/mirror/3e/3ea1ee3ce8a8134c194baf880a7afabc7a43bad8d5672f7b0f74fff87344dcc4.jpg";

const Hero = () => {
  return (
    <ParallaxHero image={CENTER_IMAGE}>
      <ParallaxImages />
    </ParallaxHero>
  );
};

export type ParallaxHeroProps = {
  /** The image that opens from a centred square to the full screen. */
  image: string;
  imageAlt?: string;
  /** Scroll distance (px) the image stays pinned while it opens. */
  height?: number;
  /** Pinned on top of the image, e.g. a caption. */
  overlay?: ReactNode;
  /** Scrolls over the pinned image (the ParallaxImgs). */
  children?: ReactNode;
  className?: string;
  /** Classes for the gradient that fades the bottom into the next section. */
  fadeClassName?: string;
};

/**
 * The hero: a pinned image whose clip opens from the centre while it zooms
 * out, with `children` scrolling over it. Progress is measured against this
 * block (not the page top), so it works anywhere on a page; the block grows
 * if its children need more room than `height`.
 */
export const ParallaxHero = ({
  image,
  imageAlt = "",
  height = SECTION_HEIGHT,
  overlay,
  children,
  className,
  fadeClassName = "bg-gradient-to-b from-zinc-950/0 to-zinc-950",
}: ParallaxHeroProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Pixels scrolled into the block, and how long the image stays pinned.
  const scrolled = useTransform(scrollYProgress, (p) => p * (ref.current?.offsetHeight ?? 0));
  const pinned = () => Math.max(1, (ref.current?.offsetHeight ?? 0) - window.innerHeight);
  const progress = useTransform(scrolled, (px) => Math.min(1, px / pinned()));

  const clip1 = useTransform(progress, [0, 1], [25, 0]);
  const clip2 = useTransform(progress, [0, 1], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;
  const scale = useTransform(progress, [0, 1], [1.7, 1]);
  const opacity = useTransform(scrolled, (px) => 1 - Math.min(1, Math.max(0, (px - pinned()) / 500)));

  return (
    <div ref={ref} style={{ minHeight: `calc(${height}px + 100vh)` }} className={cn("relative w-full", className)}>
      <motion.div className="sticky top-0 h-screen w-full overflow-hidden" style={reduce ? undefined : { opacity }}>
        <motion.div className="absolute inset-0 overflow-hidden" style={reduce ? undefined : { clipPath }}>
          <motion.img
            src={image}
            alt={imageAlt}
            className="h-full w-full object-cover"
            style={reduce ? undefined : { scale }}
          />
        </motion.div>
        {overlay}
      </motion.div>

      {children}

      <div className={cn("pointer-events-none absolute bottom-0 left-0 right-0 h-96", fadeClassName)} />
    </div>
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src="https://cdn.21st.dev/assets/mirror/68/68fd4edf19855762d0020e6ddbf3fdd31b7f768a6c65014d50ec6b36ef305b54.jpg"
        alt="And example of a space launch"
        start={-200}
        end={200}
        className="w-1/3"
      />
      <ParallaxImg
        src="https://cdn.21st.dev/assets/mirror/bc/bca64f76b38b6b3e0f1c2357292903fc428e16d47b49005201be8ba51377ce8c.jpg"
        alt="An example of a space launch"
        start={200}
        end={-250}
        className="mx-auto w-2/3"
      />
      <ParallaxImg
        src="https://cdn.21st.dev/assets/mirror/04/04691b2e29925f30eac3817ea8f65d973484b711822252a13c15248859e464da.jpg"
        alt="Orbiting satellite"
        start={-200}
        end={200}
        className="ml-auto w-1/3"
      />
      <ParallaxImg
        src="https://cdn.21st.dev/assets/mirror/71/711f1a9ccb3786dcc00e8031191dc4d58c9377cefb54bf927806921a4a05a818.jpg"
        alt="Orbiting satellite"
        start={0}
        end={-500}
        className="ml-24 w-5/12"
      />
    </div>
  );
};

export type ParallaxImgProps = {
  className?: string;
  alt: string;
  src: string;
  /** Vertical offset (px) when the image enters the viewport. */
  start: number;
  /** Vertical offset (px) when it leaves. */
  end: number;
  /** Shown under the image (e.g. a project name). */
  caption?: ReactNode;
  /** Makes the image a link. */
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  /** Accessible name for the link (defaults to `alt`). */
  linkLabel?: string;
};

export const ParallaxImg = ({ className, alt, src, start, end, caption, href, onClick, linkLabel }: ParallaxImgProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.figure
      ref={ref}
      className={cn("m-0", className)}
      style={reduce ? undefined : { transform, opacity }}
    >
      {href ? (
        <a href={href} onClick={onClick} aria-label={linkLabel ?? alt} className="block">
          <img src={src} alt={alt} loading="lazy" className="block w-full" />
        </a>
      ) : (
        <img src={src} alt={alt} loading="lazy" className="block w-full" />
      )}
      {caption ? <figcaption>{caption}</figcaption> : null}
    </motion.figure>
  );
};

const Schedule = () => {
  return (
    <section
      id="launch-schedule"
      className="mx-auto max-w-5xl px-4 py-48 text-white"
    >
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-20 text-4xl font-black uppercase text-zinc-50"
      >
        Launch Schedule
      </motion.h1>
      <ScheduleItem title="NG-21" date="Dec 9th" location="Florida" />
      <ScheduleItem title="Starlink" date="Dec 20th" location="Texas" />
      <ScheduleItem title="Starlink" date="Jan 13th" location="Florida" />
      <ScheduleItem title="Turksat 6A" date="Feb 22nd" location="Florida" />
      <ScheduleItem title="NROL-186" date="Mar 1st" location="California" />
      <ScheduleItem title="GOES-U" date="Mar 8th" location="California" />
      <ScheduleItem title="ASTRA 1P" date="Apr 8th" location="Texas" />
    </section>
  );
};

export type ScheduleItemProps = {
  title: string;
  date: string;
  location: string;
  /** Icon beside the location (map pin by default). */
  icon?: IconType;
  /** Shown before the title, e.g. a small planet. */
  leading?: ReactNode;
  /** Makes the whole row a link. */
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  /** Extra content under the row (kept outside the row link). */
  details?: ReactNode;
};

export const ScheduleItem = ({ title, date, location, icon: Icon = FiMapPin, leading, href, onClick, details }: ScheduleItemProps) => {
  const reduce = useReducedMotion();
  const body = (
    <>
      <div className="flex items-center gap-4">
        {leading}
        <div>
          <p className="mb-1.5 text-xl text-zinc-50">{title}</p>
          <p className="text-sm uppercase text-zinc-500">{date}</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-end text-sm uppercase text-zinc-500">
        <p>{location}</p>
        <Icon />
      </div>
    </>
  );
  // With details the border moves to the wrapper so it sits under them.
  const rowClass = cn("flex items-center justify-between px-3", !details && "mb-9 border-b border-zinc-800 pb-9");
  return (
    <motion.div
      initial={reduce ? false : { y: 48, opacity: 0 }}
      whileInView={reduce ? undefined : { y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className={details ? "mb-9 border-b border-zinc-800 pb-9" : undefined}
    >
      {href ? (
        <a href={href} onClick={onClick} className={cn(rowClass, "group transition-colors hover:border-zinc-500")}>
          {body}
        </a>
      ) : (
        <div className={rowClass}>{body}</div>
      )}
      {details}
    </motion.div>
  );
};
