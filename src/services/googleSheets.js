// ─────────────────────────────────────────────────────────────
//  MAKAYA — Service Google Sheets
//  Tous les formulaires du site envoient leurs données ici.
//  Chaque type est routé vers un onglet distinct dans le Sheet.
// ─────────────────────────────────────────────────────────────

/**
 * URL du webhook Google Apps Script.
 * Remplacez cette valeur après avoir déployé le script Apps Script.
 * Voir: /docs/google-apps-script.js pour le code à copier.
 */
export const SHEETS_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbxujvdrBHMQ3JLm_oM0ZHSbwDxC1SSVmiFqKYPSPMUn-mw0GcbA2SvCvt46RgoUfaY-iA/exec";

/**
 * Types de formulaires supportés → correspondent aux onglets du Google Sheet.
 *   "contact"    → onglet "📩 Contact"
 *   "donation"   → onglet "💚 Dons"
 *   "newsletter" → onglet "📧 Newsletter"
 *   "volunteer"  → onglet "🤝 Bénévoles"
 */

/**
 * Envoie les données d'un formulaire vers Google Sheets via Apps Script.
 *
 * @param {'contact' | 'donation' | 'newsletter' | 'volunteer'} type
 * @param {Object} data — champs du formulaire
 * @returns {Promise<{ success: boolean, fallback?: boolean }>}
 */
export async function sendToGoogleSheets(type, data) {
  const payload = {
    type,
    timestamp: new Date().toISOString(),
    formattedDate: new Date().toLocaleString("fr-FR", {
      timeZone: "America/Port-au-Prince",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    ...data,
  };

  if (import.meta.env.DEV) {
    console.info(`[MAKAYA Sheets] Envoi (${type}) :`, payload);
  }

  try {
    await fetch(SHEETS_WEBHOOK_URL, {
      method: "POST",
      // "text/plain" évite le preflight CORS avec Google Apps Script
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    return { success: true };
  } catch (error) {
    console.error("[MAKAYA Sheets] Erreur réseau :", error);
    // Sauvegarde locale si le réseau échoue (récupérable manuellement)
    try {
      const stored = JSON.parse(
        localStorage.getItem("makaya_pending_submissions") || "[]"
      );
      stored.push(payload);
      localStorage.setItem("makaya_pending_submissions", JSON.stringify(stored));
    } catch (_) {}
    return { success: false, fallback: true };
  }
}
