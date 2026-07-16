import { ImageResponse } from "next/og";

export const alt = "Biz2Lab PLAY - 오늘 뭐 볼까";
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
          background: "#fff9f1",
          color: "#1f1b2d",
          padding: "72px",
          border: "24px solid #ff7a59",
        }}
      >
        <div style={{ fontSize: 54, fontWeight: 800 }}>Biz2Lab PLAY</div>
        <div style={{ marginTop: 24, maxWidth: 820, fontSize: 42, lineHeight: 1.25, fontWeight: 700 }}>
          오늘 뭐 볼지, 이제 오래 고민하지 마세요
        </div>
        <div style={{ marginTop: 28, fontSize: 24, color: "#675f72" }}>
          영화 추천 · 결말 해석 · OTT 생활
        </div>
      </div>
    ),
    size,
  );
}
