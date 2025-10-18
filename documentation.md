# Documentation for Dynamics 365 Customer Insights

## Table of Contents

1. [Basics: Custom Attributes & Settings](#basics-custom-attributes--settings)
2. [Template Type Decision Tree](#template-type-decision-tree)
3. [Minimal Working Examples](#minimal-working-examples)
4. [Preference Center Elements](#preference-center-elements)
5. [Anti-Patterns & Corrections](#anti-patterns--corrections)
6. [Additional Resources](#additional-resources)

**Extended Documentation:**
- Full Email documentation: [/docs-email.md](/docs-email.md)
- Full Form documentation: [/docs-form.md](/docs-form.md)
- Full Preference Center documentation: [/docs-pc.md](/docs-pc.md)

---
## Template Management
- Always save customized templates under new names to prevent updates from overwriting changes
- Add metadata (purpose, style, market type) to make templates easily discoverable
- Consider template inheritance patterns for maintaining consistent branding

## Basics: Custom Attributes & Settings

### What Are Custom Attributes?

Dynamics 365 Customer Insights uses custom HTML attributes to transform standard HTML templates into interactive, drag-and-drop experiences within the marketing designer. These attributes enable:

- **Drag-and-drop element placement** - Users can visually build templates by dragging elements from a toolbox
- **Visual editing interfaces** - Access to Toolbox, Properties, and Styles panels
- **Declarative style controls** - Settings that users can customize without touching code
- **Content protection mechanisms** - Lock specific sections to prevent accidental changes

Custom attributes work with **all template types**: Emails, Forms, and Pages.

---

### Template Types Overview

| Type | Primary Use | Layout Method | Width Constraint | Special Requirements |
|------|-------------|---------------|------------------|---------------------|
| **Email** | Marketing emails, newsletters | Tables | 700-800px | Strict email client compatibility |
| **Form** | Lead capture, surveys | Tables or divs | Flexible | Form validation elements |
| **Page** | Preference Center, Landing pages, content pages | Tables or divs | Flexible | More CSS flexibility |



### Core Custom Attributes

#### 1. Enable Drag-and-Drop Designer Mode

**Purpose:** Activate the marketing designer's drag-and-drop functionality.

**Attribute:**
```html
<meta type="xrm/designer/setting"
      name="type"
      value="marketing-designer-content-editor-document">
```

**Location:** Must be placed in the `<head>` section.

**Parameters:**
- `type` (required): MUST be `"xrm/designer/setting"`
- `name` (required): MUST be `"type"`
- `value` (required): MUST be `"marketing-designer-content-editor-document"`

**Effect:** Activates the Toolbox, Properties, and Styles panels, enabling drag-and-drop editing.

**Without This:** Template displays in simplified full-page editor mode - users can only edit HTML directly.

**Example:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta type="xrm/designer/setting"
        name="type"
        value="marketing-designer-content-editor-document">
  <title>My Template</title>
</head>
<body>
  <!-- Template content -->
</body>
</html>
```

---

#### 2. Create Editable Containers

**Purpose:** Define regions where users can drag design elements from the toolbox.

**Attribute:**
```html
<div data-container="true">
  <!-- Users can drag elements here -->
</div>
```

**Parameters:**
- `data-container` (required): MUST be `"true"`

**Behavior:**
- Creates drop zones in Designer view
- Users can drag elements from the Toolbox panel into these containers
- Elements can be reordered within the container via drag-and-drop

**Multiple Containers:**
You can have multiple containers in a single template. Each acts as an independent editable region.

```html
<table width="100%">
  <tr>
    <!-- Non-editable header -->
    <td style="background: #0078d4;">
      <img src="logo.png" alt="Logo">
    </td>
  </tr>
  <tr>
    <!-- Editable content area -->
    <td>
      <div data-container="true">
        <!-- Users can add/edit content here -->
      </div>
    </td>
  </tr>
  <tr>
    <!-- Another editable area -->
    <td>
      <div data-container="true">
        <!-- Users can add/edit content here too -->
      </div>
    </td>
  </tr>
</table>
```

---

#### 3. Define Design Element Types

**Purpose:** Identify element types for the designer to render properly and provide appropriate editing controls.

**Attribute:**
```html
<div data-editorblocktype="{type}">
  <!-- Element content -->
</div>
```

**Common Element Types:**

| Type | Purpose | Use Case |
|------|---------|----------|
| `Text` | Rich text content | Paragraphs, headings, formatted text |
| `Image` | Images with optional links | Photos, graphics, logos |
| `Button` | Call-to-action buttons | Links styled as buttons |
| `Divider` | Horizontal rules | Visual separators |
| `Content` | Reusable content blocks | Shared content across templates |

**Form-Specific Element Types:**

| Type | Purpose | Required |
|------|---------|----------|
| `FormBlock` | Form container | Yes - wraps all form fields |
| `Field-email` | Email input field | Typically yes |
| `Field-firstname` | First name field | Optional |
| `Field-lastname` | Last name field | Optional |
| `Field-{name}` | Custom field (any CRM field) | Optional |
| `SubmitButtonBlock` | Submit button | Yes |
| `ResetButtonBlock` | Reset button | Optional |
| `CaptchaBlock` | Captcha verification | Optional |

**Example:**
```html
<div data-container="true">
  <!-- Text element -->
  <div data-editorblocktype="Text">
    <h1>Welcome</h1>
    <p>This is editable text content.</p>
  </div>

  <!-- Image element -->
  <div data-editorblocktype="Image">
    <!-- Image managed by designer -->
  </div>

  <!-- Button element -->
  <div data-editorblocktype="Button">
    <!-- Button managed by designer -->
  </div>
</div>
```

**Critical Rule:** Do NOT manually edit content between element `<div>` tags. Use the Properties panel in the designer instead. Manual edits may be overwritten when properties are updated.

---

### Style Configuration System

Style settings allow you to create customizable properties that appear in the Styles panel, giving users control over colors, fonts, images, and other visual properties without editing code.

#### Creating Style Settings

**Syntax:**
```html
<meta type="xrm/designer/setting"
      name="{id}"
      value="{default-value}"
      datatype="{type}"
      label="{display-label}">
```

**Parameters:**
- `name` - Unique identifier used to reference this setting (e.g., `"brand-color"`)
- `value` - Default value shown initially
- `datatype` - Control type (see table below)
- `label` - Display text shown in the Styles panel

**Available Data Types:**

| Type | Format | UI Control | Example Value |
|------|--------|------------|---------------|
| `color` | `#RGB` or `#RRGGBB` | Color picker | `#0078d4` |
| `font` | Font name/stack | Text input | `Arial, sans-serif` |
| `text` | String with units | Text input | `16px`, `2em`, `bold` |
| `number` | Number only | Number spinner | `3`, `100` |
| `picture` | URL or path | Text input | `image.jpg`, `https://...` |

#### Applying Settings to CSS

**Syntax:**
```css
selector {
  property: /* @{setting-name} */ {default-value} /* @{setting-name} */;
}
```

**Requirements:**
- MUST be in a `<style>` tag within `<head>`
- Only ONE `<style>` tag per document
- Comment syntax MUST match exactly: `/* @name */ value /* @name */`

**Example:**
```html
<head>
  <!-- Define style settings -->
  <meta type="xrm/designer/setting"
        name="brand-color"
        value="#0078d4"
        datatype="color"
        label="Brand Color">

  <meta type="xrm/designer/setting"
        name="heading-font"
        value="Arial, sans-serif"
        datatype="font"
        label="Heading Font">

  <meta type="xrm/designer/setting"
        name="body-font-size"
        value="16px"
        datatype="text"
        label="Body Font Size">

  <!-- Apply settings in CSS -->
  <style>
    h1 {
      color: /* @brand-color */ #0078d4 /* @brand-color */;
      font-family: /* @heading-font */ Arial, sans-serif /* @heading-font */;
    }

    body {
      font-size: /* @body-font-size */ 16px /* @body-font-size */;
    }
  </style>
</head>
```

When users change the "Brand Color" setting in the Styles panel, all CSS properties referencing `@brand-color` update automatically.

---

#### Applying Settings to HTML Attributes

Use `property-reference` to dynamically populate HTML attributes based on style settings.

**Syntax:**
```html
<element property-reference="{attribute}:@{setting};{attribute}:@{setting};">
```

**Example:**
```html
<head>
  <!-- Define image settings -->
  <meta type="xrm/designer/setting"
        name="logo"
        value="logo.png"
        datatype="picture"
        label="Logo Image">

  <meta type="xrm/designer/setting"
        name="logo-height"
        value="60px"
        datatype="text"
        label="Logo Height">
</head>

<body>
  <!-- Apply settings to img element -->
  <img property-reference="src:@logo;height:@logo-height;"
       alt="Company Logo"
       style="display: block;">
</body>
```

**Result in rendered HTML:**
```html
<img src="logo.png"
     height="60px"
     alt="Company Logo"
     style="display: block;">
```

When users update the logo settings in the Styles panel, the `src` and `height` attributes update automatically.

---

#### Adding Custom Fonts to Text Toolbar

Allow users to select custom fonts from the text formatting toolbar.

**Syntax:**
```html
<meta type="xrm/designer/setting"
      name="additional-fonts"
      datatype="font"
      value="Roboto;Open Sans;Lato">
```

**Format:** Semicolon-separated list of font names

**Effect:** These fonts appear in the font dropdown when users edit text elements.

---

### Protection and Locking Features

Control what users can edit to maintain brand consistency and protect critical template sections.

#### Lock Container Content (Hard Lock)

**Purpose:** Make all content within a container completely read-only.

**Syntax:**
```html
<div data-container="true" data-locked="hard">
  <!-- All content here is read-only -->
</div>
```

**Effect:**
- Users cannot edit, move, or delete elements
- Users cannot add new elements
- Useful for headers, footers, and branding sections

**Example:**
```html
<!-- Locked header section -->
<table width="700">
  <tr>
    <td style="background: #0078d4; padding: 20px;">
      <div data-container="true" data-locked="hard">
        <img src="logo.png" alt="Company Logo" width="200">
        <h1 style="color: white;">Company Newsletter</h1>
      </div>
    </td>
  </tr>

  <!-- Editable content section -->
  <tr>
    <td style="padding: 20px;">
      <div data-container="true">
        <!-- Users can edit this area -->
      </div>
    </td>
  </tr>
</table>
```

---

#### Protect Individual Elements

**Purpose:** Prevent editing element properties while allowing users to see and work around the element.

**Syntax:**
```html
<div data-editorblocktype="{type}" data-protected="true">
  <!-- Properties cannot be edited -->
</div>
```

**Effect:**
- Element appears in designer
- Users cannot edit properties in the Properties panel
- Users cannot delete the element
- Element can still be moved within the container (unless container is also locked)

**Example:**
```html
<div data-container="true">
  <!-- Protected divider - can't be edited or removed -->
  <div data-editorblocktype="Divider" data-protected="true">
    <hr style="border: 2px solid #0078d4;">
  </div>

  <!-- Editable text -->
  <div data-editorblocktype="Text">
    <p>Users can edit this text.</p>
  </div>
</div>
```

---

### Complete Basic Example

Here's a minimal template demonstrating all core custom attributes:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">

  <!-- 1. Enable drag-and-drop designer -->
  <meta type="xrm/designer/setting"
        name="type"
        value="marketing-designer-content-editor-document">

  <!-- 2. Define style settings -->
  <meta type="xrm/designer/setting"
        name="brand-color"
        value="#0078d4"
        datatype="color"
        label="Brand Color">

  <meta type="xrm/designer/setting"
        name="logo-image"
        value="logo.png"
        datatype="picture"
        label="Logo">

  <!-- 3. Apply settings in CSS -->
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }

    .header {
      background-color: /* @brand-color */ #0078d4 /* @brand-color */;
      color: white;
      padding: 20px;
      text-align: center;
    }

    .content {
      padding: 20px;
      max-width: 700px;
      margin: 0 auto;
    }
  </style>
</head>

<body>
  <!-- Locked header section -->
  <div class="header">
    <div data-container="true" data-locked="hard">
      <img property-reference="src:@logo-image;"
           alt="Company Logo"
           width="200"
           style="display: block; margin: 0 auto;">
      <h1>Newsletter Template</h1>
    </div>
  </div>

  <!-- Editable content area -->
  <div class="content">
    <div data-container="true">
      <!-- Text element -->
      <div data-editorblocktype="Text">
        <h2>Welcome!</h2>
        <p>This content is editable by users through the designer.</p>
      </div>

      <!-- Image element -->
      <div data-editorblocktype="Image">
        <!-- Image managed by designer -->
      </div>

      <!-- Button element -->
      <div data-editorblocktype="Button">
        <!-- Button managed by designer -->
      </div>
    </div>
  </div>
</body>
</html>
```

**What Users Can Do:**
- Change the brand color via Styles panel (updates header background)
- Change the logo via Styles panel (updates header image)
- Edit the text content in the main area
- Add/remove/edit images and buttons in the content area
- **Cannot** edit or remove the header section (it's locked)

---

### Quick Reference: Essential Attributes

**Every template needs:**
```html
<!-- In <head> - enables designer mode -->
<meta type="xrm/designer/setting" name="type"
      value="marketing-designer-content-editor-document">

<!-- In <body> - creates editable area -->
<div data-container="true">
  <!-- Content here -->
</div>

<!-- Inside containers - defines element type -->
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

All templates must contain Header code, as defined in header.md
All templates must contain Script code, as defined in script.md
All templates must contain CSS code, as defined in CSS.md

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
        <h1>Preference Center</h1>
        <p>Page content here.</p>
      </div>
    </div>
  </div>
</body>
</html>
```

---

## Preference Center Elements

Preference centers are specialized form templates used for managing email subscription preferences. They use custom D365 elements and require specific scripts to function.

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

### Preference Center Element Types

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

**For complete Preference Center documentation, see:** [/docs-pc.md](/docs-pc.md)

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






## Additional Resources

### Microsoft Documentation

- [Design Elements Reference](https://learn.microsoft.com/dynamics365/customer-insights/journeys/content-blocks)
- [Designer Feature Protection](https://learn.microsoft.com/dynamics365/customer-insights/journeys/designer-feature-protection)
- [Dynamic Content Implementation](https://learn.microsoft.com/dynamics365/customer-insights/journeys/dynamic-email-content)
- [Email Design Requirements](https://learn.microsoft.com/dynamics365/customer-insights/journeys/email-design)

### Quick Reference Cards





---

**Document Version:** 2.0  
**Source:** Microsoft Learn - Dynamics 365 Customer Insights  
**Last Updated:** October 2025  
**Compliance:** RFC 2119 (Requirement Levels)  
**Optimized For:** LLM Code Generation
