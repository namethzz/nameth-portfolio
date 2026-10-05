"use client";

import { useLanguage } from "@/lib/language";
import { getProjects } from "@/lib/projects";
import { assetUrl } from "@/lib/assets";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Code2,
  Database,
  Download,
  GitBranch as Github,
  GraduationCap,
  Mail,
  Plus,
  Sprout,
  Terminal,
} from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { PrismaHero } from "@/components/ui/prisma-hero";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="section-kicker">
      <span className="kicker-line" aria-hidden="true" />
      {children}
    </p>
  );
}

function ProjectCard({ project }: { project: ReturnType<typeof getProjects>[number] }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const isFeatured = project.imageClass === "ecommerce";
  return (
    <article
      className={`project-card${isFeatured ? " project-card-featured" : ""}`}
    >
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            className={`project-visual ${project.imageClass}`}
            aria-label={`${t("explore")} ${project.name}`}
          >
            <img
              src={project.image}
              alt={project.alt}
              loading="lazy"
              width="1800"
              height="1350"
            />
            <span className="project-status">{project.status}</span>
            <span className="project-hover" aria-hidden="true">
              <Plus />
            </span>
            <span className="project-photo-title">
              <small>{project.category}</small>
              {project.name}
            </span>
          </button>
        </DialogTrigger>
        <div className="project-copy">
          {isFeatured && <p className="project-eyebrow">{project.subtitle}</p>}
          <div className="project-description-row">
            <h3>{project.name}</h3>
            <span>({project.number})</span>
          </div>
          <p className="project-summary">{project.description}</p>
          <div className="project-tags">
            {project.tags.map((tag) => (
              <span className="project-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>

          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link project-detail-link"
            >
              {t("visit")} 
              <ArrowRight aria-hidden="true" />
            </a>
          )}
          <DialogTrigger asChild>
              <button className="text-link project-detail-link">
                {t("explore")} 
                <ArrowRight aria-hidden="true" />
              </button>
          </DialogTrigger>
        </div>
        <DialogContent
          closeLabel={t("close")}
          ref={dialogRef}
          className="detail-dialog sm:max-w-[650px]"
          onOpenAutoFocus={(event) => {
            event.preventDefault();

            const dialog = dialogRef.current;
            if (!dialog) return;

            dialog.scrollTop = 0;
            dialog.focus({ preventScroll: true });
          }}
        >
          <DialogHeader>
            <p className="detail-kicker">{t("selectedProject")}  {project.number}</p>
            <DialogTitle className="detail-title">{project.name}</DialogTitle>
            <DialogDescription className="detail-subtitle">
              {project.subtitle}
            </DialogDescription>
          </DialogHeader>
          <div className="detail-role">
            <strong>{t("role")} </strong> {project.role}
          </div>
          <div className="detail-block">
            <h3>{t("strengths")} </h3>
            <ul>
              {project.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
          <div className="detail-block">
            <h3>{t("tools")} </h3>
            <div className="skill-tags">
              {project.tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </div>
          <p className="detail-notice">{project.note}</p>
          {project.website && (
            <Button asChild className="detail-source">
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ArrowRight aria-hidden="true" />
                {t("visit")} 
              </a>
            </Button>
          )}
          {project.repository && (
            <Button asChild className="detail-source">
              <a
                href={project.repository}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github />
                {t("source")} 
              </a>
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </article>
  );
}

export default function Portfolio() {
  const { language, t } = useLanguage();
  const projects = getProjects(language);
  const navigation = [
    { label: t("navWork"), href: "#work" },
    { label: t("navAbout"), href: "#about" },
    { label: t("navSkills"), href: "#skills" },
    { label: t("navContact"), href: "#contact" },
  ];
  return (
    <>
      <a href="#work" className="skip-link">
        {t("skip")} 
      </a>
      <main className="site-shell">
        <PrismaHero
          title="Nameth"
          monogram="nw."
          role={t("heroRole")}
          location={t("country")}
          description={t("heroDescription")}
          availability={t("availability")}
          navItems={navigation}
          ctaLabel={t("exploreWork")}
          ctaHref="#work"
        />
        <div className="hero-meta">
          <span>{t("based")} </span>
          <a href="#work">
            {t("scroll")}  <ArrowDown aria-hidden="true" />
          </a>
          <span className="meta-year">{t("portfolio")} </span>
        </div>

        <section
          id="work"
          className="work-section"
          aria-labelledby="work-heading"
        >
          <Reveal>
            <Kicker>
              {t("selectedWork")}  {String(projects.length).padStart(2, "0")}
            </Kicker>
            <div className="section-heading-row">
              <h2 id="work-heading">{t("workTitle")} </h2>
              <p>
                {t("workIntro")} 
              </p>
            </div>
          </Reveal>
          <div className="project-grid">
            {projects.map((project, i) => (
              <Reveal
                key={project.number}
                className={
                  project.imageClass === "ecommerce" ? "project-feature" : ""
                }
                delay={i * 0.08}
              >
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
          <div className="work-footer">
            <span>{t("workFooter")} </span>
            <a
              href="https://github.com/namethzz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              <Github aria-hidden="true" />
              {t("more")} 
            </a>
          </div>
        </section>

        <section
          id="about"
          className="about-section"
          aria-labelledby="about-heading"
        >
          <Reveal>
            <Kicker>{t("aboutKicker")} </Kicker>
            <h2 className="about-heading" id="about-heading">
              {t("aboutTitle")} 
              <br />
              <em>{t("aboutEm")} </em>
            </h2>
            <div className="profile-line">
              <div className="portrait-frame">
                <img
                  src={assetUrl("assets/nameth-resume.png")}
                  alt="Nameth Wongmongkol"
                  loading="lazy"
                />
              </div>
              <div>
                <p>Nameth Wongmongkol</p>
                <span>{language === "th" ? "Nameth Wongmongkol · ประเทศไทย" : "ณเมธ วงค์มงคล · Thailand"}</span>
              </div>
            </div>
          </Reveal>
          <Reveal className="about-copy" delay={0.1}>
            <p>
              {t("about1")} 
            </p>
            <p>
              {t("about2")} 
            </p>
            <p>
              {t("about3")} 
            </p>
            <div className="education-line">
              <GraduationCap aria-hidden="true" />
              <div>
                <p>{t("degree")} </p>
                <span>{t("university")} </span>
                <span>{t("gpa")} </span>
              </div>
            </div>
            <Button asChild variant="outline" className="resume-button">
              <a
                href={assetUrl("assets/nameth-resume.png")}
                download="Nameth-Wongmongkol-Resume.png"
              >
                <Download aria-hidden="true" />
                {t("resume")} <span className="sr-only"> (PNG)</span>
              </a>
            </Button>
          </Reveal>
        </section>

        <section
          id="skills"
          className="skills-section"
          aria-labelledby="skills-heading"
        >
          <Reveal>
            <Kicker>{t("capabilities")} </Kicker>
            <div className="section-heading-row">
              <h2 className="skills-heading" id="skills-heading">
                {t("skillsTitle")} 
              </h2>
              <p>{t("skillsIntro")} </p>
            </div>
          </Reveal>
          <div className="skills-grid">
            <Reveal className="skill-group">
              <Code2 aria-hidden="true" />
              <h3>{t("web")} </h3>
              <p>
                {t("webDesc")} 
              </p>
              <div className="skill-tags">
                {[
                  "React",
                  "JavaScript",
                  "HTML / CSS",
                  "Node.js",
                  "C#",
                  "ASP.NET Core MVC",
                  "Entity Framework Core",
                ].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </Reveal>
            <Reveal className="skill-group" delay={0.06}>
              <Database aria-hidden="true" />
              <h3>{t("data")} </h3>
              <p>
                {t("dataDesc")} 
              </p>
              <div className="skill-tags">
                {["Python", "Pandas", "NumPy", "SQL", "Google Colab"].map(
                  (item) => (
                    <span key={item}>{item}</span>
                  ),
                )}
              </div>
            </Reveal>
            <Reveal className="skill-group" delay={0.12}>
              <Terminal aria-hidden="true" />
              <h3>{t("databases")} </h3>
              <p>
                {t("databaseDesc")} 
              </p>
              <div className="skill-tags">
                {[
                  "Git / GitHub",
                  "MySQL",
                  "SQL Server",
                  "MongoDB",
                  "ChromaDB",
                  "Docker",
                  "n8n",
                ].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </Reveal>
          </div>
          <p className="skill-note">
            <Sprout aria-hidden="true" />
            {t("learning")} 
          </p>
        </section>

        <section
          id="contact"
          className="contact-section"
          aria-labelledby="contact-heading"
        >
          <Reveal>
            <Kicker>{t("contactKicker")} </Kicker>
            <div className="contact-heading-row">
              <h2 id="contact-heading">
                {t("contactTitle")} <span>{t("contactEm")} </span>
              </h2>
              <div className="contact-intro">
                <p>
                  {t("contactIntro")} 
                </p>
                <Button asChild className="contact-cta">
                  <a href="mailto:nameth.won@spumail.net">
                    <Mail aria-hidden="true" />
                    {t("hello")} 
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>
          <div className="contact-links">
            <a className="text-link" href="mailto:nameth.won@spumail.net">
              nameth.won@spumail.net
            </a>
            <div>
              <a
                className="text-link"
                href="https://github.com/namethzz"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a className="text-link" href="tel:+66651545249">
                +66 65 154 5249
              </a>
            </div>
          </div>
        </section>
        <footer className="site-footer">
          <span className="footer-name">© 2026 Nameth Wongmongkol</span>
          <div>
            <span className="footer-location">
              {t("made")} 
            </span>
            <a href="#home" className="text-link">
              {t("top")} 
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
