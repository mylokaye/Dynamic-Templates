## Repository snapshot

This repository holds a single-file, production-ready HTML template (and variants) used to customize Dynamics 365 Customer Insights / Marketing Forms. Key folders:

- `templates/` — single-file HTML templates you deploy into Dynamics 365 (e.g. `templates/contact-form.html`).
- `assets/` — supporting JS/CSS (`assets/scripts.js`, `style.css`).
- `docs/` and `raw/` — guidance, raw exports and examples.

The codebase intentionally follows a "single-file" architecture for templates: markup, styles and scripts are colocated for easy paste into Dynamics form editors.

## What the agent should know (big picture)

- The HTML templates are meant to be copied into Dynamics 365 Customer Insights / Marketing Forms. Dynamics expects specific attributes and naming patterns (e.g. `data-editorblocktype`, fields with names like `firstname`, `emailaddress1`).
- `assets/scripts.js` contains the core runtime logic (i18n, validation, feedback, form handling). When editing behavior prefer updating `assets/scripts.js` and keeping template changes minimal unless altering structure or accessibility text.
- Styling is mostly in the top of each template file (single-file approach). Small visual tweaks can be made in `style.css`, but Dynamics-final HTML keeps inline/embedded styles for portability.

## Files and patterns to reference (concrete examples)

- Template form: `templates/contact-form.html` — look for:
  - Input names: `firstname`, `lastname`, `emailaddress1`, `description` — these are used by Dynamics and by `assets/scripts.js` (email validation selects `input[name="emailaddress1"]`).
  - Data attributes: `data-editorblocktype` and `data-targetproperty` — these indicate Dynamics-managed blocks.
  - CSS classes: `.marketingForm`, `.textFormFieldBlock`, `.field-helper-text` — scripts and styles assume these exist.
- Core script: `assets/scripts.js` — important exported behavior and selectors:
  - i18n: top-level `TRANSLATIONS` object and `i18n` module (init, setLanguage, t).
  - Email validation: `EmailValidator.validateEmailFormat` and `EmailValidator.validateField` target `input[name="emailaddress1"]`.
  - Form lifecycle: `PreferenceCenter.init()` wires `form` submit/dirty-tracking and confirms `msdynmkt_*` checkbox naming conventions.

## Conventions and gotchas (project-specific)

- Single-file templates: keep external references relative/absolute only when Dynamics allows them; otherwise embed assets.
- Do not rename form field `name` attributes (e.g. `emailaddress1`) without verifying Dynamics mapping — scripts and server-side expect these names.
- i18n keys live in `assets/scripts.js`. Add new keys there and use `data-i18n`, `data-i18n-aria`, or `data-i18n-placeholder` attributes in templates to wire translations.
- Accessibility: label elements are positioned absolutely and toggled via CSS when inputs are focused. Keep the label structure (input + label sibling) intact when refactoring.

## Build / preview / testing workflows

This is a static HTML/CSS/JS repository. Recommended local workflows the agent can suggest to devs:

- Quick preview: serve the folder with Python's simple server (macOS/zsh):

  python3 -m http.server 8000

  Then open `http://localhost:8000/templates/contact-form.html`.

- Live-editing: use VS Code Live Server extension or open file in the browser. Note that Dynamics runtime checks may not be present locally — `assets/scripts.js` includes a detection shim that warns if `data-editorblocktype` elements are missing.

## Example edits the agent can safely perform

- Fix or refine email validation: update `EmailValidator` in `assets/scripts.js` and run local preview.
- Add new translation keys: update `TRANSLATIONS` and add `data-i18n` attributes to the template.
- Small CSS tweaks to `.marketingForm`, `.textFormFieldBlock`, and `.marketing-checkbox-wrapper` inside `templates/contact-form.html`.

## What the agent must not do without confirmation

- Do not change Dynamics-specific field names (`firstname`, `emailaddress1`, `msdynmkt_*` patterns) without explicit confirmation from the developer.
- Avoid moving large blocks of inline CSS out of the template unless the goal is to split the template for a non-Dynamics deployment.

## Where to look for additional context

- `README.md` — project overview and deployment intention (copy-paste into Dynamics).
- `docs/` — narrative docs and form examples (e.g. `docs/email.md`, `docs/form.md`, `docs/preference-center.md`).

## Quick pointers for PRs and tests

- Changes to `assets/scripts.js` should include a manual preview before PR. Provide a short testing checklist in the PR description (pages to open + actions to perform). Example checklist:
  - Open `templates/contact-form.html` locally and verify the email validation triggers on blur and input.
  - Verify i18n language selection updates text nodes with `data-i18n` attributes.

If you want me to update this guidance or add CI/test commands, tell me what CI you use (GitHub Actions, other) or what commands you run locally and I will update the file.
