"use client";

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
import { PrismaHero, type HeroNavItem } from "@/components/ui/prisma-hero";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const navigation: HeroNavItem[] = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const projects = [
  {
    number: "01",
    name: "THAI TAY",
    subtitle: "Construction Price Intelligence",
    category: "WEB DEVELOPMENT · DATA ANALYSIS",
    description:
      "Making historical construction material prices easier to explore and understand.",
    image: assetUrl("assets/project-construction.jpg"),
    alt: "Modern concrete courtyard with architectural stairs",
    imageClass: "construction",
    status: "In progress",
    tags: ["React", "Python", "Data visualization"],
    role: "Project developer",
    repository: "https://github.com/namethzz/THAITAY",
    website: "https://namethzz.github.io/THAITAY/#overview",
    details: [
      "Developing a React interface for exploring and comparing historical construction material prices.",
      "Collecting and preparing price data for structural materials, including checking missing values and material identities.",
      "Building workflows for material selection and trend visualization, with a focus on clear, usable interfaces.",
    ],
    tools: ["React", "JavaScript", "CSS", "Python", "Pandas", "Git / GitHub"],
    note: "Current focus: individual structural material prices. Machine learning forecasts for the next 1–3 months are in development. BOQ integration is a possible later extension.",
  },
  {
    number: "02",
    name: "Economic Crops Chat",
    subtitle: "An agricultural data advisory chatbot",
    category: "DATA PREPARATION · RAG",
    description:
      "Structuring agricultural knowledge to support location-based crop recommendations.",
    image: assetUrl("assets/project-crops.jpg"),
    alt: "Aerial view of green agricultural fields and long tree shadows",
    imageClass: "crops",
    status: "Team project",
    tags: ["Data cleaning", "ChromaDB", "RAG"],
    role: "Data collector & data analyst",
    repository: "https://github.com/namethzz/chatbot-project",
    details: [
      "Collected Agri-Map information on soil conditions, suitable planting areas and pest management for 11 economic crops across Thailand.",
      "Cleaned and structured raw data for embedding in a ChromaDB vector database used by a retrieval-augmented generation system.",
      "Organized information by province and district to support location-based crop recommendations.",
      "Contributed to frontend and backend tasks with React, Node.js and MongoDB as part of the development team.",
    ],
    tools: ["Data preprocessing", "ChromaDB", "React", "Node.js", "MongoDB"],
    note: "My primary contribution was collecting and preparing the agricultural data. The chatbot was developed as a team project.",
  },
  {
    number: "03",
    name: "OTW.SHOP",
    subtitle: "A supplement store built with C#",
    category: "C# DEVELOPMENT · E-COMMERCE",
    description:
      "A supplement shopping experience, from product discovery and a shopping cart to order management and store administration.",
    image: assetUrl("assets/project-ecommerce.jpg"),
    alt: "An athlete drinking from a shaker after a workout, the hero image used in OTW.SHOP",
    imageClass: "ecommerce",
    status: "C# project",
    tags: ["C#", "ASP.NET Core MVC", "MySQL"],
    role: "Web developer",
    repository: "https://github.com/namethzz/OTW",
    details: [
      "Built a server-rendered storefront with Razor and Bootstrap, including product search, category filters and price sorting.",
      "Implemented a session-based shopping cart, checkout, order history and promotion validation.",
      "Connected product, customer and order data using Entity Framework Core and MySQL.",
      "Developed admin pages for managing products, stock, order statuses, promotions and return requests.",
      "Added product reviews and customer return requests linked to their orders.",
    ],
    tools: [
      "C#",
      "ASP.NET Core MVC",
      "Razor",
      "Entity Framework Core",
      "MySQL",
      "Bootstrap",
      "JavaScript",
    ],
    note: "A supplement store web project covering both the customer storefront and store administration.",
  },
];

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

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
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
            aria-label={`Explore ${project.name}`}
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
              Visit website
              <ArrowRight aria-hidden="true" />
            </a>
          )}
          {isFeatured && (
            <DialogTrigger asChild>
              <button className="text-link project-detail-link">
                Explore project
                <ArrowRight aria-hidden="true" />
              </button>
            </DialogTrigger>
          )}
        </div>
        <DialogContent
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
            <p className="detail-kicker">Selected project / {project.number}</p>
            <DialogTitle className="detail-title">{project.name}</DialogTitle>
            <DialogDescription className="detail-subtitle">
              {project.subtitle}
            </DialogDescription>
          </DialogHeader>
          <div className="detail-role">
            <strong>My role:</strong> {project.role}
          </div>
          <div className="detail-block">
            <h3>What I worked on</h3>
            <ul>
              {project.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
          <div className="detail-block">
            <h3>Tools & technologies</h3>
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
                Visit website
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
                View source on GitHub
              </a>
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </article>
  );
}

