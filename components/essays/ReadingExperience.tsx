"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./essays.module.css";

const defaultChapters = [
  ["wreck", "바다에서 나온 조각"], ["gears", "톱니가 하는 계산"],
  ["inside", "보이지 않던 안쪽"], ["model", "2021년의 제안"],
  ["unknown", "아직 남은 빈칸"], ["today", "오늘의 질문"], ["sources", "원자료와 영상"],
] as const;

export function ReadingExperience({ chapters = defaultChapters }: { chapters?: readonly (readonly [string, string])[] } = {}) {
  const [active, setActive] = useState<string>("");
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;
    const sections = chapters.map(([id]) => document.getElementById(id)).filter((s): s is HTMLElement => !!s);
    const figures = [...article.querySelectorAll<HTMLElement>("[data-essay-figure]")];
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let offsets: number[] = [];
    let start = 0;
    let finish = 1;
    const measure = () => {
      offsets = sections.map(s => s.getBoundingClientRect().top + window.scrollY);
      start = article.getBoundingClientRect().top + window.scrollY;
      finish = start + article.offsetHeight - window.innerHeight;
    };
    const update = () => {
      frame = 0;
      const progress = Math.max(0, Math.min(1, (window.scrollY - start) / Math.max(1, finish - start)));
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
      const index = offsets.findLastIndex(top => top <= window.scrollY + window.innerHeight * .3);
      setActive(index < 0 ? "" : sections[index].id);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const reveal = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        (entry.target as HTMLElement).dataset.reveal = "ready";
        reveal.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -30px 0px", threshold: .02 });
    const applyMotion = () => {
      for (const figure of figures) {
        if (motion.matches || figure.getBoundingClientRect().top < window.innerHeight) {
          figure.dataset.reveal = "ready";
          reveal.unobserve(figure);
        } else if (figure.dataset.reveal !== "ready") {
          figure.dataset.reveal = "waiting";
          reveal.observe(figure);
        }
      }
    };
    const resize = new ResizeObserver(() => { measure(); schedule(); });
    resize.observe(article);
    measure(); update(); applyMotion();
    window.addEventListener("scroll", schedule, { passive: true });
    motion.addEventListener("change", applyMotion);
    return () => {
      cancelAnimationFrame(frame); resize.disconnect(); reveal.disconnect();
      window.removeEventListener("scroll", schedule); motion.removeEventListener("change", applyMotion);
      figures.forEach(f => { delete f.dataset.reveal; });
    };
  }, [chapters]);
  const label = chapters.find(([id]) => id === active)?.[1];
  return <>
    <div className={styles.progressTrack} aria-hidden="true"><div ref={bar} className={styles.progressBar} /></div>
    <details className={styles.readingMap}><summary>이야기의 길 따라 <span className={styles.currentChapter}>{label ? `지금 · ${label}` : `${chapters.length}개의 장면`}</span></summary>
      <nav aria-label="본문 목차">{chapters.map(([id, title]) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={event => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const section = document.getElementById(id);
        if (!section) return;
        event.preventDefault();
        history.replaceState(null, "", `#${id}`);
        section.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
        const heading = section.querySelector<HTMLElement>("h2");
        heading?.setAttribute("tabindex", "-1"); heading?.focus({ preventScroll: true });
      }}>{title}</a>)}</nav>
    </details>
  </>;
}
