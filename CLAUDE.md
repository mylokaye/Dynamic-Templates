# Claude Development Guide

This document provides context and guidelines for Claude when working on the Dynamic-Templates project.

---

## Project Overview

**Dynamic-Templates** is a production-ready HTML template library for **Dynamics 365 Customer Insights - Journeys**. It provides customizable, accessible, and brand-focused templates for:

- **Email templates** (newsletters, promotional emails)
- **Form templates** (lead capture, surveys, contact forms)
- **Preference center templates** (subscription management)
- **Page templates** (landing pages, content pages)

### Key Value Proposition

The default Dynamics 365 forms and emails are rigid and visually outdated. This project rebuilds them from the ground up with:

- Full brand customization
- WCAG 2.1 AA/AAA accessibility compliance
- Modern HTML5 structure
- Email client compatibility
- Single-file architecture (no external dependencies)

---

## Repository Structure

```
Dynamic-Templates/
├── templates/           # Production-ready HTML templates
│   ├── contact-form.html
│   └── preference-center.html
├── docs/               # Additional documentation
├── raw/                # Raw/source files (never edit these)
├── assets/             # Images and assets
├── llm.md              # Technical reference for LLM code generation
├── documentation.md    # User-facing documentation
├── README.md           # Project readme
└── CLAUDE.md           # This file
```

---

## Critical Documentation

### Primary Technical Reference: `llm.md`

**ALWAYS consult `llm.md` before creating or modifying templates.** This file contains:

- Complete Dynamics 365 custom attribute reference
- Template type specifications (Email, Form, Page)
- Required meta tags and data attributes
- Style configuration system
- Email client compatibility matrix
- Anti-patterns and corrections
- Production-ready examples

**When to use `llm.md`:**
- Creating any new template
- Adding Dynamics 365 design elements
- Implementing style configuration
- Troubleshooting template issues
- Understanding custom attributes like `data-container` and `data-editorblocktype`

### User Documentation: `documentation.md`

End-user guide for implementing templates in Dynamics 365.

### Project Status: `changelog.md`

Track project updates and version history.

---

## Communication Preferences

**Response Style:**
- Keep responses simple, clear, and minimal
- State what was done, not how it was done
- Avoid verbose explanations unless specifically requested
- Be concise and direct

---

## Coding Conventions & Style

### Comment Style
- **One line per comment** - Keep all comments concise and on a single line
- **Always add comments** - When adding new code, include explanatory comments
- **Example:**
  ```html
  <!-- Brand color configuration for primary elements -->
  <meta type="xrm/designer/setting" name="brand-color" value="#0078d4" datatype="color" label="Brand Color">

  <!-- Main content container with drag-and-drop support -->
  <div data-container="true">
  ```

### Changelog Management
- **Always update `changelog.md`** when making changes
- **Keep entries simple** - Brief description of what was added/removed/modified
- **Format:**
  ```markdown
  ## [Date] - [Template Name or Feature]
  - Added: [feature description]
  - Modified: [change description]
  - Removed: [what was removed]
  ```

### File Organization
- **New templates** - Always create in `/templates/` folder
- **No naming conventions** - Use descriptive names as appropriate
- **No backups needed** - Git handles versioning, no need for manual backups or copies

### Protected Sections
- **Always ask before modifying headers** - Header sections require approval before changes
- **Preserve Dynamics 365 attributes** - Never remove or modify `data-container`, `data-editorblocktype`, or `property-reference` attributes

---

## Template Development Guidelines

### Before Creating or Modifying Templates

1. **Identify template type** (Email, Form, or Page)
2. **Read the relevant section in `llm.md`** for that template type
3. **Check the anti-patterns section** in `llm.md` to avoid common mistakes
4. **Review existing templates** in `/templates/` for reference

### Template Type Requirements

#### Email Templates
- **Width:** 700-800px (700px preferred)
- **Layout:** Divs with flexbox or CSS Grid
- **CSS:** Inline styles + embedded `<style>` tag
- **Restrictions:** No media queries, no background-image, no border-radius dependencies
- **Validation:** HTML4/XHTML compliance required
- **Target compatibility:** T-Online.de and Outlook (most restrictive clients)

#### Form Templates
- **Layout:** Divs with flexbox or CSS Grid
- **Required elements:** FormBlock, Field-{name}, SubmitButtonBlock
- **Validation:** HTML5 allowed

#### Page Templates
- **Layout:** Divs with flexbox or CSS Grid
- **CSS:** Full styling support including media queries
- **Responsive:** Fully supported
- **Validation:** HTML5 allowed

### Required Elements in All Templates

