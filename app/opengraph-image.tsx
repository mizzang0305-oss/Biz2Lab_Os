import { ImageResponse } from "next/og";

export const alt = "오누림 - 질환을 쉽게 이해하고 필요한 도움을 찾는 건강 안내서";
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
          color: "#18332f",
          padding: "72px",
          border: "24px solid #6fc3a8",
        }}
      >
        <div style={{ fontSize: 54, fontWeight: 800 }}>오누림 · ONURIM</div>
        <div style={{ marginTop: 24, maxWidth: 820, fontSize: 42, lineHeight: 1.25, fontWeight: 700 }}>
          어려운 질환을 쉬운 말과 그림으로 이해하는 건강 안내서
        </div>
        <div style={{ marginTop: 28, fontSize: 24, color: "#536964" }}>
          이해 · 기록 · 진료 질문 · 필요한 도움
        </div>
      </div>
    ),
    size,
  );
}
