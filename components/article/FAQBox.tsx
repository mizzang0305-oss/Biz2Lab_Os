import type { PostFrontmatter } from "@/lib/schema";

export function FAQBox({ faq }: { faq?: PostFrontmatter["faq"] }) {
  if (!faq?.length) {
    return null;
  }

  return (
    <section className="rounded-md border border-slate-200 bg-white p-5">
      <h2 className="text-xl font-semibold tracking-normal text-slate-950">자주 묻는 질문</h2>
      <div className="mt-4 grid gap-4">
        {faq.map((item) => (
          <div key={item.question}>
            <h3 className="font-semibold text-slate-950">{item.question}</h3>
            <p className="mt-1 leading-7 text-slate-600">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

