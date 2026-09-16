import { useState } from "react";
import { useLanguage } from "./LanguageContext.jsx";
import { useToast } from "./ToastContext.jsx";
import { sendToGoogleSheets } from "../services/googleSheets.js";

export default function Footer() {
  const { lang, setLang, t } = useLanguage();
  const { showToast } = useToast();
  const footerT = t.footer;

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Veuillez saisir une adresse e-mail valide.", "error");
      return;
    }
    setIsSubmitting(true);
    await sendToGoogleSheets("newsletter", { email });
    setIsSubmitting(false);
    showToast(footerT.newsletterSuccess, "success");
    setEmail("");
  };

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <a href="#top" className="footer-brand">
              MAKAYA
            </a>
            <p className="footer-desc">{footerT.brandDesc}</p>
            <span className="footer-tagline">“{footerT.tagline}”</span>
          </div>

          {/* Quick Navigation Links */}
          <div className="footer-links-col">
            <h4>{footerT.quickLinksTitle}</h4>
            <ul>
              {t.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="footer-newsletter-col">
            <h4>{footerT.newsletterTitle}</h4>
            <p>{footerT.newsletterDesc}</p>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                placeholder={footerT.newsletterPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary btn-sm" disabled={isSubmitting}>
                {isSubmitting ? "…" : footerT.newsletterBtn}
              </button>
            </form>

            <div className="footer-lang-wrap">
              <span>Langue :</span>
              <button
                className={`footer-lang-btn ${lang === "fr" ? "active" : ""}`}
                onClick={() => setLang("fr")}
              >
                Français
              </button>
              <span>•</span>
              <button
                className={`footer-lang-btn ${lang === "ht" ? "active" : ""}`}
                onClick={() => setLang("ht")}
              >
                Kreyòl
              </button>
              <span>•</span>
              <button
                className={`footer-lang-btn ${lang === "en" ? "active" : ""}`}
                onClick={() => setLang("en")}
              >
                English
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">{footerT.copyright}</p>
          <div className="footer-socials">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
