import { useState } from "react";
import { useLanguage } from "./LanguageContext.jsx";

export default function Faq() {
  const { t } = useLanguage();
  const faqT = t.faq;
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="wrap">
        <div className="faq-header reveal text-center">
          <h2 className="faq-title">{faqT.title}</h2>
          <div className="faq-accent-bar" aria-hidden="true" />
          <p className="faq-lead">{faqT.lead}</p>
        </div>

        <div className="faq-accordion reveal">
          {faqT.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`faq-card ${isOpen ? "is-open" : ""}`}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-q-text">{item.q}</span>
                  <span className="faq-toggle-icon" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
