import { ImageResponse } from "next/og";

export const alt = "Biz2Lab Services - MyBiz, 홈페이지 제작, MINZ MIND";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 76, background: "#f7faf9", color: "#0f172a", border: "22px solid #0f766e" }}>
      <div style={{ fontSize: 32, fontWeight: 700, color: "#0f766e" }}>Biz2Lab Services</div>
      <div style={{ marginTop: 30, display: "flex", flexDirection: "column", fontSize: 66, fontWeight: 800, lineHeight: 1.1 }}><span>사업의 다음 행동을 만드는</span><span>세 가지 서비스</span></div>
      <div style={{ marginTop: 38, fontSize: 27, color: "#475569" }}>MyBiz · 홈페이지 제작 · MINZ MIND</div>
    </div>,
    size,
  );
}
