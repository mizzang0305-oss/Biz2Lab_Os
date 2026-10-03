import Link from "next/link";
export default function NotFound(){return <div className="mx-auto max-w-3xl px-5 py-16"><p>404</p><h1 className="my-4 text-2xl font-bold">페이지를 찾을 수 없어요</h1><p>현재 공개된 용돈벌이와 부업 정보를 확인해 주세요.</p><Link href="/" className="mt-6 inline-flex min-h-12 items-center underline">정보 목록으로 돌아가기</Link></div>;}
