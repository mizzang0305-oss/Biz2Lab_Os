import { ImageResponse } from "next/og";

export const alt = "Biz2Lab - B2B 유통 현장 시스템 구축 기록";
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
        <div style={{ fontSize: 54, fontWeight: 800 }}>Biz2Lab</div>
        <div style={{ marginTop: 24, maxWidth: 820, fontSize: 42, lineHeight: 1.25, fontWeight: 700 }}>
          주문·미수금·물류를 시스템으로 바꾼 기록
        </div>
        <div style={{ marginTop: 28, fontSize: 24, color: "#675f72" }}>
          구현 화면 · 운영 기준 · 검증 범위
        </div>
      </div>
    ),
    size,
  );
}
