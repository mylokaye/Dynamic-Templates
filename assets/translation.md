# Page Translation Script for Forms

This script enables dynamic translation of page text based on the language in the URL or the user's browser preference. It includes an **optional toggle button** for testing in development.

---

## Features

- Supports multiple languages: `EN-US` (default), `DE`, `ZH`.
- Detects language from the URL first, e.g., `/ZH/Contact`.
- If no language is specified in the URL, falls back to browser language (`navigator.language`) for `DE` or `ZH`.
- Applies translation to elements with **IDs** matching the dictionary keys.
- Stores original English text to allow toggling translation off.
- **Optional toggle button** in the top-right corner (for development/testing only).

---

## Script

```html
<script>
// ======= DEVELOPMENT TOGGLE FLAG =======
const showToggle = false; // set true for development testing, false for production

// ======= TRANSLATION DICTIONARY =======
const translations = {
  "contact-heading": {
    "EN-US": "Contact Us",
    "DE": "Kontakt",
    "ZH": "联系我们"
  },
  "contact-text": {
    "EN-US": "Please fill the form below.",
    "DE": "Bitte füllen Sie das Formular aus.",
    "ZH": "请填写以下表格。"
  },
  "submit-button": {
    "EN-US": "Submit",
    "DE": "Senden",
    "ZH": "提交"
  }
};

// ======= LANGUAGE DETECTION WITH FALLBACK =======
function detectLanguage() {
  const pathSegments = window.location.pathname.split('/');
  let lang = pathSegments[1]?.toUpperCase() || "";

  if(!["EN-US","DE","ZH"].includes(lang)) {
    const browserLang = navigator.language.toUpperCase();
    if(browserLang.startsWith("ZH")) lang = "ZH";
    else if(browserLang.startsWith("DE")) lang = "DE";
    else lang = "EN-US";
  }

  return lang;
}

// ======= INITIALIZATION =======
let translationOn = true; // toggle state
const currentLang = detectLanguage();

// Store original English text
const originalText = {};
for(const id in translations) {
  const el = document.getElementById(id);
  if(el) originalText[id] = el.textContent;
}

// ======= APPLY OR REVERT TRANSLATION =======
function updateTranslation() {
  for(const id in translations) {
    const el = document.getElementById(id);
    if(!el) continue;

    if(translationOn && currentLang !== "EN-US") {
      el.textContent = translations[id][currentLang] || translations[id]["EN-US"];
    } else {
      el.textContent = originalText[id];
    }
  }
}

// ======= TOGGLE BUTTON (DEVELOPMENT ONLY) =======
function createToggleButton() {
  if(!showToggle) return; // skip if toggle is disabled

  const btn = document.createElement('button');
  btn.id = "lang-toggle";
  btn.textContent = "🌐";
  btn.title = "Toggle Translation On/Off";
  btn.style.position = "fixed";
  btn.style.top = "10px";
  btn.style.right = "10px";
  btn.style.width = "30px";
  btn.style.height = "30px";
  btn.style.border = "none";
  btn.style.borderRadius = "50%";
  btn.style.background = "#fff";
  btn.style.boxShadow = "0 0 5px rgba(0,0,0,0.3)";
  btn.style.cursor = "pointer";
  btn.style.zIndex = 9999;

  btn.addEventListener('click', () => {
    translationOn = !translationOn;
    updateTranslation();
  });

  document.body.appendChild(btn);
}

// ======= INIT SCRIPT =======
document.addEventListener("DOMContentLoaded", () => {
  updateTranslation();
  createToggleButton();
});
</script>