import { createMedicalReviewCsvRows } from "@/lib/health-v3/medical-review";
import { serializeMedicalReviewCsv } from "@/lib/health-v3/review-csv";

export async function GET() {
  if (process.env.VERCEL_ENV === "production") return new Response("Not Found", { status: 404 });

  const csv = serializeMedicalReviewCsv(createMedicalReviewCsvRows());
  return new Response(`\uFEFF${csv}`, {
    headers: {
      "Cache-Control": "private, no-store, max-age=0",
      "Content-Disposition": 'attachment; filename="onurim-medical-review-47-claim-packet.csv"',
      "Content-Type": "text/csv; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}