```html
<!-- 1. Designer mode activation (in <head>) -->
<meta type="xrm/designer/setting"
      name="type"
      value="marketing-designer-content-editor-document">

<!-- 2. Editable containers (in <body>) -->
<div data-container="true">
  <!-- Users can drag elements here -->
</div>

<!-- 3. Design elements -->
<div data-editorblocktype="Text">
  <p>Content</p>
</div>
```

### Style Configuration System

To make properties customizable in the Dynamics 365 Styles panel:

```html
<!-- 1. Declare setting in <head> -->
<meta type="xrm/designer/setting"
      name="brand-color"
      value="#0078d4"
      datatype="color"
      label="Brand Color">

<!-- 2. Reference in CSS -->
<style>
  h1 {
    color: /* @brand-color */ #0078d4 /* @brand-color */;
  }
</style>
```

**Data types:** `color`, `font`, `text`, `number`, `picture`

---

## Common Development Tasks

**Primary workflows:** Create new templates, modify existing templates, add features, fix bugs

### Task 1: Create a New Email Template

1. Start with the production email template in `llm.md` (line 1414)
2. Set width to 700px
3. Use div-based layout with flexbox or CSS Grid
4. Add style configuration for brand colors, fonts, images
5. Create containers for editable sections
6. Lock branding sections (no container)
7. Validate against HTML4/XHTML
8. Test rendering without media queries or background-image

### Task 2: Create a New Form Template

1. Start with the production form template in `llm.md` (line 1687)
2. Add FormBlock wrapper
3. Include Field-{name} elements for each input
4. Add SubmitButtonBlock
5. Create containers for editable areas
6. Add style configuration

### Task 3: Create a New Preference Center

1. Start with the preference center structure in `llm.md` (line 597)
2. Create multi-column layout (typically 3 columns for brands)
3. Add containers in each column for Topic elements
4. Include Purpose elements for unsubscribe options
5. Add ContactOptIn element
6. Include required D365 scripts before `</body>`

### Task 4: Add Customizable Style Settings

1. Identify properties that should be customizable (colors, fonts, images, spacing)
2. Add meta tags in `<head>` with unique names
3. Reference in CSS using `/* @{name} */ value /* @{name} */` syntax
4. For HTML attributes, use `property-reference="attr:@{name};"`

---

## Code Quality Standards

### Accessibility (CRITICAL)
- **ALWAYS ensure files adhere to accessibility guidelines**
- **WCAG 2.1 Level AA minimum** (AAA preferred where possible)
- Include descriptive alt text on all images
- Proper heading hierarchy (h1, h2, h3) - no skipping levels
- Sufficient color contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Semantic HTML5 elements (use proper tags like `<nav>`, `<main>`, `<article>`)
- Form labels properly associated with inputs
- Keyboard navigation support
- Screen reader compatibility

### Email Client Compatibility
- Test for lowest common denominator (T-Online.de, Outlook)
- No media queries in email templates
- Use `<img>` tags instead of CSS background-image
- Apply line-height to `<p>`, not `<span>`
- Keep hyperlink text continuous (no line breaks within `<a>` tags)

### Documentation
- JSDoc-style inline documentation for complex logic
- Comment sections clearly
- Include usage instructions in template comments

### Single-File Architecture
- External resources ARE allowed (Google Fonts, CDN libraries, etc.)
- Embed custom CSS in `<style>` tag or inline
- Templates should be self-contained but can reference external resources

---

## Critical Rules (DO NOT VIOLATE)

### Email Templates
1. **MUST** use div-based layout with flexbox or CSS Grid
2. **MUST** be 700-800px wide
3. **MUST NOT** use media queries
4. **MUST NOT** use CSS background-image
5. **MUST NOT** rely on border-radius
6. **MUST** include fallback fonts
7. **MUST** validate against HTML4/XHTML

### All Templates
1. **MUST** include designer meta tag
2. **MUST** have at least one `data-container="true"` element
3. **MUST** use `data-editorblocktype` for design elements
4. **MUST NOT** manually edit content inside editorblocktype divs
5. **MUST** use only one `<style>` tag per document
6. **MUST** reference style settings in CSS/HTML to appear in Styles panel
7. **MUST** ask before modifying header sections
8. **MUST** adhere to accessibility guidelines (WCAG 2.1 AA minimum)
9. **MUST** update changelog.md when making changes
10. **MUST** add comments when adding new code (one line per comment)

---

## Testing Checklist

### Email Templates
- [ ] Width is 700-800px
- [ ] Div-based layout with flexbox or grid
- [ ] No media queries
- [ ] No CSS background-image
- [ ] Inline + embedded CSS
- [ ] Fallback fonts specified
- [ ] Continuous hyperlink text
- [ ] HTML4/XHTML valid
- [ ] Designer meta tag present
- [ ] Containers added for editable areas
- [ ] Style configuration working

