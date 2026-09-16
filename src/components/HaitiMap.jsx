import { useState } from "react";
import { useLanguage } from "./LanguageContext.jsx";
import { useToast } from "./ToastContext.jsx";
import { sendToGoogleSheets } from "../services/googleSheets.js";

export default function HaitiMap() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const mapT = t.haitiMap || {};
  const formT = mapT.form || {};
  const darkT = mapT.bottomDark || {};

  const [activeRegionIndex, setActiveRegionIndex] = useState(-1); // -1 for All Haiti
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      showToast("Veuillez accepter les conditions pour continuer.", "error");
      return;
    }
    if (!name.trim() || !email.trim()) {
      showToast("Veuillez renseigner votre nom et votre e-mail.", "error");
      return;
    }
    setIsSubmitting(true);

    const region =
      activeRegionIndex >= 0 && mapT.regions?.[activeRegionIndex]
        ? mapT.regions[activeRegionIndex].name
        : "Haïti (national)";

    await sendToGoogleSheets("volunteer", {
      name,
      email,
      message,
      region,
    });

    setIsSubmitting(false);
    showToast(formT.successMsg || "Merci ! Votre demande a été reçue avec succès.", "success");
    setName("");
    setEmail("");
    setMessage("");
    setTermsAccepted(false);
  };


  // Determine current map query & zoom
  const currentQuery =
    activeRegionIndex >= 0 && mapT.regions?.[activeRegionIndex]
      ? mapT.regions[activeRegionIndex].mapQuery || mapT.regions[activeRegionIndex].cities
      : "Haiti";
  const zoomLevel = activeRegionIndex >= 0 ? 11 : 8;

  return (
    <section className="where-we-act-section" id="ou-nous-agissons">
      {/* Anchor for backward compatibility */}
      <span id="carte" className="visually-hidden-anchor" />

      {/* TOP SECTION: Title + Two-Column Editorial & Quotation Form */}
      <div className="where-top-block">
        <div className="wrap">
          {/* Small Top Icon / Decorative Indicator matching mockup */}
          <div className="where-icon-center" aria-hidden="true">
            <span className="material-symbols-rounded">menu</span>
          </div>

          {/* Large Main Headline matching mockup */}
          <h2 className="where-headline reveal">
            {mapT.title || "Où nous agissons : Nos zones d'intervention en Haïti"}
          </h2>

          {/* 2-Column Grid */}
          <div className="where-columns-grid reveal">
            {/* Left Column: Editorial Description + Read More Button */}
            <div className="where-editorial-col">
              <p className="where-editorial-p">
                {mapT.editorialP1 ||
                  "Sur le terrain, MAKAYA intervient directement auprès des populations vulnérables pour répondre aux urgences et bâtir une résilience durable. Nos actions ciblent l’éducation inclusive, la protection, la lutte contre les violences basées sur le genre et l’accompagnement des familles."}
              </p>
              <p className="where-editorial-p">
                {mapT.editorialP2 ||
                  "Grâce à nos équipes locales et à nos partenaires, chaque projet est adapté aux réalités des territoires, de l’Ouest au Nord en passant par l’Artibonite, garantissant dignité, efficacité et impact durable."}
              </p>
              <div className="where-editorial-action">
                <a href="#mission" className="btn-read-more-dark">
                  {mapT.readMoreBtn || "EN SAVOIR PLUS"}
                </a>
              </div>
            </div>

            {/* Right Column: Quotation / Contact Form */}
            <div className="where-form-col">
              <div className="quotation-form-card">
                <h3 className="quotation-title">
                  {formT.title || "Rejoignez notre action sur le terrain"}
                </h3>
                <form onSubmit={handleSubmit} className="quotation-form">
                  <div className="form-field">
                    <label htmlFor="quotation-name">{formT.nameLabel || "Nom complet"}</label>
                    <input
                      id="quotation-name"
                      type="text"
                      placeholder={formT.namePlaceholder || "Entrez votre nom"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="quotation-email">{formT.emailLabel || "Email"}</label>
                    <input
                      id="quotation-email"
                      type="email"
                      placeholder={formT.emailPlaceholder || "Entrez une adresse e-mail valide"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="quotation-message">{formT.messageLabel || "Message"}</label>
                    <textarea
                      id="quotation-message"
                      rows="3"
                      placeholder={formT.messagePlaceholder || "Votre message ou zone d'intérêt..."}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-checkbox-row">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                      />
                      <span>{formT.termsLabel || "J'accepte d'être contacté par MAKAYA"}</span>
                    </label>
                  </div>

                  <button type="submit" className="btn-submit-quotation" disabled={isSubmitting}>
                    {isSubmitting ? "Envoi en cours…" : (formT.submitBtn || "Envoyer ma demande")}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MIDDLE SECTION: Full-Width Embedded Map of Haiti */}
      <div className="where-map-wrapper reveal">
        {/* Region filter selector */}
        <div className="wrap where-map-controls">
          <span className="controls-label">{mapT.mapFilterTitle || "Sélectionnez une zone :"}</span>
          <div className="region-chips">
            <button
              type="button"
              className={`region-chip ${activeRegionIndex === -1 ? "active" : ""}`}
              onClick={() => setActiveRegionIndex(-1)}
            >
              <span className="material-symbols-rounded">public</span>
              <span>{mapT.allHaiti || "Toute Haïti"}</span>
            </button>
            {mapT.regions?.map((region, idx) => (
              <button
                key={region.name}
                type="button"
                className={`region-chip ${activeRegionIndex === idx ? "active" : ""}`}
                onClick={() => setActiveRegionIndex(idx)}
              >
                <span className="material-symbols-rounded">location_on</span>
                <span>{region.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Full-width Map Frame */}
        <div className="full-width-map-frame">
          <iframe
            key={currentQuery}
            title={`Google Maps - ${currentQuery}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(currentQuery)}&t=&z=${zoomLevel}&ie=UTF8&iwloc=&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="where-map-iframe"
          />

          {/* Overlay card for active region info */}
          {activeRegionIndex >= 0 && mapT.regions?.[activeRegionIndex] && (
            <div className="map-floating-card">
              <div className="card-top-row">
                <h4>{mapT.regions[activeRegionIndex].name}</h4>
                <span className="active-tag">{mapT.regions[activeRegionIndex].status}</span>
              </div>
              <p className="card-cities">
                <span className="material-symbols-rounded">pin_drop</span>
                {mapT.regions[activeRegionIndex].cities}
              </p>
              <p className="card-actions">{mapT.regions[activeRegionIndex].actions}</p>
              <span className="card-impact-badge">{mapT.regions[activeRegionIndex].impactCount}</span>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM SECTION: Dark/Black Banner with Coordinator & Direct Contacts */}
      <div className="where-dark-banner reveal">
        <div className="wrap">
          <div className="dark-banner-grid">
            {/* Left Column: Circular Photo + Text + Green CTA Button */}
            <div className="dark-left-col">
              <div className="coordinator-avatar-wrap">
                <img
                  src={`${import.meta.env.BASE_URL}photos/coordinator.png`}
                  alt={darkT.coordinatorName || "Coordinateur de terrain MAKAYA"}
                  className="coordinator-avatar"
                  width="140"
                  height="140"
                />
              </div>
              <p className="coordinator-bio">
                {darkT.coordinatorText ||
                  "Notre coordinateur de terrain et nos intervenants communautaires œuvrent quotidiennement pour identifier les priorités locales, coordonner l’aide humanitaire et garantir que chaque ressource bénéficie directement aux enfants et aux familles les plus vulnérables."}
              </p>
              <div className="coordinator-action">
                <a href="#contact" className="btn-green-cta">
                  {darkT.ctaBtn || "EN SAVOIR PLUS"}
                </a>
              </div>
            </div>

            {/* Right Column: Prominent Large Phone Numbers + Address */}
            <div className="dark-right-col">
              <div className="dark-phone-numbers">
                {darkT.phones?.map((phone) => (
                  <a key={phone} href={`tel:${phone.replace(/\s+/g, "")}`} className="phone-line">
                    {phone}
                  </a>
                ))}
              </div>

              <div className="dark-address-block">
                {darkT.addressLines?.map((line, idx) => (
                  <p key={idx} className="address-line">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Very bottom footer bar matching the sample text in mockup */}
      <div className="where-bottom-bar">
        <div className="wrap">
          <p className="bottom-note">
            {darkT.footerTagline ||
              "MAKAYA — Organisation sociale sans but lucratif au service des communautés haïtiennes."}
          </p>
        </div>
      </div>
    </section>
  );
}
