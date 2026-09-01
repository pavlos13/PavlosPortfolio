import { IndexTab } from "../components/IndexTab";
import type { CertificationItem } from "../types";

interface CertificationsProps {
  certifications: CertificationItem[];
}

export function Certifications({ certifications }: CertificationsProps) {
  if (certifications.length === 0) return null;

  return (
    <section id="certifications" className="section-padding" aria-labelledby="certifications-heading">
      <div className="container-wide grid grid-cols-1 lg:grid-cols-[96px_1fr] gap-8 lg:gap-10">
        <IndexTab index="07" label="CERTIFICATIONS" className="hidden lg:block pt-2.5" />
        <h2 id="certifications-heading" className="sr-only">
          Certifications
        </h2>
        <div>
          {certifications.map((cert, index) => {
            const rowClass = `grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-3 sm:gap-10 border-t py-6 ${
              index === 0 ? "border-hair2" : "border-hair"
            }`;
            const body = (
              <>
                <div className="font-mono text-xs text-accent">●</div>
                <div>
                  <p className="m-0 font-semibold text-lg">{cert.name}</p>
                  <p className="mt-1.5 mb-0 font-mono text-xs uppercase text-mist2">
                    {cert.issuer}
                    {cert.date && ` · ${cert.date}`}
                  </p>
                </div>
              </>
            );
            return (
              <div key={cert.name} data-reveal data-reveal-delay={String(index * 0.08)}>
                {cert.url ? (
                  <a href={cert.url} target="_blank" rel="noopener noreferrer" className={rowClass}>
                    {body}
                  </a>
                ) : (
                  <div className={rowClass}>{body}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
