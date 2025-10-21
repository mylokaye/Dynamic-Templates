# Custom Template Attributes for Dynamics 365 Customer Insights

**LLM Code Generation Reference | Email, Form & Page Templates**

---

```yaml
document_type: technical_reference
target_audience: llm_code_generation
supported_outputs: [email, form, page]
version: 1.0
compliance: RFC 2119
last_updated: 2025-10-14
```

---

## Table of Contents

1. [Quick Start Guide](#quick-start-guide)
2. [Template Type Decision Tree](#template-type-decision-tree)
3. [Minimal Working Examples](#minimal-working-examples)
4. [LLM Prompt Templates](#llm-prompt-templates)
5. [Email Templates](#email-templates)
6. [Form Templates](#form-templates)
7. [Page Templates](#page-templates)
8. [Component Library](#component-library)
9. [Core Attribute Reference](#core-attribute-reference)
10. [Style Configuration System](#style-configuration-system)
11. [Anti-Patterns & Corrections](#anti-patterns--corrections)
12. [Complete Reference Implementation](#complete-reference-implementation)

---

## Quick Start Guide

### What Are Custom Attributes?

Dynamics 365 Customer Insights custom attributes extend HTML5 to enable:
- Drag-and-drop element placement
- Visual editing interfaces (Toolbox, Properties, Styles panels)
- Declarative style controls
- Content protection mechanisms

### Three Template Types

| Type | Primary Use | Layout Method | Width Constraint | Special Requirements |
|------|-------------|---------------|------------------|---------------------|
| **Email** | Marketing emails, newsletters | Tables | 700-800px | Strict email client compatibility |
| **Form** | Lead capture, surveys | Tables or divs | Flexible | Form validation elements |
| **Page** | Preference Center, Landing pages, content pages | Tables or divs | Flexible | More CSS flexibility |

### Essential Attributes (All Types)

```html
<!-- Enable drag-and-drop designer -->
<meta type="xrm/designer/setting" name="type" value="marketing-designer-content-editor-document">

<!-- Create editable container -->
<div data-container="true">
  <!-- Content here -->
</div>

<!-- Define design element -->
<div data-editorblocktype="Text">
  <p>Content</p>
</div>

```

---

## Template Type Decision Tree

```
START: What are you building?
│
├─→ EMAIL TEMPLATE
│   ├─→ Width: 700px
│   ├─→ Layout: Tables ONLY
│   ├─→ CSS: Inline styles + embedded
│   ├─→ Restrictions: No media queries, no background-image, no border-radius
│   └─→ Validation: HTML4/XHTML strict
│
├─→ FORM TEMPLATE
│   ├─→ Width: Flexible
│   ├─→ Layout: Tables or divs
│   ├─→ Elements: FormBlock, Field-{name}, SubmitButtonBlock
│   ├─→ CSS: More flexible than email
│   └─→ Validation: HTML5 allowed
│
└─→ PREFERENCE CENTER TEMPLATE
    ├─→ Width: Flexible
    ├─→ Layout: Tables or divs (divs preferred)
    ├─→ CSS: Full styling support
    └─→ Validation: HTML5 allowed
```

---

## Minimal Working Examples

ALl templates must contain Header code, as defined in header.md
ALl templates must contain Sctipt code, as defined in script.md
ALl templates must contain CSS code, as defined in CSS.md


xx

### Minimal Email Template

```html
<!DOCTYPE html>
<html>
<head>
  <meta type="xrm/designer/setting" name="type" value="marketing-designer-content-editor-document">
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
    .wrapper { max-width: 700px; margin: 0 auto; background: #fff; }
  </style>
</head>
<body>
  <table class="wrapper" width="700" align="center">
    <tr>
      <td style="padding: 20px;">
        <div data-container="true">
          <div data-editorblocktype="Text">
            <h1>Email Title</h1>
            <p>Email content here.</p>
          </div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
```

### Minimal Form Template

```html
<!DOCTYPE html>
<html>
<head>
  <meta type="xrm/designer/setting" name="type" value="marketing-designer-content-editor-document">
</head>
<body>
  <div data-container="true">
    <div data-editorblocktype="FormBlock">
      <div data-editorblocktype="Field-email">
        <!-- Email field -->
      </div>
      <div data-editorblocktype="SubmitButtonBlock">
        <!-- Submit button -->
      </div>
    </div>
  </div>
</body>
</html>
```

### Minimal Page (Preference Center) Template

```html
<!DOCTYPE html>
<html>
<head>
  <meta type="xrm/designer/setting" name="type" value="marketing-designer-content-editor-document">
  <style>
    body { font-family: Arial, sans-serif; }
    .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div data-container="true">
      <div data-editorblocktype="Text">
        <h1>Preference Center/h1>
        <p>Page content here.</p>
      </div>
    </div>
  </div>
</body>
</html>
```

---

## LLM Prompt Templates

### For Generating Email Templates

```
Generate a Dynamics 365 email template with the following requirements:
- Purpose: [newsletter/promotional/transactional]
- Width: 700px
- Sections: [header, hero image, content, CTA, footer]
- Style settings: [brand colors, fonts]
- Editable sections: [main content, CTA]

Requirements:
- Use table-based layout
- Include inline styles
- Add style configuration for: [list customizable properties]
- Email client compatible (no media queries, background-image, or border-radius)
```

### For Generating Form Templates

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

### For Generating Page Templates

```
Generate a Dynamics 365 page template for:
- Page type: [Preference Center/landing page/content page/event page]
- Layout: [sections and structure]
- Responsive: [yes/no - note: limited support]
- Style customization: [colors, fonts, spacing]

Requirements:
- Use div-based or table-based layout
- Include drag-and-drop containers in [specify areas]
- Lock [specify sections]
```

---

## Email Templates

### Email-Specific Requirements

**Scope:** All requirements in this section apply ONLY to email templates. Forms and pages are not subject to these constraints.

### Feature Support Matrix

| Feature | Status | Notes |
|---------|--------|-------|
| Inline CSS (`style=""`) | ✓ Required | Primary styling method |
| `<style>` in `<head>` | ✓ Supported | Secondary method |
| CSS classes | ✓ Supported | |
| CSS IDs | ✓ Supported | |
| Table layouts | ✓ Required | Use for structure |
| `<div>` layouts | ✗ Avoid | Use only within tables |
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
- [ ] **Layout:** Use `<table>` for primary structure
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
<table width="700" align="center">
  <tr>
    <td>
      <!-- Content -->
    </td>
  </tr>
</table>
```

**Why Tables:** Email clients have inconsistent `<div>` rendering. Tables provide reliable cross-client layout.

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

| Client | Inline CSS | Tables | Media Queries | Background Images | Border Radius | Web Fonts |
|--------|-----------|--------|---------------|-------------------|---------------|-----------|
| Outlook | ✓ | ✓ | ✗ | Partial | Partial | ✗ |
| Gmail | ✓ | ✓ | Partial | ✓ | ✓ | ✓ |
| T-Online.de | ✓ | ✓ | ✗ | ✗ | Partial | ✗ |
| Apple Mail | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

**Target Compatibility:** Design for the most restrictive client (T-Online.de/Outlook).

### Email Template Source Guidelines

**Requirement:** Create templates from new email entities, NOT by customizing out-of-the-box templates.

**Rationale:** OOB templates contain system-managed elements that conflict with custom modifications during updates.

---

## Form Templates

### Form-Specific Requirements

**Scope:** Requirements specific to form templates for lead capture, surveys, and data collection.

### Form Element Types

| Element | `data-editorblocktype` | Purpose |
|---------|----------------------|---------|
| Form container | `FormBlock` | Wraps entire form |
| Email field | `Field-email` | Email input |
| Text field | `Field-firstname`, `Field-lastname`, etc. | Text inputs |
| Submit button | `SubmitButtonBlock` | Form submission |

### Form Template Structure

```html
<div data-container="true">
  <div data-editorblocktype="FormBlock">
    
    <!-- Email field (required) -->
    <div data-editorblocktype="Field-email">
      <!-- Managed by designer -->
    </div>
    
    <!-- First name field -->
    <div data-editorblocktype="Field-firstname">
      <!-- Managed by designer -->
    </div>
    
    <!-- Last name field -->
    <div data-editorblocktype="Field-lastname">
      <!-- Managed by designer -->
    </div>
    
    <!-- Checkbox example -->
    <div data-editorblocktype="Field-checkbox">
      <!-- Managed by designer -->
    </div>
    
    <!-- Submit button (required) -->
    <div data-editorblocktype="SubmitButtonBlock">
      <!-- Managed by designer -->
    </div>
    
  </div>
</div>
```

### Form Layout Options

**Single Column Layout:**
```html
<table width="100%">
  <tr>
    <td>
      <div data-editorblocktype="Field-email"></div>
    </td>
  </tr>
  <tr>
    <td>
      <div data-editorblocktype="Field-firstname"></div>
    </td>
  </tr>
</table>
```

**Two Column Layout:**
```html
<table width="100%">
  <tr>
    <td width="50%" style="padding-right: 10px;">
      <div data-editorblocktype="Field-firstname"></div>
    </td>
    <td width="50%" style="padding-left: 10px;">
      <div data-editorblocktype="Field-lastname"></div>
    </td>
  </tr>
</table>
```

### Form Template Checklist

- [ ] Wrap form fields in `FormBlock` element
- [ ] Include at least one field (typically email)
- [ ] Add `SubmitButtonBlock`
- [ ] Configure field validation in Properties panel
- [ ] Set form submission behavior
- [ ] Test form submission
- [ ] Validate required fields work
- [ ] Check mobile responsiveness (if applicable)

---

## Preference Center Templates

### Preference Center Overview

Preference center templates are a specialized type of form template used for managing email subscription preferences. They allow users to select which topics they want to receive communications about and provide unsubscribe options.

### Required D365 Scripts

Preference center templates require specific Dynamics 365 scripts to function. These MUST be included before the closing `</body>` tag:

```html
<script>
var contextId = "your-context-id";
var formId = "your-form-id";
var orgId = "your-org-id";
var SerializedData = JSON.parse('{"TopicsAndAssociatedPurposes":{...},"ConsentData":{...}}');
window.DataObject = {
    contextId,
    formId,
    orgId,
    SerializedData
};
</script>
<script src="/consentcontent/preferencecenter/js/main.dist.js"></script>
```

**Note:** The actual IDs and serialized data are provided by Dynamics 365 when the preference center is created.

### Preference Center Elements

Preference centers use three special draggable elements:

| Element | Purpose | Draggable |
|---------|---------|-----------|
| `Topic` | Individual subscription topic checkbox | Yes |
| `Purpose` | Brand/purpose group with unsubscribe option | Yes |
| `ContactOptIn` | Email address display and channel selector | Yes |

### Multi-Column Purpose Layout

Preference centers typically display multiple brands or purposes in a grid layout:

```html
<table width="100%">
  <tr>
    <!-- Column 1 - Brand A -->
    <td data-container="true" width="33%" style="vertical-align: top;">
      <!-- Logo -->
      <div data-editorblocktype="Image">
        <img src="brand-a-logo.png" alt="Brand A">
      </div>
      
      <!-- Drag Topic elements here from Toolbox -->
      <!-- Each topic = one subscription option -->
      
      <!-- Purpose element with unsubscribe -->
      <!-- Drag Purpose element here from Toolbox -->
    </td>
    
    <!-- Column 2 - Brand B -->
    <td data-container="true" width="33%" style="vertical-align: top;">
      <!-- Repeat structure -->
    </td>
    
    <!-- Column 3 - Brand C -->
    <td data-container="true" width="33%" style="vertical-align: top;">
      <!-- Repeat structure -->
    </td>
  </tr>
</table>
```

### ContactOptIn Element

The ContactOptIn element displays the user's email address and channel preferences:

```html
<div data-editorblocktype="ContactOptIn" data-channels="Email">
  <!-- Email display managed by designer -->
  <!-- Channel selector managed by designer -->
</div>
```

**Placement:** Typically placed after all Topic/Purpose selections and before the Submit button.

### Complete Preference Center Structure

```html
<!DOCTYPE html>
<html>
<head>
  <meta type="xrm/designer/setting" 
        name="type" 
        value="marketing-designer-content-editor-document">
  <style>
    /* Your styles */
  </style>
</head>
<body>
  <form>
    <!-- Header -->
    <div data-container="true">
      <div data-editorblocktype="Text">
        <h1>Privacy Center</h1>
        <p>Manage your email preferences</p>
      </div>
    </div>
    
    <!-- Multi-column purpose grid -->
    <table width="100%">
      <tr>
        <td data-container="true" width="33%">
          <!-- Brand A: Logo + Topics + Purpose -->
        </td>
        <td data-container="true" width="33%">
          <!-- Brand B: Logo + Topics + Purpose -->
        </td>
        <td data-container="true" width="33%">
          <!-- Brand C: Logo + Topics + Purpose -->
        </td>
      </tr>
    </table>
    
    <!-- Email display -->
    <div data-container="true">
      <div data-editorblocktype="ContactOptIn" data-channels="Email">
        <!-- Managed by designer -->
      </div>
    </div>
    
    <!-- Submit button -->
    <div data-container="true">
      <div data-editorblocktype="SubmitButtonBlock">
        <!-- Managed by designer -->
      </div>
    </div>
    
    <!-- Footer -->
    <div data-container="true">
      <div data-editorblocktype="Text">
        <p>Legal text and links</p>
      </div>
    </div>
  </form>
  
  <!-- Required D365 Scripts -->
  <script>
  var contextId = "...";
  var formId = "...";
  var orgId = "...";
  var SerializedData = JSON.parse('...');
  window.DataObject = {contextId, formId, orgId, SerializedData};
  </script>
  <script src="/consentcontent/preferencecenter/js/main.dist.js"></script>
</body>
</html>
```

### Preference Center Checklist

- [ ] Include D365 scripts (contextId, formId, orgId, SerializedData)
- [ ] Add designer meta tag
- [ ] Create multi-column layout with containers
- [ ] Drag Topic elements into each brand column
- [ ] Drag Purpose elements for unsubscribe options
- [ ] Add ContactOptIn element for email display
- [ ] Add SubmitButtonBlock

---

## Page Templates

### Page-Specific Requirements

**Scope:** Requirements specific to landing pages and content pages.

### Page vs. Email Differences

| Feature | Email | Page |
|---------|-------|------|
| Layout method | Tables required | Divs preferred, tables allowed |
| CSS flexibility | Restricted | Full support |
| Width | 700-800px | Flexible |
| Media queries | Not supported | Supported |
| Background images | Not supported | Supported |
| Border radius | Unreliable | Supported |
| Responsive design | Limited | Full support |

### Page Layout Structure

**Div-Based Layout (Recommended):**
```html
<div class="page-wrapper">
  <header>
    <div data-container="true">
    </div>
  </header>
  
  <main>
    <div data-container="true">
      <!-- Editable content -->
    </div>
  </main>
  
  <footer>
    <div data-container="true">
    </div>
  </footer>
</div>
```

**Table-Based Layout (Alternative):**
```html
<table width="100%">
  <tr>
    <td>
      <div data-container="true">
        <!-- Content -->
      </div>
    </td>
  </tr>
</table>
```

### Page Template Checklist

- [ ] Add designer meta tag
- [ ] Structure layout (divs or tables)
- [ ] Create containers for editable areas
- [ ] Lock branding sections
- [ ] Add style configuration
- [ ] Include responsive CSS (optional)
- [ ] Test across devices
- [ ] Validate HTML5

---

## Component Library

### Copy-Paste Ready Components

#### Header with Logo

```html
<table width="100%" style="background-color: #0078d4;">
  <tr>
    <td style="padding: 20px; text-align: center;">
      <img src="logo.png" alt="Company Logo" width="200" height="60">
      <h1 style="color: white; margin: 10px 0 0 0; font-size: 24px;">Company Name</h1>
    </td>
  </tr>
</table>
```

#### Two-Column Layout (Email-Safe)

```html
<table width="100%">
  <tr>
    <td width="50%" style="padding: 10px; vertical-align: top;">
      <div data-container="true">
        <!-- Left column content -->
      </div>
    </td>
    <td width="50%" style="padding: 10px; vertical-align: top;">
      <div data-container="true">
        <!-- Right column content -->
      </div>
    </td>
  </tr>
</table>
```

#### Call-to-Action Button (Email-Safe)

```html
<table width="100%">
  <tr>
    <td align="center" style="padding: 20px;">
      <a href="https://example.com" 
         style="background-color: #0078d4; 
                color: white; 
                padding: 15px 30px; 
                text-decoration: none; 
                border-radius: 5px; 
                display: inline-block; 
                font-weight: bold;">
        Click Here
      </a>
    </td>
  </tr>
</table>
```

#### Footer with Social Links

```html
<table width="100%" style="background-color: #f5f5f5;">
  <tr>
    <td style="padding: 20px; text-align: center;">
      <p style="margin: 0 0 10px 0; font-size: 12px; color: #666;">
        © 2025 Company Name. All rights reserved.
      </p>
      <p style="margin: 0 0 10px 0; font-size: 12px; color: #666;">
        123 Business St, City, State 12345
      </p>
      <p style="margin: 0; font-size: 12px;">
        <a href="#" style="color: #0078d4; margin: 0 5px;">Facebook</a> |
        <a href="#" style="color: #0078d4; margin: 0 5px;">Twitter</a> |
        <a href="#" style="color: #0078d4; margin: 0 5px;">LinkedIn</a>
      </p>
    </td>
  </tr>
</table>
```

#### Hero Image Section

```html
<table width="100%">
  <tr>
    <td style="padding: 0;">
      <img src="hero.jpg" 
           alt="Hero Image" 
           width="700" 
           style="display: block; width: 100%; height: auto;">
    </td>
  </tr>
</table>
```

#### Content Section with Heading

```html
<table width="100%">
  <tr>
    <td style="padding: 30px;">
      <div data-container="true">
        <div data-editorblocktype="Text">
          <h2 style="color: #333; margin: 0 0 15px 0;">Section Heading</h2>
          <p style="color: #666; line-height: 1.6; margin: 0;">
            Your content goes here. This section is editable by users.
          </p>
        </div>
      </div>
    </td>
  </tr>
</table>
```

#### Image + Text Side-by-Side

```html
<table width="100%">
  <tr>
    <td width="40%" style="padding: 10px; vertical-align: middle;">
      <img src="image.jpg" alt="Description" width="100%" style="display: block;">
    </td>
    <td width="60%" style="padding: 10px; vertical-align: middle;">
      <div data-container="true">
        <div data-editorblocktype="Text">
          <h3>Heading</h3>
          <p>Content here</p>
        </div>
      </div>
    </td>
  </tr>
</table>
```

#### Spacer Row

```html
<table width="100%">
  <tr>
    <td style="height: 30px; line-height: 30px;">&nbsp;</td>
  </tr>
</table>
```

---

## Core Attribute Reference

### Designer Mode Activation

**Purpose:** Enable drag-and-drop functionality in the designer.

**Attribute:**
```html
<meta type="xrm/designer/setting" 
      name="type" 
      value="marketing-designer-content-editor-document">
```

**Location:** `<head>` section

**Parameters:**
- `type` (required): MUST be "xrm/designer/setting"
- `name` (required): MUST be "type"
- `value` (required): MUST be "marketing-designer-content-editor-document"

**Effect:** Activates Toolbox, Properties, Styles panels and drag-and-drop editing.

**Without This:** Template displays in simplified full-page editor mode.

### Container Declaration

**Purpose:** Define regions where users can drag design elements.

**Attribute:**
```html
<div data-container="true">
  <!-- Draggable area -->
</div>
```

**Parameters:**
- `data-container` (required): MUST be "true"

**Behavior:**
- Creates drop zones in Designer view
- Users can drag elements from Toolbox
- Elements can be reordered within container

**Nesting:**
```html
<table>
  <tr>
    <td>Non-editable content</td>
    <td>
      <div data-container="true">
        Editable area
      </div>
    </td>
  </tr>
</table>
```

### Design Element Types

**Purpose:** Identify element type for designer rendering.

**Attribute:**
```html
<div data-editorblocktype="{type}">
  <!-- Element content -->
</div>
```

**Common Types:**

| Type | Use |
|------|-----|
| `Text` | Rich text content |
| `Image` | Images with optional links |
| `Button` | Call-to-action buttons |
| `Divider` | Horizontal rules |
| `Content` | Reusable content blocks |

**Form Types:**

| Type | Use |
|------|-----|
| `FormBlock` | Form container |
| `Field-email` | Email input field |
| `Field-firstname` | First name field |
| `Field-lastname` | Last name field |
| `Field-{name}` | Custom field |
| `SubmitButtonBlock` | Submit button |
| `ResetButtonBlock` | Reset button |
| `CaptchaBlock` | Captcha |

**Critical Rule:** Do NOT manually edit content between element `<div>` tags. Use Properties panel instead.


```

---

## Style Configuration System

### Style Declaration

**Purpose:** Create customizable settings on Styles panel.

**Syntax:**
```html
<meta type="xrm/designer/setting" 
      name="{id}" 
      value="{default}" 
      datatype="{type}" 
      label="{label}">
```

**Parameters:**
- `name`: Unique identifier (used in CSS/HTML)
- `value`: Default value
- `datatype`: Control type (see table below)
- `label`: Display text on Styles panel

**Data Types:**

| Type | Format | Control | Example |
|------|--------|---------|---------|
| `color` | `#RGB` or `#RRGGBB` | Color picker | `#0078d4` |
| `font` | Font name/stack | Text input | `Arial, sans-serif` |
| `text` | String with units | Text input | `16px`, `2em` |
| `number` | Number only | Number spinner | `3`, `100` |
| `picture` | URL | Text input | `image.jpg` |

### CSS Property Binding

**Syntax:**
```css
selector {
  property: /* @{id} */ {value} /* @{id} */;
}
```

**Example:**
```html
<head>
  <meta type="xrm/designer/setting" 
        name="brand-color" 
        value="#0078d4" 
        datatype="color" 
        label="Brand Color">
  
  <style>
    h1 {
      color: /* @brand-color */ #0078d4 /* @brand-color */;
    }
  </style>
</head>
```

**Requirements:**
- MUST be in `<style>` tag in `<head>`
- Only one `<style>` tag per document
- Comment syntax MUST match exactly

### HTML Attribute Binding

**Syntax:**
```html
<element property-reference="{attr}:@{id};{attr}:@{id}">
```

**Example:**
```html
<head>
  <meta type="xrm/designer/setting" 
        name="logo" 
        value="logo.png" 
        datatype="picture" 
        label="Logo">
  
  <meta type="xrm/designer/setting" 
        name="logo-height" 
        value="60px" 
        datatype="text" 
        label="Logo Height">
</head>

<body>
  <img property-reference="src:@logo;height:@logo-height;" alt="Logo">
</body>
```

**Result:**
```html
<img src="logo.png" height="60px" alt="Logo">
```

### Custom Fonts

**Add fonts to text toolbar:**
```html
<meta type="xrm/designer/setting" 
      name="additional-fonts" 
      datatype="font" 
      value="Roboto;Open Sans;Lato">
```

**Format:** Semicolon-separated font names

---

## Anti-Patterns & Corrections

### ❌ Anti-Pattern 1: Missing Designer Meta Tag

**Problem:**
```html
<head>
  <title>My Template</title>
  <!-- Missing designer meta tag -->
</head>
```

**Result:** Template loads in simple full-page editor mode without drag-and-drop.

**✓ Correction:**
```html
<head>
  <meta type="xrm/designer/setting" 
        name="type" 
        value="marketing-designer-content-editor-document">
  <title>My Template</title>
</head>
```

---

### ❌ Anti-Pattern 2: No Containers

**Problem:**
```html
<body>
  <h1>Title</h1>
  <p>Content</p>
  <!-- No data-container attributes -->
</body>
```

**Result:** Users cannot drag any elements into the template.

**✓ Correction:**
```html
<body>
  <div data-container="true">
    <div data-editorblocktype="Text">
      <h1>Title</h1>
      <p>Content</p>
    </div>
  </div>
</body>
```

---

### ❌ Anti-Pattern 3: Email Using Divs for Layout

**Problem:**
```html
<div class="wrapper">
  <div class="header">Header</div>
  <div class="content">Content</div>
</div>
```

**Result:** Inconsistent rendering across email clients.

**✓ Correction:**
```html
<table width="700" align="center">
  <tr>
    <td class="header">Header</td>
  </tr>
  <tr>
    <td class="content">Content</td>
  </tr>
</table>
```

---

### ❌ Anti-Pattern 4: Email Width Outside Range

**Problem:**
```html
<table width="1000" align="center">
  <!-- Too wide -->
</table>
```

**Result:** Horizontal scrolling or clipping in email clients.

**✓ Correction:**
```html
<table width="700" align="center">
  <!-- Optimal width -->
</table>
```

---

### ❌ Anti-Pattern 5: Media Queries in Email

**Problem:**
```html
<style>
  @media (max-width: 700px) {
    .mobile-hide { display: none; }
  }
</style>
```

**Result:** Media queries ignored or blocked by T-Online.de and Outlook.

**✓ Correction:**
```html
<!-- Use fixed-width layouts, no responsive behavior -->
<table width="700">
  <tr>
    <td>Content always visible</td>
  </tr>
</table>
```

---

### ❌ Anti-Pattern 6: CSS Background Images in Email

**Problem:**
```html
<td style="background-image: url('hero.jpg'); height: 300px;">
  Content
</td>
```

**Result:** Background image not displayed in many email clients.

**✓ Correction:**
```html
<td style="padding: 0;">
  <img src="hero.jpg" width="700" style="display: block;">
</td>
```

---

### ❌ Anti-Pattern 7: Line Height on Span

**Problem:**
```html
<p><span style="line-height: 1.8;">Text content here</span></p>
```

**Result:** Text collapses to 0px height in some email clients.

**✓ Correction:**
```html
<p style="line-height: 1.8;"><span>Text content here</span></p>
```

---

### ❌ Anti-Pattern 8: Multiline Hyperlinks

**Problem:**
```html
<a href="https://example.com">
  Click here to
  visit our website
</a>
```

**Result:** Link breaks in T-Online.de email client.

**✓ Correction:**
```html
<a href="https://example.com">Click here to visit our website</a>
```

---

### ❌ Anti-Pattern 9: Missing Fallback Fonts

**Problem:**
```html
<style>
  body { font-family: 'Montserrat'; }
</style>
```

**Result:** Text displays in default system font when custom font unavailable.

**✓ Correction:**
```html
<style>
  body { font-family: 'Montserrat', Arial, Helvetica, sans-serif; }
</style>
```

---

### ❌ Anti-Pattern 10: Editing Element Content in HTML

**Problem:**
```html
<div data-editorblocktype="Text">
  <p>Manually edited content in HTML view</p>
</div>
```

**Result:** Changes overwritten when element properties updated in Designer.

**✓ Correction:**
Use Properties panel in Designer view to edit element content, never edit between element `<div>` tags in HTML.

---

### ❌ Anti-Pattern 11: Multiple Style Blocks

**Problem:**
```html
<head>
  <style>
    body { font-family: Arial; }
  </style>
  <style>
    p { color: #333; }
  </style>
</head>
```

**Result:** Second style block may be ignored by designer parser.

**✓ Correction:**
```html
<head>
  <style>
    body { font-family: Arial; }
    p { color: #333; }
  </style>
</head>
```

---



---

### ❌ Anti-Pattern 13: Style Settings Not Referenced

**Problem:**
```html
<head>
  <meta type="xrm/designer/setting" 
        name="brand-color" 
        value="#0078d4" 
        datatype="color" 
        label="Brand Color">
  <!-- Never used in CSS or HTML -->
</head>
```

**Result:** Setting does not appear on Styles panel.

**✓ Correction:**
```html
<head>
  <meta type="xrm/designer/setting" 
        name="brand-color" 
        value="#0078d4" 
        datatype="color" 
        label="Brand Color">
  
  <style>
    h1 { color: /* @brand-color */ #0078d4 /* @brand-color */; }
  </style>
</head>
```

---

### ❌ Anti-Pattern 14: Invalid HTML in Email

**Problem:**
```html
<xml>
  <data>Custom data</data>
</xml>
```

**Result:** Email blocked by T-Online.de due to invalid HTML.

**✓ Correction:**
Remove all non-standard HTML elements. Use only HTML4/XHTML compliant tags.

---

### ❌ Anti-Pattern 15: Form Elements in Email

**Problem:**
```html
<input type="email" placeholder="Enter email">
<button type="submit">Submit</button>
```

**Result:** Form controls not supported in email templates.

**✓ Correction:**
Use form elements only in Form templates, not Email templates. In emails, link to a landing page with a form instead.

---

## Complete Reference Implementation

### Production Email Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Designer Mode Activation -->
  <meta type="xrm/designer/setting" 
        name="type" 
        value="marketing-designer-content-editor-document">
  
  <!-- Style Configuration: Colors -->
  <meta type="xrm/designer/setting" 
        name="brand-primary" 
        value="#0078d4" 
        datatype="color" 
        label="Primary Brand Color">
  
  <meta type="xrm/designer/setting" 
        name="brand-secondary" 
        value="#106ebe" 
        datatype="color" 
        label="Secondary Brand Color">
  
  <meta type="xrm/designer/setting" 
        name="text-color" 
        value="#333333" 
        datatype="color" 
        label="Text Color">
  
  <meta type="xrm/designer/setting" 
        name="background-color" 
        value="#f5f5f5" 
        datatype="color" 
        label="Background Color">
  
  <!-- Style Configuration: Typography -->
  <meta type="xrm/designer/setting" 
        name="font-heading" 
        value="Arial, Helvetica, sans-serif" 
        datatype="font" 
        label="Heading Font">
  
  <meta type="xrm/designer/setting" 
        name="font-body" 
        value="Arial, Helvetica, sans-serif" 
        datatype="font" 
        label="Body Font">
  
  <!-- Style Configuration: Images -->
  <meta type="xrm/designer/setting" 
        name="logo-url" 
        value="logo.png" 
        datatype="picture" 
        label="Logo URL">
  
  <meta type="xrm/designer/setting" 
        name="logo-height" 
        value="60px" 
        datatype="text" 
        label="Logo Height">
  
  <meta type="xrm/designer/setting" 
        name="hero-url" 
        value="hero.jpg" 
        datatype="picture" 
        label="Hero Image URL">
  
  <meta type="xrm/designer/setting" 
        name="hero-height" 
        value="300px" 
        datatype="text" 
        label="Hero Image Height">
  
  <!-- CSS Styles -->
  <style>
    /* Reset */
    body, table, td, p, h1, h2, h3, h4, h5, h6 {
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: /* @font-body */ Arial, Helvetica, sans-serif /* @font-body */;
      font-size: 16px;
      line-height: 1.6;
      color: /* @text-color */ #333333 /* @text-color */;
      background-color: /* @background-color */ #f5f5f5 /* @background-color */;
    }
    
    /* Typography */
    h1, h2, h3, h4, h5, h6 {
      font-family: /* @font-heading */ Arial, Helvetica, sans-serif /* @font-heading */;
      color: /* @brand-primary */ #0078d4 /* @brand-primary */;
      line-height: 1.2;
    }
    
    h1 { font-size: 32px; margin-bottom: 20px; }
    h2 { font-size: 24px; margin-bottom: 16px; }
    h3 { font-size: 20px; margin-bottom: 12px; }
    
    p {
      margin-bottom: 16px;
      line-height: 1.6;
    }
    
    a {
      color: /* @brand-secondary */ #106ebe /* @brand-secondary */;
      text-decoration: none;
    }
    
    a:hover {
      text-decoration: underline;
    }
    
    /* Layout Components */
    .wrapper {
      max-width: 700px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    
    .header {
      background-color: /* @brand-primary */ #0078d4 /* @brand-primary */;
      padding: 30px 20px;
      text-align: center;
    }
    
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 28px;
    }
    
    .content-section {
      padding: 30px 20px;
    }
    
    .cta-button {
      background-color: /* @brand-primary */ #0078d4 /* @brand-primary */;
      color: #ffffff !important;
      padding: 15px 30px;
      text-decoration: none;
      display: inline-block;
      font-weight: bold;
      border-radius: 5px;
    }
    
    .footer {
      background-color: /* @background-color */ #f5f5f5 /* @background-color */;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #666666;
    }
    
    .footer a {
      color: /* @brand-secondary */ #106ebe /* @brand-secondary */;
      margin: 0 5px;
    }
  </style>
</head>

<body>
  <!-- Email Wrapper -->
  <table class="wrapper" width="700" align="center" cellpadding="0" cellspacing="0" border="0" role="presentation">
    
    <!-- Header Section (-->
    <tr>
      <td class="header">
        <div data-container="true">
          <img property-reference="src:@logo-url;height:@logo-height;" 
               alt="Company Logo" 
               style="display: block; margin: 0 auto 15px auto;">
          <h1>Company Newsletter</h1>
        </div>
      </td>
    </tr>
    
    <!-- Hero Image Section (Style-Controlled) -->
    <tr>
      <td style="padding: 0;">
        <img property-reference="src:@hero-url;height:@hero-height;" 
             width="700" 
             alt="Hero Image"
             style="display: block; width: 100%; height: auto;">
      </td>
    </tr>
    
    <!-- Main Content Section  -->
    <tr>
      <td class="content-section">
        <div data-container="true">
          <div data-editorblocktype="Text">
            <h2>Welcome to Our Newsletter</h2>
            <p>This is your main content area. You can edit this text and add more design elements below using the drag-and-drop designer.</p>
            <p>Share updates, announcements, or promotional content with your audience. Keep your message clear and engaging.</p>
          </div>
        </div>
      </td>
    </tr>
    
    <!-- Call-to-Action Section  -->
    <tr>
      <td style="padding: 0 20px 30px 20px; text-align: center;">
        <div data-container="true">
          <div data-editorblocktype="Button">
            <!-- Button managed by designer -->
          </div>
        </div>
      </td>
    </tr>
    
    <!-- Two Column Section  -->
    <tr>
      <td style="padding: 0 20px 30px 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="50%" style="padding-right: 10px; vertical-align: top;">
              <div data-container="true">
                <div data-editorblocktype="Text">
                  <h3>Feature One</h3>
                  <p>Describe your first feature or benefit here.</p>
                </div>
              </div>
            </td>
            <td width="50%" style="padding-left: 10px; vertical-align: top;">
              <div data-container="true">
                <div data-editorblocktype="Text">
                  <h3>Feature Two</h3>
                  <p>Describe your second feature or benefit here.</p>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    
    <!-- Footer Section -->
    <tr>
      <td class="footer">
        <div data-container="true" >
          <p style="margin: 0 0 10px 0;">
            <a href="#">Facebook</a> | 
            <a href="#">Twitter</a> | 
            <a href="#">LinkedIn</a>
          </p>
          <p style="margin: 0 0 10px 0;">
            © 2025 Your Company Name. All rights reserved.
          </p>
          <p style="margin: 0 0 10px 0;">
            123 Business Street, City, State 12345
          </p>
          <p style="margin: 0;">
            <a href="{{UnsubscribeLink}}">Unsubscribe</a> | 
            <a href="{{ViewInBrowserLink}}">View in Browser</a>
          </p>
        </div>
      </td>
    </tr>
    
  </table>
</body>
</html>
```

---

### Production Form Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Designer Mode Activation -->
  <meta type="xrm/designer/setting" 
        name="type" 
        value="marketing-designer-content-editor-document">
  
  <!-- Style Configuration -->
  <meta type="xrm/designer/setting" 
        name="brand-color" 
        value="#0078d4" 
        datatype="color" 
        label="Brand Color">
  
  <meta type="xrm/designer/setting" 
        name="button-color" 
        value="#0078d4" 
        datatype="color" 
        label="Button Color">
  
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f5f5f5;
    }
    
    .form-wrapper {
      max-width: 700px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    h1, h2 {
      color: /* @brand-color */ #0078d4 /* @brand-color */;
    }
    
    .form-intro {
      margin-bottom: 30px;
    }
  </style>
</head>

<body>
  <div class="form-wrapper">
    
    <!-- Form Header -->
    <div data-container="true">
      <h1>Get in Touch</h1>
      <p class="form-intro">Fill out the form below and we'll get back to you soon.</p>
    </div>
    
    <!-- Form Section ) -->
    <div data-container="true">
      <div data-editorblocktype="FormBlock">
        
        <!-- First Name Field -->
        <div data-editorblocktype="Field-firstname">
          <!-- Managed by designer -->
        </div>
        
        <!-- Last Name Field -->
        <div data-editorblocktype="Field-lastname">
          <!-- Managed by designer -->
        </div>
        
        <!-- Email Field -->
        <div data-editorblocktype="Field-email">
          <!-- Managed by designer -->
        </div>
        
        <!-- Phone Field -->
        <div data-editorblocktype="Field-telephone1">
          <!-- Managed by designer -->
        </div>
        
        <!-- Company Field -->
        <div data-editorblocktype="Field-company">
          <!-- Managed by designer -->
        </div>
        
        <!-- Subscription List -->
        <div data-editorblocktype="SubscriptionListBlock">
          <!-- Managed by designer -->
        </div>
        
        <!-- Checkbox for terms -->
        <div data-editorblocktype="Field-checkbox">
          <!-- Managed by designer -->
        </div>
        
        <!-- Captcha -->
        <div data-editorblocktype="CaptchaBlock">
          <!-- Managed by designer -->
        </div>
        
        <!-- Submit Button -->
        <div data-editorblocktype="SubmitButtonBlock">
          <!-- Managed by designer -->
        </div>
        
      </div>
    </div>
    
    <!-- Form Footer  -->
    <div data-container="true" >
      <p style="font-size: 12px; color: #666; margin-top: 20px;">
        Your information is secure and will never be shared with third parties.
      </p>
    </div>
    
  </div>
</body>
</html>
```

---

### Production Page Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Designer Mode Activation -->
  <meta type="xrm/designer/setting" 
        name="type" 
        value="marketing-designer-content-editor-document">
  
  <!-- Style Configuration -->
  <meta type="xrm/designer/setting" 
        name="brand-primary" 
        value="#0078d4" 
        datatype="color" 
        label="Primary Brand Color">
  
  <meta type="xrm/designer/setting" 
        name="brand-secondary" 
        value="#106ebe" 
        datatype="color" 
        label="Secondary Brand Color">
  
  <meta type="xrm/designer/setting" 
        name="hero-image" 
        value="hero-page.jpg" 
        datatype="picture" 
        label="Hero Background">
  
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: Arial, Helvetica, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    
    /* Header */
    .header {
      background-color: /* @brand-primary */ #0078d4 /* @brand-primary */;
      color: white;
      padding: 20px 0;
    }
    
    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo {
      font-size: 24px;
      font-weight: bold;
    }
    
    .nav a {
      color: white;
      text-decoration: none;
      margin-left: 20px;
    }
    
    /* Hero Section */
    .hero {
      background-image: url(/* @hero-image */ hero-page.jpg /* @hero-image */);
      background-size: cover;
      background-position: center;
      height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-align: center;
    }
    
    .hero-content {
      background-color: rgba(0, 0, 0, 0.5);
      padding: 40px;
      border-radius: 10px;
    }
    
    /* Main Content */
    .main-content {
      max-width: 1200px;
      margin: 60px auto;
      padding: 0 20px;
    }
    
    .section {
      margin-bottom: 60px;
    }
    
    h1 {
      font-size: 48px;
      margin-bottom: 20px;
    }
    
    h2 {
      color: /* @brand-primary */ #0078d4 /* @brand-primary */;
      font-size: 32px;
      margin-bottom: 20px;
    }
    
    /* Two Column Layout */
    .two-columns {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      margin-top: 40px;
    }
    
    /* CTA Section */
    .cta-section {
      background-color: /* @brand-primary */ #0078d4 /* @brand-primary */;
      color: white;
      padding: 60px 20px;
      text-align: center;
    }
    
    .cta-button {
      background-color: white;
      color: /* @brand-primary */ #0078d4 /* @brand-primary */;
      padding: 15px 40px;
      text-decoration: none;
      display: inline-block;
      font-weight: bold;
      border-radius: 5px;
      margin-top: 20px;
    }
    
    /* Footer */
    .footer {
      background-color: #333;
      color: white;
      padding: 40px 20px;
      text-align: center;
    }
    
    .footer a {
      color: white;
      margin: 0 10px;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .two-columns {
        grid-template-columns: 1fr;
      }
      
      .header-content {
        flex-direction: column;
      }
      
      .nav {
        margin-top: 10px;
      }
    }
  </style>
</head>

<body>
  <!-- Header -->
  <header class="header">
    <div class="header-content">
      <div data-container="true">
        <div class="logo">Company Name</div>
        <nav class="nav">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </nav>
      </div>
    </div>
  </header>
  
  <!-- Hero Section ) -->
  <section class="hero">
    <div class="hero-content">
      <div data-container="true">
        <div data-editorblocktype="Text">
          <h1>Welcome to Our Website</h1>
          <p style="font-size: 20px;">Discover amazing products and services</p>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Main Content ) -->
  <main class="main-content">
    
    <!-- Introduction Section -->
    <section class="section">
      <div data-container="true">
        <div data-editorblocktype="Text">
          <h2>About Us</h2>
          <p>We're dedicated to providing exceptional service and innovative solutions. Our team of experts is here to help you achieve your goals.</p>
        </div>
      </div>
    </section>
    
    <!-- Two Column Section -->
    <section class="section">
      <div data-container="true">
        <div data-editorblocktype="Text">
          <h2>Our Services</h2>
        </div>
      </div>
      
      <div class="two-columns">
        <div data-container="true">
          <div data-editorblocktype="Text">
            <h3>Service One</h3>
            <p>Description of your first service offering and its benefits.</p>
          </div>
        </div>
        
        <div data-container="true">
          <div data-editorblocktype="Text">
            <h3>Service Two</h3>
            <p>Description of your second service offering and its benefits.</p>
          </div>
        </div>
      </div>
    </section>
    
  </main>
  
  <!-- CTA Section  -->
  <section class="cta-section">
    <div data-container="true">
      <div data-editorblocktype="Text">
        <h2 style="color: white;">Ready to Get Started?</h2>
        <p style="font-size: 18px;">Contact us today to learn more about our services.</p>
      </div>
      <div data-editorblocktype="Button">
        <!-- Button managed by designer -->
      </div>
    </div>
  </section>
  
  <!-- Footer  -->
  <footer class="footer">
    <div data-container="true" >
      <p>© 2025 Your Company Name. All rights reserved.</p>
      <p style="margin-top: 10px;">
        <a href="#">Privacy Policy</a> | 
        <a href="#">Terms of Service</a> | 
        <a href="#">Contact Us</a>
      </p>
      <p style="margin-top: 20px;">
        <a href="#">Facebook</a> | 
        <a href="#">Twitter</a> | 
        <a href="#">LinkedIn</a>
      </p>
    </div>
  </footer>
  
</body>
</html>
```

---

## Additional Resources

### Microsoft Documentation

- [Design Elements Reference](https://learn.microsoft.com/dynamics365/customer-insights/journeys/content-blocks)
- [Designer Feature Protection](https://learn.microsoft.com/dynamics365/customer-insights/journeys/designer-feature-protection)
- [Dynamic Content Implementation](https://learn.microsoft.com/dynamics365/customer-insights/journeys/dynamic-email-content)
- [Email Design Requirements](https://learn.microsoft.com/dynamics365/customer-insights/journeys/email-design)

### Quick Reference Cards

**Email Template Checklist:**
- [ ] Width: 700px (preferred) or max 800px
- [ ] Layout: Table-based
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

**Form Template Checklist:**
- [ ] FormBlock wrapper added
- [ ] Required fields included
- [ ] SubmitButtonBlock added
- [ ] Field validation configured
- [ ] Captcha added if needed
- [ ] Thank you message configured
- [ ] Containers for editable areas
- [ ] Designer meta tag added

**Page Template Checklist:**
- [ ] Layout structure defined
- [ ] Designer meta tag added
- [ ] Containers for editable areas
- [ ] Style configuration added
- [ ] Responsive CSS (optional)
- [ ] HTML5 validated

---

**Document Version:** 2.0  
**Source:** Microsoft Learn - Dynamics 365 Customer Insights  
**Last Updated:** October 2025  
**Compliance:** RFC 2119 (Requirement Levels)  
**Optimized For:** LLM Code Generation
