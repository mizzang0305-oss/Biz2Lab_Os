import Link from "next/link";

export default function HealthNotFound() {
  return (
    <div className="onurim-not-found">
      <p className="onurim-eyebrow">404 · 오누림</p>
      <h1>이 주소에서는 건강 안내를 찾지 못했습니다</h1>
      <p>질환 이름이나 도구 주소를 다시 확인하거나 20개 질환 안내에서 찾아보세요.</p>
      <Link href="/health">오누림 홈으로 돌아가기</Link>
    </div>
  );
}
