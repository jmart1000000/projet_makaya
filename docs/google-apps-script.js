/**
 * ═══════════════════════════════════════════════════════════════
 *  MAKAYA — Google Apps Script Webhook
 *  À copier dans: script.google.com → Nouveau projet
 *
 *  INSTRUCTIONS:
 *  1. Ouvrez https://script.google.com → Nouveau projet
 *  2. Collez ce code dans l'éditeur
 *  3. Remplacez SHEET_ID par l'ID de votre Google Sheet
 *  4. Déployer → Nouveau déploiement → Application Web
 *     - Exécuter en tant que: Moi
 *     - Accès: Tout le monde
 *  5. Copiez l'URL → src/services/googleSheets.js → SHEETS_WEBHOOK_URL
 * ═══════════════════════════════════════════════════════════════
 */

const SHEET_ID = "REMPLACEZ_PAR_VOTRE_ID_GOOGLE_SHEET";

const SHEETS = {
  contact:    "📩 Contact",
  donation:   "💚 Dons",
  newsletter: "📧 Newsletter",
  volunteer:  "🤝 Bénévoles",
};

const HEADERS = {
  contact:    ["Date (Haïti)", "Nom", "E-mail", "Téléphone", "Type d'engagement", "Message"],
  donation:   ["Date (Haïti)", "Nom", "E-mail", "Téléphone", "Montant ($)", "Fréquence", "Méthode", "Notes", "Impact estimé"],
  newsletter: ["Date (Haïti)", "E-mail"],
  volunteer:  ["Date (Haïti)", "Nom", "E-mail", "Message", "Région"],
};

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const type = (data.type || "contact").toLowerCase();
    const sheetName = SHEETS[type] || SHEETS.contact;
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      const hdrs = HEADERS[type] || HEADERS.contact;
      sheet.appendRow(hdrs);
      sheet.getRange(1, 1, 1, hdrs.length)
        .setBackground("#015072").setFontColor("#ffffff").setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    const date = data.formattedDate || new Date().toLocaleString("fr-FR");
    let row;

    if (type === "contact") {
      row = [date, data.name||"", data.email||"", data.phone||"", data.category||"", data.message||""];
    } else if (type === "donation") {
      row = [date, data.name||"", data.email||"", data.phone||"", data.amount||"", data.frequency||"", data.paymentMethod||"", data.notes||"", data.impact||""];
    } else if (type === "newsletter") {
      row = [date, data.email||""];
    } else if (type === "volunteer") {
      row = [date, data.name||"", data.email||"", data.message||"", data.region||""];
    }

    sheet.appendRow(row);
    sheet.autoResizeColumns(1, row.length);

    return ContentService.createTextOutput(JSON.stringify({ status: "ok", type }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    Logger.log("Erreur: " + err.message);
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function testContact() {
  doPost({ postData: { contents: JSON.stringify({ type:"contact", formattedDate:"16/09/2026 12:00", name:"Test", email:"test@makaya.org", phone:"+509 3700 0000", category:"benevole", message:"Test message" }) } });
}
