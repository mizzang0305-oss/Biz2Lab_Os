import { ImageResponse } from "next/og";

export const alt = "즐거운 용돈벌이 - 용돈벌이와 부업 정보";
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
        <div style={{ fontSize: 54, fontWeight: 800 }}>Joyful Pocket Money</div>
        <div style={{ marginTop: 24, maxWidth: 820, fontSize: 42, lineHeight: 1.25, fontWeight: 700 }}>
          Tasks. Rewards. Conditions.
        </div>
        <div style={{ marginTop: 28, fontSize: 24, color: "#536964" }}>
          Find your next opportunity at biz2lab.com
        </div>
      </div>
    ),
    size,
  );
}
