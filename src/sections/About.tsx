import { motion } from "framer-motion";
import { IndexTab } from "../components/IndexTab";
import { certifications } from "../data/profile";

const STACK_HIGHLIGHTS = [
  "Java",
  "SQL Server",
  "PowerShell",
  "React",
  "Jenkins",
  "SOAP UI",
  "Git",
  "OpenShift",
  "Laravel",
  "Agile / CI-CD",
];

interface AboutProps {
  about: string;
}

export function About({ about }: AboutProps) {
  const paragraphs = about.split("\n\n");
  const cert = certifications[0];

  return (
    <section id="about" className="section-padding" aria-labelledby="about-heading">
      <div className="container-wide grid grid-cols-1 lg:grid-cols-[96px_1fr_420px] gap-8 lg:gap-10 items-start">
        <IndexTab index="02" label="ABOUT" className="hidden lg:block pt-2.5" />

        <motion.div
          className="border-t border-hair pt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 id="about-heading" className="m-0 mb-7 font-semibold text-3xl sm:text-[40px] tracking-[-0.02em]">
            Software by day, valuations by night
          </h2>
          {paragraphs.map((p, i) => (
            <p key={i} className="m-0 mb-5 last:mb-0 max-w-[680px] text-[17px] leading-[1.75] text-mist" style={{ textWrap: "pretty" }}>
              {p}
            </p>
          ))}
        </motion.div>

        <motion.div
          className="border-t border-hair pt-8 font-mono text-xs text-mist2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="tracking-[0.1em] text-mist3 mb-[18px]">STACK</div>
          <div className="flex flex-wrap gap-2">
            {STACK_HIGHLIGHTS.map((tag) => (
              <span key={tag} className="border border-hair2 px-2.5 py-1.5 text-mist4">
                {tag}
              </span>
            ))}
          </div>
          {cert && (
            <>
              <div className="tracking-[0.1em] text-mist3 mt-8 mb-[18px]">CERTIFICATION</div>
              <div className="text-mist4 leading-relaxed">
                {cert.name}
                <br />
                <span className="text-mist3">
                  {cert.issuer}
                  {cert.date && ` · ${cert.date}`}
                </span>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
