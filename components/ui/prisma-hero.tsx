"use client";

import { assetUrl } from "@/lib/assets";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Button } from "@/components/ui/button";

/* 21st.dev Prisma Hero: the supplied animation helpers, cinematic background,
   inset navigation and oversized title, adapted with reusable portfolio props. */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: CSSProperties;
}

export const WordsPullUp = ({ text, className = "", showAsterisk = false, style }: WordsPullUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const reducedMotion = useReducedMotion();
  const words = text.trim().split(/\s+/);
  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={`${word}-${i}`}
            initial={reducedMotion ? false : { y: 20, opacity: 0 }}
            animate={isInView || reducedMotion ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative inline-block"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && <span className="word-asterisk" aria-hidden="true">*</span>}
          </motion.span>
        );
      })}
    </span>
  );
};

interface Segment { text: string; className?: string; }
interface WordsPullUpMultiStyleProps { segments: Segment[]; className?: string; style?: CSSProperties; }

export const WordsPullUpMultiStyle = ({ segments, className = "", style }: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const reducedMotion = useReducedMotion();
  const words = segments.flatMap((segment) => segment.text.split(/\s+/).filter(Boolean).map((word) => ({ word, className: segment.className })));
  return (
    <span ref={ref} className={`inline-flex flex-wrap justify-center ${className}`} style={style}>
      {words.map((word, i) => (
        <motion.span key={`${word.word}-${i}`}
          initial={reducedMotion ? false : { y: 20, opacity: 0 }}
          animate={isInView || reducedMotion ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block ${word.className ?? ""}`}
          style={{ marginRight: i === words.length - 1 ? 0 : "0.25em" }}>
          {word.word}
        </motion.span>
      ))}
    </span>
  );
};

export interface HeroNavItem { label: string; href: string; }
export interface PrismaHeroProps {
  title?: string;
  description?: string;
  role?: string;
  location?: string;
  monogram?: string;
  availability?: string;
  navItems?: HeroNavItem[];
  ctaLabel?: string;
  ctaHref?: string;
  videoSrc?: string;
  poster?: string;
}

const defaultNavItems: HeroNavItem[] = [
  { label: "Our story", href: "#about" }, { label: "Collective", href: "#skills" },
  { label: "Work", href: "#work" }, { label: "Inquiries", href: "#contact" },
];

export const PrismaHero = ({
  title = "Prisma", description = "Prisma is a worldwide network of visual artists, filmmakers and storytellers bound by passion and hunger to unlock potential through our unique perspectives.",
  role = "A collective of unique perspectives", location = "Worldwide", monogram = "p.",
  availability = "Independent, together", navItems = defaultNavItems,
  ctaLabel = "Join the lab", ctaHref = "#contact",
  videoSrc = assetUrl("assets/prisma-landscape.mp4"), poster = assetUrl("assets/hero-canyon.jpg"),
}: PrismaHeroProps) => {
  const reducedMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState("");
  useEffect(() => {
    const visibleSections = new Map<string, number>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleSections.set(entry.target.id, entry.intersectionRatio);
        else visibleSections.delete(entry.target.id);
      });
      const visible = [...visibleSections.entries()].sort((a, b) => b[1] - a[1]);
      setActiveSection(visible[0]?.[0] ?? "");
    }, { rootMargin: "-20% 0px -55% 0px", threshold: [0, .15, .4] });
    navItems.forEach((item) => { const element = document.getElementById(item.href.slice(1)); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, [navItems]);
  return (
    <section className="hero" id="home" aria-label="Introduction">
      <nav className="main-nav" aria-label="Main navigation">
        <div className="nav-inner">
          {navItems.map((item) => <a key={item.href} href={item.href} className={`nav-link ${activeSection === item.href.slice(1) ? "active" : ""}`} aria-current={activeSection === item.href.slice(1) ? "location" : undefined}>{item.label}</a>)}
        </div>
      </nav>
      <div className="hero-frame">
        <img className="hero-image" src={poster} alt="" fetchPriority="high" />
        {videoSrc && !reducedMotion && <video autoPlay loop muted playsInline preload="none" aria-hidden="true" className="hero-video" src={videoSrc} poster={poster} />}
        <div className="hero-shade" />
        <div className="noise-overlay" />
        <a href="#home" className="wordmark" aria-label="Back to introduction">{monogram}</a>
        <div className="hero-availability"><span className="availability-mark" />{availability}</div>
        <div className="hero-content">
          <div className="hero-title-block">
            <div className="hero-role"><span>{role}</span><span>/</span><span>{location}</span></div>
            <h1 className="hero-name"><WordsPullUp text={title} showAsterisk /></h1>
          </div>
          <div className="hero-copy">
            <motion.p initial={reducedMotion ? false : { y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .8, delay: .35, ease: [.16, 1, .3, 1] }}>{description}</motion.p>
            <motion.div initial={reducedMotion ? false : { y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .8, delay: .5, ease: [.16, 1, .3, 1] }}>
              <Button asChild className="hero-cta"><a href={ctaHref}>{ctaLabel}<span className="cta-icon"><ArrowRight size={18} aria-hidden="true" /></span></a></Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
