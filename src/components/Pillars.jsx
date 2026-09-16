import { useLanguage } from "./LanguageContext.jsx";

export default function Pillars() {
  const { t } = useLanguage();
  const pillarsT = t.pillars;
  const pillarsTitle = t.pillarsTitle;

  return (
    <section className="pillars-section" id="piliers">
      <div className="wrap">
        <div className="pillars-story-grid">
          {/* Left Column: Story About What We Do */}
          <div className="pillars-left-col reveal">
            <p className="eyebrow">{pillarsTitle.eyebrow || "NOTRE MISSION"}</p>
            <h2 className="pillars-main-title">
              Notre histoire & <br />
              <span className="accent-word">Nos engagements</span>
            </h2>
            <div className="title-accent-bar" aria-hidden="true" />
            <p className="pillars-main-lead">
              {pillarsTitle.lead ||
                "MAKAYA développe des initiatives concrètes et adaptées aux réalités des communautés locales en Haïti. De l'éducation à la résilience, nous agissons pour redonner espoir et dignité aux familles."}
            </p>
            <p className="pillars-sub-lead">
              Chaque programme est conçu en étroite collaboration avec les leaders et familles de terrain pour assurer un impact mesurable et durable.
            </p>
            <div className="pillars-cta-row">
              <a className="btn btn-secondary" href="#programmes">
                En savoir plus
              </a>
              <a className="btn btn-outline-dark" href="#contact">
                Nous contacter
              </a>
            </div>
          </div>

          {/* Right Column: 2x2 Feature Cards */}
          <div className="pillars-right-col reveal">
            <div className="pillars-cards-grid">
              {pillarsT.slice(0, 4).map((pillar) => (
                <div className="pillar-feature-card" key={pillar.id}>
                  <div className="pillar-card-icon-wrap">
                    <span className="material-symbols-rounded">{pillar.icon}</span>
                  </div>
                  <h3 className="pillar-card-title">{pillar.title}</h3>
                  <p className="pillar-card-text">{pillar.text}</p>
                  <a href="#programmes" className="pillar-card-link">
                    Découvrir <span className="material-symbols-rounded">arrow_forward</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
