import Link from "next/link";

export default function HealthNotFound() {
  return (
    <div className="onurim-not-found">
      <p className="onurim-eyebrow">404 · 오누림 Preview</p>
      <h1>아직 준비되지 않은 안내입니다</h1>
      <p>이번 파일럿에서는 고혈압과 제2형 당뇨병 안내만 열려 있습니다.</p>
      <Link href="/health">오누림 홈으로 돌아가기</Link>
    </div>
  );
}
