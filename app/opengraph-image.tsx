import { ImageResponse } from "next/og";

export const alt = "Biz2Lab";
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
          background: "#ffffff",
          color: "#0f172a",
          padding: "72px",
          border: "24px solid #0f766e",
        }}
      >
        <div style={{ fontSize: 54, fontWeight: 800 }}>Biz2Lab</div>
        <div style={{ marginTop: 24, maxWidth: 820, fontSize: 42, lineHeight: 1.25, fontWeight: 700 }}>
          AI 업무 자동화로 사업 운영을 시스템화하는 방법
        </div>
        <div style={{ marginTop: 28, fontSize: 24, color: "#475569" }}>
          현장형 AI 업무 자동화 콘텐츠 허브
        </div>
      </div>
    ),
    size,
  );
}
