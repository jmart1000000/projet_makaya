import { useLanguage } from "./LanguageContext.jsx";

export default function Mission({ onOpenDonate }) {
  const { t } = useLanguage();
  const missionT = t.mission;

  return (
    <section className="mission-event-section" id="mission">
      <div className="wrap">
        <div className="mission-event-grid">
          {/* Left: Emotional Photo with background watermark */}
          <div className="mission-event-visual reveal">
            <div className="mission-photo-frame">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85"
                alt="Enfants et éducation communautaire en Haïti"
                className="mission-main-img"
              />
              <div className="mission-watermark-txt" aria-hidden="true">
                HOPE
              </div>
            </div>
          </div>

          {/* Right: Content + Quick Donation options */}
          <div className="mission-event-content reveal">
            <p className="eyebrow">{missionT.eyebrow || "ACTION D'URGENCE"}</p>
            <h2 className="mission-event-title">
              Une action essentielle <br />
              <span className="accent-word">pour les communautés</span>
            </h2>
            <div className="title-accent-bar" aria-hidden="true" />
            <p className="mission-event-desc">{missionT.text}</p>
            <p className="mission-event-sub">
              {missionT.quote ||
                "Le changement durable naît lorsque les communautés sont écoutées et actrices de leur avenir."}
            </p>

            {/* Quick Donation Widget matching reference */}
            <div className="mission-quick-donate">
              <span className="quick-donate-label">Faire un don rapide :</span>
              <div className="quick-amounts-row">
                <button type="button" className="amount-pill" onClick={onOpenDonate}>
                  10 $
                </button>
                <button type="button" className="amount-pill active" onClick={onOpenDonate}>
                  25 $
                </button>
                <button type="button" className="amount-pill" onClick={onOpenDonate}>
                  50 $
                </button>
                <button type="button" className="amount-pill" onClick={onOpenDonate}>
                  Autre
                </button>
              </div>
              <button className="btn btn-secondary btn-lg" onClick={onOpenDonate}>
                Faire un don maintenant
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
