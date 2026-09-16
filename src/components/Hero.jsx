import { useLanguage } from "./LanguageContext.jsx";

export default function Hero({ onOpenDonate }) {
  const { t } = useLanguage();
  const heroT = t.hero;
  const heroImage = heroT.image?.startsWith("/")
    ? `${import.meta.env.BASE_URL}${heroT.image.slice(1)}`
    : heroT.image;

  return (
    <>
      <section
        className="hero"
        id="top"
        style={{ "--hero-image": `url("${heroImage}")` }}
      >
        <div className="wrap">
          <div className="hero-content">
            <h1 className="reveal">
              Ensemble pour <span className="accent-word">l'humanité</span> & l'avenir d'Haïti.
            </h1>

            <p className="hero-lead reveal">{heroT.lead}</p>

            <div className="hero-actions reveal">
              <button className="btn btn-primary btn-lg" onClick={onOpenDonate}>
                <span className="material-symbols-rounded" aria-hidden="true">favorite</span>
                {heroT.primaryCta}
              </button>
              <a className="btn btn-ghost btn-lg" href="#programmes">
                {heroT.secondaryCta} <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
              </a>
            </div>

            {/* Impact Quick Glance Badges */}
            <div className="hero-stats-row reveal">
              {heroT.badges.map((b, i) => (
                <div key={i} className="hero-stat-card">
                  <span className="stat-value">{b.label}</span>
                  <span className="stat-desc">{b.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners banner directly below hero as shown in reference design */}
      <div className="hero-partners-strip">
        <div className="wrap hero-partners-wrap">
          <span className="hero-partner-logo">WPF HAITI</span>
          <span className="hero-partner-logo">AVSI GROUP</span>
          <span className="hero-partner-logo">MSF SOLIDARITÉ</span>
          <span className="hero-partner-logo">COMMUNAUTÉS ACTIVES</span>
        </div>
      </div>
    </>
  );
}
