import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, GitBranch, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useLanguage } from "@/lib/language";
import type { getProjects } from "@/lib/projects";

type Project = ReturnType<typeof getProjects>[number];

export default function ProjectPreviewModal({
  project,
  open,
  onClose,
  onCaseStudy,
  returnFocus,
}: {
  project: Project | null;
  open: boolean;
  onClose: () => void;
  onCaseStudy: () => void;
  returnFocus: HTMLElement | null;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { language } = useLanguage();
  const titleId = useId();
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function requestClose() {
    if (!visible) return;
    setVisible(false);
    if (reduce) onClose();
    else closeTimer.current = setTimeout(onClose, 260);
  }

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => {
    if (!open || !project) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const originalOverflow = document.body.style.overflow;
    dialog.showModal(); // Browser-managed focus containment + Escape support.
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
      if (dialog.open) dialog.close();
      // Return focus to the original Quick Preview control when it remains mounted.
      if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
    };
  }, [open, project?.number, returnFocus]);

  // Mount the dialog before opening it to let showModal create the top layer.
  if (!project) return null;

  return (
    <dialog
      className="v2-preview-dialog"
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault();
        requestClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) requestClose();
      }}
    >
      <AnimatePresence>
        {visible && (
          <motion.div
            className="v2-preview-panel"
            initial={reduce ? false : { opacity: 0, y: 35, scale: 0.975 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 15, scale: 0.985 }}
            transition={{ duration: reduce ? 0 : visible ? 0.42 : 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="v2-preview-media">
              <img src={project.image} alt={project.alt} />
              <span className="v2-preview-index">{project.number} / 03</span>
              <button type="button" className="v2-preview-close" onClick={requestClose} aria-label={language === "th" ? "ปิดหน้าต่าง" : "Close preview"}>
                <X size={19} aria-hidden="true" />
              </button>
            </div>
            <div className="v2-preview-info">
              <p className="v2-kicker">{project.category}</p>
              <h2 id={titleId}>{project.name}</h2>
              <p className="v2-preview-description">{project.description}</p>
              <p className="v2-preview-role"><strong>{language === "th" ? "สิ่งที่ผมทำ" : "My role"}</strong> {project.role}</p>
              <div className="v2-tags">{project.tools.slice(0, 6).map((tool) => <span key={tool}>{tool}</span>)}</div>
              <div className="v2-preview-actions">
                <button type="button" className="v2-preview-case-link" onClick={onCaseStudy}>
                  {language === "th" ? "อ่านเบื้องหลังโปรเจกต์" : "Read the case study"}
                  <ArrowUpRight aria-hidden="true" size={18} />
                </button>
                <a href={project.repository} target="_blank" rel="noopener noreferrer">
                  <GitBranch aria-hidden="true" size={16} /> GitHub
                </a>
                {project.website && (
                  <a href={project.website} target="_blank" rel="noopener noreferrer">
                    {language === "th" ? "เปิดเว็บไซต์" : "Live site"} <ArrowUpRight aria-hidden="true" size={16} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>
  );
}
