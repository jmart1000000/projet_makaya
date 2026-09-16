import { useState } from "react";
import { useLanguage } from "./LanguageContext.jsx";
import { useToast } from "./ToastContext.jsx";
import { sendToGoogleSheets } from "../services/googleSheets.js";

export default function Contact() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const contactT = t.contact;
  const formT = contactT.form;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "benevole",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      (!formData.email.trim() && !formData.phone.trim()) ||
      !formData.message.trim()
    ) {
      showToast(
        "Veuillez remplir le nom, le message et au moins un moyen de contact.",
        "error"
      );
      return;
    }

    setIsSubmitting(true);
    await sendToGoogleSheets("contact", formData);
    setIsSubmitting(false);
    showToast(formT.successMsg, "success");
    setFormData({ name: "", email: "", phone: "", category: "benevole", message: "" });
  };

  return (
    <section className="contact-section" id="contact">
      {/* ── Hero banner ── */}
      <div className="contact-hero">
        <div className="contact-hero-overlay" aria-hidden="true" />
        <div className="wrap contact-hero-inner reveal">
          <p className="eyebrow contact-eyebrow">{contactT.eyebrow}</p>
          <h2 className="contact-title">{contactT.title}</h2>
          <p className="contact-subtitle">{contactT.text}</p>
        </div>
      </div>

      {/* ── Main content: info cards + form ── */}
      <div className="wrap contact-body">

        {/* Left col — info */}
        <aside className="contact-info reveal">
          <h3 className="contact-info-heading">Nous contacter</h3>
          <p className="contact-info-lead">
            Notre équipe reste à votre écoute pour toute question, proposition de
            partenariat ou demande d'information.
          </p>

          <div className="contact-meta-list">
            <div className="contact-meta-item">
              <span className="contact-meta-icon material-symbols-rounded" aria-hidden="true">
                location_on
              </span>
              <div>
                <strong>Localisation</strong>
                <span>{contactT.location}</span>
              </div>
            </div>

            <div className="contact-meta-item">
              <span className="contact-meta-icon material-symbols-rounded" aria-hidden="true">
                phone
              </span>
              <div>
                <strong>Téléphone / WhatsApp</strong>
                <span>{contactT.phone}</span>
              </div>
            </div>

            <a
              href={`mailto:${contactT.email}`}
              className="contact-meta-item contact-meta-link"
            >
              <span className="contact-meta-icon material-symbols-rounded" aria-hidden="true">
                mail
              </span>
              <div>
                <strong>E-mail</strong>
                <span>{contactT.email}</span>
              </div>
            </a>
          </div>

          {/* Social links */}
          <div className="contact-socials">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-btn"
              aria-label="Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="#contact"
              className="contact-social-btn"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a
              href="#contact"
              className="contact-social-btn"
              aria-label="YouTube"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
              </svg>
            </a>
          </div>
        </aside>

        {/* Right col — form */}
        <div className="contact-form-wrap reveal">
          <form onSubmit={handleSubmit} className="contact-form-card" noValidate>
            <h3 className="contact-form-title">Envoyez-nous un message</h3>

            <div className="contact-form-group">
              <label htmlFor="c-name">{formT.nameLabel} *</label>
              <input
                id="c-name"
                name="name"
                type="text"
                required
                placeholder="Ex: Jean Dupont"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="contact-form-row">
              <div className="contact-form-group">
                <label htmlFor="c-email">{formT.emailLabel}</label>
                <input
                  id="c-email"
                  name="email"
                  type="email"
                  placeholder="jean.dupont@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="contact-form-group">
                <label htmlFor="c-phone">{formT.phoneLabel || "Téléphone / WhatsApp"}</label>
                <input
                  id="c-phone"
                  name="phone"
                  type="tel"
                  placeholder="+509 37XX XXXX"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="contact-form-group">
              <label htmlFor="c-category">{formT.categoryLabel}</label>
              <select
                id="c-category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {formT.categories.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="contact-form-group">
              <label htmlFor="c-message">{formT.messageLabel} *</label>
              <textarea
                id="c-message"
                name="message"
                rows="4"
                required
                placeholder="Comment désirez-vous participer ou soutenir MAKAYA ?"
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary contact-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Envoi en cours…" : formT.submitBtn}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
