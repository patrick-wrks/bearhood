import type { LegalDocumentContent } from "@/lib/legal/types";

type LegalDocumentProps = {
  content: LegalDocumentContent;
};

export function LegalDocument({ content }: LegalDocumentProps) {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <header className="mb-10 space-y-4 border-b border-border/80 pb-10">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{content.title}</h1>
        {content.intro ? (
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">{content.intro}</p>
        ) : null}
      </header>

      <div className="space-y-10">
        {content.sections.map((section) => (
          <section key={section.heading} className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">{section.heading}</h2>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              {section.paragraphs.map((p, i) => (
                <p key={`${section.heading}-${i}`} className="whitespace-pre-line">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