export default function Portfolio() {
  return (
    <>
      <a href="#work" className="skip-link">
        Skip to selected work
      </a>
      <main className="site-shell">
        <PrismaHero
          title="Nameth"
          monogram="nw."
          role="Developer + data enthusiast"
          location="Thailand"
          description="Connecting the dots between data and development. I build thoughtful web experiences and turn raw information into something useful."
          availability="Open for internships"
          navItems={navigation}
          ctaLabel="Explore my work"
          ctaHref="#work"
        />
        <div className="hero-meta">
          <span>BASED IN PATHUM THANI, THAILAND</span>
          <a href="#work">
            SCROLL TO EXPLORE <ArrowDown aria-hidden="true" />
          </a>
          <span className="meta-year">PORTFOLIO / 2026</span>
        </div>

        <section
          id="work"
          className="work-section"
          aria-labelledby="work-heading"
        >
          <Reveal>
            <Kicker>
              Selected work / {String(projects.length).padStart(2, "0")}
            </Kicker>
            <div className="section-heading-row">
              <h2 id="work-heading">Built with purpose.</h2>
              <p>
                A mix of web development and data projects. Learning by making
                things that solve real problems.
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
            <span>Always learning. Always building.</span>
            <a
              href="https://github.com/namethzz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              <Github aria-hidden="true" />
              More on GitHub
            </a>
          </div>
        </section>

        <section
          id="about"
          className="about-section"
          aria-labelledby="about-heading"
        >
          <Reveal>
            <Kicker>A little about me</Kicker>
            <h2 className="about-heading" id="about-heading">
              A curious mind.
              <br />
              <em>A practical approach.</em>
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
                <span>ณเมธ วงค์มงคล · Thailand</span>
              </div>
            </div>
          </Reveal>
          <Reveal className="about-copy" delay={0.1}>
            <p>
              I’m a Computer Science and Software Development student who enjoys
              working where code meets data.
            </p>
            <p>
              From collecting and cleaning datasets to building React interfaces
              and a C# e-commerce application, I like understanding how the
              pieces connect. My projects help me put that curiosity into
              practice.
            </p>
            <p>
              I’m looking for an internship where I can contribute, learn from a
              team, and keep growing in web development and data analysis.
            </p>
            <div className="education-line">
              <GraduationCap aria-hidden="true" />
              <div>
                <p>B.Sc. Computer Science & Software Development</p>
                <span>Sripatum University · 2023–Present</span>
                <span>GPAX 3.79 / 4.00 · 6 semesters</span>
              </div>
            </div>
            <Button asChild variant="outline" className="resume-button">
              <a
                href={assetUrl("assets/nameth-resume.png")}
                download="Nameth-Wongmongkol-Resume.png"
              >
                <Download aria-hidden="true" />
                Download résumé<span className="sr-only"> (PNG)</span>
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
            <Kicker>Capabilities</Kicker>
            <div className="section-heading-row">
              <h2 className="skills-heading" id="skills-heading">
                My growing toolkit.
              </h2>
              <p>The tools I use to move from an idea to a working solution.</p>
            </div>
          </Reveal>
          <div className="skills-grid">
            <Reveal className="skill-group">
              <Code2 aria-hidden="true" />
              <h3>Web development</h3>
              <p>
                Building React interfaces and C# web applications with ASP.NET
                Core MVC and database-backed features.
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
              <h3>Data & analysis</h3>
              <p>
                Collecting, cleaning and organizing data, with basic exploratory
                analysis and visualization.
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
              <h3>Tools & databases</h3>
              <p>
                Working with version control, relational databases and tools for
                connected data workflows.
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
            Currently learning Microsoft Excel for data analysis.
          </p>
        </section>

        <section
          id="contact"
          className="contact-section"
          aria-labelledby="contact-heading"
        >
          <Reveal>
            <Kicker>Let’s connect</Kicker>
            <div className="contact-heading-row">
              <h2 id="contact-heading">
                Good things start<span>with a hello.</span>
              </h2>
              <div className="contact-intro">
                <p>
                  Have an internship opportunity or a project in mind? I’d love
                  to hear about it.
                </p>
                <Button asChild className="contact-cta">
                  <a href="mailto:nameth.won@spumail.net">
                    <Mail aria-hidden="true" />
                    Say hello
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
              Made with curiosity in Thailand.
            </span>
            <a href="#home" className="text-link">
              Back to top
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
