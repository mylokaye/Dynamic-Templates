# Email Documentation

## Email-Specific Requirements

**Scope:** All requirements in this section apply ONLY to email templates. Forms and pages are not subject to these constraints.

### Feature Support Matrix

| Feature | Status | Notes |
|---------|--------|-------|
| Inline CSS (`style=""`) | ✓ Required | Primary styling method |
| `<style>` in `<head>` | ✓ Supported | Secondary method |
| CSS classes | ✓ Supported | |
| CSS IDs | ✓ Supported | |
| Div layouts | ✓ Supported | Recommended for all layouts |
| CSS Flexbox/Grid | ✓ Supported | Modern layout approach |
| Images (`<img>`) | ✓ Supported | Include alt text |
| Animated GIFs | ✓ Supported | |
| `padding`, `margin`, `max-width` | ✓ Supported | |
| Headers (`<h1>`-`<h6>`) | ✓ Supported | |
| Paragraphs (`<p>`) | ✓ Supported | |
| Media queries | ✗ Not supported | T-Online.de blocks |
| Background images | ✗ Not supported | Use `<img>` instead |
| `border-radius` | ✗ Unreliable | Don't rely on it |
| Web fonts | ⚠️ Limited | MUST include fallbacks |
| CSS animations | ✗ Not supported | |
| CSS transitions | ✗ Not supported | |
| `<video>` | ✗ Not supported | |
| Form controls | ✗ Not supported | No `<input>` in emails |
| `<xml>` tags | ✗ Not supported | |

**Legend:** ✓ = Supported | ✗ = Not supported | ⚠️ = Partial support

### Email Template Construction Checklist

When generating an email template, follow this sequence:

- [ ] **Width:** Set email width to 700px
- [ ] **Layout:** Use `<div>` elements with flexbox or grid
- [ ] **Designer Mode:** Add designer meta tag to `<head>`
- [ ] **CSS Method:** Apply critical styles inline via `style=""`
- [ ] **Style Block:** Add single `<style>` tag in `<head>` for shared styles
- [ ] **Fonts:** Include fallback fonts: `font-family: 'Custom', Arial, sans-serif;`
- [ ] **Images:** Use `<img>` tags, not CSS background-image
- [ ] **Links:** Keep hyperlink text continuous (no line breaks)
- [ ] **Line Height:** Apply `line-height` to `<p>`, not `<span>`
- [ ] **Containers:** Add `data-container="true"` for editable areas
- [ ] **Validation:** Ensure HTML4/XHTML compliance
- [ ] **No Media Queries:** Remove all `@media` rules
- [ ] **No Interactivity:** Remove checkboxes, radio buttons, JavaScript

### Email Layout Specifications

**Width Requirements:**
- MUST be between 700px and 800px
- Width > 800px MAY cause horizontal clipping
- Width < 700px MAY cause desktop rendering issues

**Layout Architecture:**
```html
<div style="max-width: 700px; margin: 0 auto;">
  <!-- Content -->
</div>
```

**Modern Approach:** Use div-based layouts with inline styles for maximum flexibility and maintainability.

### CSS Implementation for Emails

**Primary Method (Inline):**
```html
<p style="color: #333; font-size: 16px; line-height: 1.6;">Content</p>
```

**Secondary Method (Embedded):**
```html
<style>
  p { color: #333; font-size: 16px; line-height: 1.6; }
</style>
```

**Best Practice:** Duplicate critical styles inline for maximum reliability.

### Email CSS Restrictions

**Background Images:**
```html
<!-- ✗ Don't use CSS background-image -->
<div style="background-image: url(image.jpg);">Content</div>

<!-- ✓ Use img tags -->
<img src="image.jpg" width="700" style="display: block;">
```

**Custom Fonts:**
```html
<!-- ✗ Missing fallback -->
<style>
  body { font-family: 'CustomFont'; }
</style>

<!-- ✓ With fallback -->
<style>
  body { font-family: 'CustomFont', Arial, sans-serif; }
</style>
```

