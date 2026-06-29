import type { Dictionary } from "@/i18n/types";

interface LegalPageContentProps {
  dict: Dictionary;
  type: "notice" | "privacy";
}

export function LegalPageContent({ dict, type }: LegalPageContentProps) {
  const isNotice = type === "notice";
  const title = isNotice ? dict.legal.noticeTitle : dict.legal.privacyTitle;
  const description = isNotice
    ? dict.legal.noticeDescription
    : dict.legal.privacyDescription;
  const sections = isNotice
    ? dict.legal.noticeSections
    : dict.legal.privacySections;

  return (
    <div className="circuit-bg min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="animate-fade-in-up">
          <h1 className="text-3xl font-bold text-tamrix-text sm:text-4xl">{title}</h1>
          <p className="mt-3 text-lg text-tamrix-muted">{description}</p>
        </div>

        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <section key={section.title} className="card p-6 animate-fade-in-up">
              <h2 className="text-lg font-bold text-brand-300">{section.title}</h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-tamrix-muted">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