### Form Templates
- [ ] FormBlock wrapper present
- [ ] Required fields included
- [ ] SubmitButtonBlock added
- [ ] Containers for editable areas
- [ ] Designer meta tag present
- [ ] Style configuration working

### Page Templates
- [ ] Layout structure defined
- [ ] Containers for editable areas
- [ ] Designer meta tag present
- [ ] Style configuration working
- [ ] Responsive CSS (if applicable)
- [ ] HTML5 valid

---

## Working with Existing Templates

### When Modifying Templates
1. **Read the entire template first** to understand structure
2. **Identify locked vs. editable sections**
   - Locked: No `data-container="true"`
   - Editable: Has `data-container="true"`
3. **Preserve all Dynamics 365 attributes**
   - `data-container`
   - `data-editorblocktype`
   - `property-reference`
   - Designer meta tags
4. **Test style configuration** after changes

### Contact Form Template (`templates/contact-form.html`)
- Production-ready contact form
- Includes email validation
- WCAG compliant
- Mobile-responsive with dark mode support
- Live demo available: https://mylokaye.info/Dynamic-Templates/templates/contact-form.html

### Preference Center Template (`templates/preference-center.html`)
- Multi-brand subscription management
- Topic and Purpose elements
- ContactOptIn element
- Requires D365 scripts

---

## Git Workflow

### Branch Naming
- Feature branches: `claude/create-{feature}-{session-id}`
- Current branch: `claude/create-md-template-011CUKpBywJfmJPUTTi3fi4p`

### Commit Messages
- Be descriptive and focus on "why" not "what"
- Follow repository's commit style (check `git log`)
- End with Claude signature:
  ```
  🤖 Generated with [Claude Code](https://claude.com/claude-code)

  Co-Authored-By: Claude <noreply@anthropic.com>
  ```

### Push Requirements
- Always use: `git push -u origin <branch-name>`
- Branch must start with `claude/` and end with session ID
- Retry up to 4 times with exponential backoff on network errors

---

## Common Questions

### Q: How do I make a property customizable in the Dynamics 365 designer?
**A:** Add a meta tag in `<head>` and reference it in CSS or HTML. See "Style Configuration System" section above and `llm.md` line 990.

### Q: Why won't my email template render correctly?
**A:** Check the anti-patterns section in `llm.md` (line 1100). Common issues:
- Improper use of flexbox or grid
- Including media queries
- Using CSS background-image
- Width outside 700-800px range

### Q: What's the difference between data-container and data-editorblocktype?
**A:**
- `data-container="true"` creates a drop zone where users can drag elements
- `data-editorblocktype="{type}"` identifies the type of design element

### Q: Can I use JavaScript in templates?
**A:** Yes, for forms and pages. NOT for email templates (email clients block JavaScript).

### Q: Where should I add custom CSS?
**A:** In a single `<style>` tag in the `<head>` section. For emails, also duplicate critical styles inline.

---

## Resources

### Internal Documentation
- `llm.md` - Complete technical reference (READ THIS FIRST)
- `documentation.md` - User-facing documentation
- `README.md` - Project overview

### Microsoft Learn
- [Design Elements Reference](https://learn.microsoft.com/dynamics365/customer-insights/journeys/content-blocks)
- [Designer Feature Protection](https://learn.microsoft.com/dynamics365/customer-insights/journeys/designer-feature-protection)
- [Dynamic Content](https://learn.microsoft.com/dynamics365/customer-insights/journeys/dynamic-email-content)
- [Email Design Requirements](https://learn.microsoft.com/dynamics365/customer-insights/journeys/email-design)

### External Resources
- [Megan V. Walker's Blog](https://meganvwalker.com) - Dynamics 365 customization articles
- W3C HTML Validator - For validating email templates

---

## Notes for Claude

- **Prioritize accessibility** - This project emphasizes WCAG compliance (CRITICAL requirement)
- **Email templates are restrictive** - Follow email rules strictly
- **Consult `llm.md` frequently** - It's the source of truth for Dynamics 365 attributes
- **Single-file architecture** - Keep everything self-contained
- **Production quality** - These templates are used in live customer journeys
- **Test assumptions** - When unsure, check the anti-patterns section in `llm.md`
- **Always comment new code** - One line per comment, keep it clear and concise
- **Update changelog** - Document all changes in changelog.md
- **Ask before changing headers** - Get approval before modifying header sections
- **No backups needed** - Git handles versioning, create files directly in /templates/

---

**Version:** 1.1
**Last Updated:** October 21, 2025
**Platform:** Dynamics 365 Customer Insights Journeys 1.1.59247.103
