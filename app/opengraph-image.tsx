import { ImageResponse } from "next/og";

export const alt = "Biz2Lab 지식 에세이 — 과학·기술·역사를 원자료로 읽는 이야기";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#fffdf8",
          color: "#30266e",
          padding: "72px",
          border: "24px solid #5142c9",
        }}
      >
        <div style={{ fontSize: 54, fontWeight: 800 }}>Biz2Lab</div>
        <div style={{ marginTop: 24, maxWidth: 820, fontSize: 42, lineHeight: 1.25, fontWeight: 700 }}>
          Science. Technology. History.
        </div>
        <div style={{ marginTop: 28, fontSize: 24, color: "#536964" }}>
          Questions, evidence and stories at biz2lab.com
        </div>
      </div>
    ),
    size,
  );
}
