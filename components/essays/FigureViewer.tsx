"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { EssayFigureData } from "@/lib/essays/antikythera";
import styles from "./essays.module.css";

export function FigureViewer({ figure }: { figure: EssayFigureData }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [opened, setOpened] = useState(false);
  return <>
    <button ref={trigger} type="button" className={styles.figureButton} onClick={() => { setOpened(true); dialog.current?.showModal(); }}>그림 {figure.number} 크게 보기 <span aria-hidden="true">↗</span></button>
    <dialog ref={dialog} className={styles.figureDialog} aria-label={`그림 ${figure.number} 확대`} onClose={() => { setOpened(false); trigger.current?.focus(); }} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className={styles.dialogTop}><p>원본 도판 · 그림 {figure.number}</p><button type="button" autoFocus onClick={() => dialog.current?.close()}>닫기 ×</button></div>
      {opened && <Image src={figure.src} alt={figure.alt} width={figure.width} height={figure.height} unoptimized className={styles.enlargedFigure} />}
      <p className={styles.credit}>{figure.description}<br />Freeth 외 (2021) · Tony Freeth · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0 (새 창)</a> · 확대 화면은 원본 파일을 사용합니다.</p>
    </dialog>
  </>;
}
