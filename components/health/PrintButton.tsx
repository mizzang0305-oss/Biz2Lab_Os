"use client";

export function PrintButton() {
  return (
    <button type="button" className="onurim-print-button" onClick={() => window.print()}>
      인쇄하기
    </button>
  );
}