**Line Height:**
```html
<!-- ✗ Don't apply to span (causes collapse) -->
<p><span style="line-height: 1.5;">Text</span></p>

<!-- ✓ Apply to paragraph -->
<p style="line-height: 1.5;"><span>Text</span></p>
```

**Rounded Corners:**
```html
<!-- ✗ Don't rely on border-radius -->
<div style="border-radius: 10px; background: #ccc;">Content</div>

<!-- ✓ Use images for rounded corners if critical -->
<img src="rounded-corner-box.png">
```

### Email Hyperlink Requirements

**Link Continuity:**
```html
<!-- ✗ Line break within link (breaks in T-Online.de) -->
<a href="https://example.com">
  Click here to
  visit our site
</a>

<!-- ✓ Continuous text -->
<a href="https://example.com">Click here to visit our site</a>
```

### Email HTML Validation

**Requirements:**
- HTML MUST validate against HTML4 or XHTML standards
- T-Online.de enforces strict validation
- Invalid HTML MAY result in email blocking

**Validation Process:**
1. Use W3C HTML validator
2. Resolve all errors before deployment
3. Test in target email clients

### Email Client Compatibility Matrix

| Client | Inline CSS | Div Layouts | Media Queries | Background Images | Border Radius | Web Fonts |
|--------|-----------|-------------|---------------|-------------------|---------------|-----------|
| Outlook | ✓ | ✓ | ✗ | Partial | Partial | ✗ |
| Gmail | ✓ | ✓ | Partial | ✓ | ✓ | ✓ |
| T-Online.de | ✓ | ✓ | ✗ | ✗ | Partial | ✗ |
| Apple Mail | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

**Target Compatibility:** Design for the most restrictive client (T-Online.de/Outlook).

### Email Template Source Guidelines

**Requirement:** Create templates from new email entities, NOT by customizing out-of-the-box templates.

**Rationale:** OOB templates contain system-managed elements that conflict with custom modifications during updates.
### Template Generation Prompts

#### Email Template Prompt
```
Generate a Dynamics 365 email template with the following requirements:
- Purpose: [newsletter/promotional/transactional]
- Width: 700px
- Sections: [header, hero image, content, CTA, footer]
- Style settings: [brand colors, fonts]
- Editable sections: [main content, CTA]

Requirements:
- Use div-based layout with flexbox or CSS Grid
- Include inline styles
- Add style configuration for: [list customizable properties]
- Email client compatible (no media queries, background-image, or border-radius)
```

#### Form Template Prompt
```
Generate a Dynamics 365 form template with the following:
- Form purpose: [lead capture/survey/registration]
- Fields required: [email, name, phone, etc.]
- Validation: [required fields]
- Layout: [single column/two column]
- Submit behavior: [redirect/thank you message]

Requirements:
- Include all necessary Field-{name} elements
- Add SubmitButtonBlock
- Include form validation elements
```

#### Page Template Prompt
```
Generate a Dynamics 365 page template for:
- Page type: [Preference Center/landing page/content page/event page]
- Layout: [sections and structure]
- Responsive: [yes/no - note: limited support]
- Style customization: [colors, fonts, spacing]

Requirements:
- Use div-based layout with flexbox or CSS Grid
- Include drag-and-drop containers in [specify areas]
- Lock [specify sections]
```

---

## Final Checklist

**Email Template Checklist:**
- [ ] Width: 700px (preferred) or max 800px
- [ ] Layout: Div-based with flexbox or grid
- [ ] Designer meta tag added
- [ ] Inline styles for critical CSS
- [ ] Fallback fonts specified
- [ ] No media queries
- [ ] No background-image CSS
- [ ] No border-radius dependencies
- [ ] Links are continuous text
- [ ] line-height on `<p>`, not `<span>`
- [ ] HTML4/XHTML validated
- [ ] Containers added for editable areas
