import { useLanguage } from "./LanguageContext.jsx";

export default function Programs({ onOpenDonate }) {
  const { t } = useLanguage();
  const programsT = t.programs || {};
  const heroT = programsT.hero || {};
  const badgeT = programsT.circleBadge || {};
  const introT = programsT.intro || {};
  const milestones = programsT.milestones || [];
  const storyT = programsT.story || {};
  const statsT = programsT.statsCard || {};
  const transpT = programsT.transparencyCard || {};
  const teamPhotoT = programsT.teamPhoto || {};
  const bottomT = programsT.bottomPillars || {};

  return (
    <section className="programs-section" id="programmes">
      {/* 1. DARK HERO BANNER */}
      <div className="actions-dark-hero">
        <div className="wrap">
          {/* Breadcrumb */}
          <div className="actions-breadcrumb">
            <span className="breadcrumb-text">{heroT.breadcrumb || "ACCUEIL • NOS ACTIONS"}</span>
          </div>

          {/* Large display headline */}
          <h2 className="actions-hero-title">
            {heroT.title || "Bâtir la confiance et l'autonomie par l'action communautaire."}
          </h2>

          {/* Subtitle */}
          <p className="actions-hero-subtitle">
            {heroT.subtitle ||
              "Découvrez la démarche, l'impact sur le terrain et les principes d'action qui guident chacune de nos interventions en Haïti."}
          </p>
        </div>

        {/* Faint Giant Watermark matching the mockup background */}
        <div className="actions-watermark" aria-hidden="true">
          {heroT.watermark || "Nos Actions"}
        </div>
      </div>

      {/* 2. MAIN ACTIONS SHOWCASE (White Background) */}
      <div className="actions-main-showcase">
        <div className="wrap">
          {/* Top Row: Circular Badge + Headline */}
          <div className="actions-intro-row reveal">
            {/* Circular Navy & Lime Badge */}
            <div className="actions-circle-badge">
              <div className="circle-inner">
                <span className="badge-number">{badgeT.number || "10+"}</span>
                <span className="badge-label">{badgeT.label || "ANS D'ENGAGEMENT"}</span>
              </div>
            </div>

            {/* Headline and Pill Tag */}
            <div className="actions-intro-text">
              <span className="pill-badge">{introT.pillTag || "Éducation & Résilience"}</span>
              <h3 className="actions-intro-heading">
                {introT.headline ||
                  "Des initiatives créées sur mesure avec les communautés, pensées pour un impact durable."}
              </h3>
            </div>
          </div>

          {/* 3-Column Milestone Horizontal Card */}
          <div className="actions-milestones-card reveal">
            {milestones.map((item, idx) => (
              <div key={idx} className="milestone-col">
                <span className="milestone-step">{item.step}</span>
                <h4 className="milestone-title">{item.title}</h4>
                <p className="milestone-desc">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Asymmetrical 2-Column Grid */}
          <div className="actions-asym-grid reveal">
            {/* Left Column */}
            <div className="actions-asym-left">
              {/* Story / Manifesto Box */}
              <div className="actions-story-card">
                <span className="story-eyebrow">{storyT.eyebrow || "NOTRE ENGAGEMENT FONDAMENTAL"}</span>
                <h4 className="story-title">
                  {storyT.title || "Construire l'avenir des communautés haïtiennes."}
                </h4>
                <p className="story-p">
                  {storyT.text ||
                    "Nous n'avons pas seulement créé une association ; nous avons initié un mouvement solidaire pour redonner le pouvoir d'agir aux populations locales face aux défis humanitaires et climatiques."}
                </p>
                <button
                  type="button"
                  className="actions-manifesto-link"
                  onClick={onOpenDonate}
                >
                  <span>{storyT.linkText || "Soutenir notre démarche d'action →"}</span>
                </button>
              </div>

              {/* Bottom Split Row: Dark Card + White Transparency Card */}
              <div className="actions-split-row">
                {/* Dark Navy Stat Card */}
                <div className="actions-dark-stat-card">
                  <div className="stat-item">
                    <span className="stat-label">{statsT.growthLabel || "Impact annuel"}</span>
                    <span className="stat-val lime-val">{statsT.growthVal || "240%"}</span>
                  </div>

                  <div className="stat-divider" />

                  <div className="stat-item">
                    <span className="stat-label">{statsT.usersLabel || "Bénéficiaires actifs"}</span>
                    <span className="stat-val white-val">{statsT.usersVal || "85k+"}</span>
                  </div>

                  <p className="stat-caption">{statsT.caption}</p>
                </div>

                {/* Light Transparency Card */}
                <div className="actions-transp-card">
                  <div className="transp-icon-wrap">
                    <span className="material-symbols-rounded">verified_user</span>
                  </div>
                  <h4 className="transp-title">{transpT.title || "Transparence totale"}</h4>
                  <p className="transp-text">{transpT.text}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Tall Team Photo */}
            <div className="actions-asym-right">
              <div className="actions-team-photo-wrap">
                <img
                  src={`${import.meta.env.BASE_URL}photos/actions-team.png`}
                  alt="Équipe MAKAYA sur le terrain"
                  className="actions-team-img"
                  width="440"
                  height="660"
                />
                <span className="team-location-badge">
                  {teamPhotoT.locationBadge || "Port-au-Prince, 2026"}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Divider matching the mockup footer banner */}
          <div className="actions-bottom-divider">
            <span className="divider-line" />
            <span className="divider-text">{bottomT.tag || "PILIERS D'INTERVENTION"}</span>
            <span className="divider-line" />
          </div>

          <div className="actions-bottom-cta">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onOpenDonate}
            >
              <span className="material-symbols-rounded">volunteer_activism</span>
              <span>{bottomT.cta || "Faire un don pour nos actions"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
