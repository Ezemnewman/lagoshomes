import Icon from "./Icon";
import { TERMS_FEE_TABLE } from "../data/termsContent";

/**
 * Renders each terms section from data, with a few sections getting
 * extra presentational treatment beyond plain paragraphs (the fee
 * table, the verification method cards, the prohibited-conduct list,
 * the pull-quote callout) — these are on-page-only embellishments,
 * not duplicated in the PDF version since they're visual, not content.
 */
export default function TermsContent({ sections }) {
  return (
    <article className="flex-1 bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-outline-variant/20 p-8 md:p-12 overflow-hidden">
      {sections.map((section, index) => (
        <section key={section.id} id={section.id} className="mb-16 scroll-mt-32 last:mb-0">
          <h2 className="font-headline-md text-headline-md text-primary mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-secondary rounded-full" />
            {index + 1}. {section.label}
          </h2>

          <div className="space-y-6 text-on-surface-variant leading-relaxed">
            {section.id === "definitions" ? (
              <>
                <p>{section.paragraphs[0]}</p>
                <ul className="space-y-4 ml-4">
                  {section.paragraphs.slice(1).map((paragraph) => {
                    const [term, ...rest] = paragraph.split('" ');
                    return (
                      <li key={paragraph} className="flex gap-4">
                        <Icon name="check_circle" className="text-primary-container shrink-0 mt-1" filled />
                        <span>
                          <strong>{term}"</strong> {rest.join('" ')}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : section.id === "user-responsibilities" ? (
              <>
                <p>{section.paragraphs[0]}</p>
                <div className="bg-surface-container-low p-6 rounded-lg border-l-4 border-secondary">
                  <p className="font-medium text-on-background italic">"{section.paragraphs[1]}"</p>
                </div>
                <p>{section.paragraphs[2]}</p>
              </>
            ) : section.id === "agent-verification" ? (
              <>
                <p>{section.paragraphs[0]}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <VerificationCard
                    icon="badge"
                    title="Identity Check"
                    description="Validation of NIN or International Passport via official government databases."
                  />
                  <VerificationCard
                    icon="domain"
                    title="Office Inspection"
                    description="Physical or digital verification of the agent's business location."
                  />
                </div>
                <p>{section.paragraphs[1]}</p>
              </>
            ) : section.id === "fees-payments" ? (
              <>
                <p>{section.paragraphs[0]}</p>
                <table className="w-full text-left border-collapse border border-outline-variant rounded-lg overflow-hidden">
                  <thead className="bg-surface-container">
                    <tr>
                      <th className="p-4 font-bold border-b border-outline-variant">Service Type</th>
                      <th className="p-4 font-bold border-b border-outline-variant text-right">Fee (₦)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TERMS_FEE_TABLE.map((row) => (
                      <tr key={row.service}>
                        <td className="p-4 border-b border-outline-variant">{row.service}</td>
                        <td className="p-4 border-b border-outline-variant text-right font-medium">{row.fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-sm bg-error-container/20 p-4 rounded-lg text-error font-medium">
                  {section.paragraphs[1]}
                </p>
              </>
            ) : section.id === "prohibited-conduct" ? (
              <>
                <p>{section.paragraphs[0].split(": ")[0]}:</p>
                <div className="grid grid-cols-1 gap-3">
                  {section.paragraphs[0]
                    .split(": ")[1]
                    .split("; ")
                    .map((item) => (
                      <div key={item} className="flex items-center gap-3 p-3 bg-surface-container rounded-lg">
                        <Icon name="cancel" className="text-error" />
                        <span className="capitalize">{item.replace(/\.$/, "")}.</span>
                      </div>
                    ))}
                </div>
              </>
            ) : section.id === "liability-disclaimer" ? (
              <>
                <p className="uppercase font-bold tracking-tight text-xs opacity-80">Limitation of Liability</p>
                <p className="uppercase">{section.paragraphs[0].replace("Limitation of Liability: ", "")}</p>
              </>
            ) : (
              section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
            )}
          </div>
        </section>
      ))}
    </article>
  );
}

function VerificationCard({ icon, title, description }) {
  return (
    <div className="p-4 border border-outline-variant rounded-xl flex items-start gap-3">
      <Icon name={icon} className="text-secondary" />
      <div>
        <h4 className="font-bold text-on-background">{title}</h4>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
}
