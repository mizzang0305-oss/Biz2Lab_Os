import type { PostFrontmatter } from "@/lib/schema";

export function FAQBox({ faq }: { faq?: PostFrontmatter["faq"] }) {
  if (!faq?.length) {
    return null;
  }

  return (
    <section className="min-w-0 max-w-full rounded-md border border-slate-200 bg-white p-4 sm:p-5">
      <h2 className="text-xl font-semibold tracking-normal text-slate-950">자주 묻는 질문</h2>
      <div className="mt-4 grid gap-3">
        {faq.map((item) => (
          <div key={item.question} className="min-w-0 border-t border-slate-100 pt-3 first:border-t-0 first:pt-0">
            <h3 className="font-semibold text-slate-950">{item.question}</h3>
            <p className="mt-1 leading-7 text-slate-600">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
