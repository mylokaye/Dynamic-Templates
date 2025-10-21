# Dynamics 365 Customer Insights - Template Documentation

**Complete Reference for Email, Form & Page Templates**

---

```yaml
document_type: comprehensive_documentation
target_audience: developers, marketers, LLM_code_generation
supported_outputs: [email, form, page, preference_center]
version: 3.0
last_updated: 2025-10-21
platform: Dynamics 365 Customer Insights Journeys 1.1.59247.103
```

---

## Table of Contents

1. [Introduction & Quick Start](#introduction--quick-start)
2. [Template Type Decision Tree](#template-type-decision-tree)
3. [Custom Attributes & Settings](#custom-attributes--settings)
4. [Style Configuration System](#style-configuration-system)
5. [Email Templates](#email-templates)
6. [Form Templates](#form-templates)
7. [Page Templates](#page-templates)
8. [Preference Center](#preference-center)
9. [Design Elements Reference](#design-elements-reference)
10. [Component Library](#component-library)
11. [LLM Prompt Templates](#llm-prompt-templates)
12. [Anti-Patterns & Corrections](#anti-patterns--corrections)
13. [Production Reference Implementations](#production-reference-implementations)
14. [Additional Resources](#additional-resources)

---

## Introduction & Quick Start

### Required Header code

```html
<!DOCTYPE html><html><head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Template</title>
        <meta name="referrer" content="never">
        <meta type="xrm/designer/setting" name="type" value="marketing-designer-content-editor-document">
        <meta type="xrm/designer/setting" name="layout-editable" value="marketing-designer-layout-editable">
        <meta type="xrm/designer/setting" name="additional-fonts" datatype="font" value="<Inter>">
```

### What Are Custom Attributes?

Dynamics 365 Customer Insights uses custom HTML attributes to transform standard HTML templates into interactive, drag-and-drop experiences within the marketing designer. These attributes enable:

- Drag-and-drop element placement
- Visual editing interfaces (Toolbox, Properties, Styles panels)
- Declarative style controls
- Content protection mechanisms

### Essential Attributes (All Types)

Every template requires these three core elements:

```html
<!-- 1. Enable drag-and-drop designer (in <head>) -->
<meta type="xrm/designer/setting" name="type" value="marketing-designer-content-editor-document">

<!-- 2. Create editable container (in <body>) -->
<div data-container="true">
  <!-- Users can drag elements here -->
</div>

<!-- 3. Define design element -->
<div data-editorblocktype="Text">
  <p>Content</p>
</div>
```

---

## Template Type Decision Tree

### Overview

| Type | Primary Use | Layout Method | Width Constraint | Special Requirements |
|------|-------------|---------------|------------------|---------------------|
| **Email** | Marketing emails, newsletters | Tables | 700-800px | Strict email client compatibility |
| **Form** | Lead capture, surveys | Tables or divs | Flexible | Form validation elements |
| **Page** | Preference Center, Landing pages | Tables or divs | Flexible | More CSS flexibility |

### Decision Tree

```
START: What are you building?
│
├─→ EMAIL TEMPLATE
│   ├─→ Width: 700px (preferred)
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
└─→ PAGE/PREFERENCE CENTER TEMPLATE
    ├─→ Width: Flexible
    ├─→ Layout: Divs preferred, tables allowed
    ├─→ CSS: Full styling support
    └─→ Validation: HTML5 allowed
```

---

## Custom Attributes & Settings

### 1. Enable Drag-and-Drop Designer Mode

Activate the marketing designer's drag-and-drop functionality.

**Attribute:**
```html
<meta type="xrm/designer/setting"
      name="type"
      value="marketing-designer-content-editor-document">
```

**Location:** Must be in `<head>` section

**Parameters:**
- `type` (required): MUST be "xrm/designer/setting"
- `name` (required): MUST be "type"
- `value` (required): MUST be "marketing-designer-content-editor-document"

**Effect:** Activates Toolbox, Properties, Styles panels and drag-and-drop editing

**Without This:** Template displays in simplified full-page editor mode

---

### 2. Container Declaration

Define regions where users can drag design elements.

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

**Multiple Containers Example:**
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
</table>
```

---

### 3. Design Element Types

Identify element type for designer rendering.

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
| `Marketing Page` | Marketing page reference |
| `Event` | Event information |
| `Survey` | Survey embeds |

**Form Types:**

| Type | Use |
|------|-----|
| `FormBlock` | Form container |
| `Field-email` | Email input field |
| `Field-firstname` | First name field |
| `Field-lastname` | Last name field |
| `Field-{name}` | Custom field |
| `Field-checkbox` | Checkbox field |
| `SubmitButtonBlock` | Submit button |
| `ResetButtonBlock` | Reset button |
| `CaptchaBlock` | Captcha |
| `SubscriptionListBlock` | Subscription list |
| `ForwardToFriendBlock` | Forward to friend |

Examples:
```html
//Image element
<div data-container="true" data-editorblocktype="Image">
  <img src="image-url.jpg" alt="description">
</div>

//Divider element
<div data-container="true" data-editorblocktype="Divider"></div>

//Button element
<div data-container="true" data-editorblocktype="Button">
  <a href="#">Button Text</a>
</div>

//Content block element
<div data-container="true" data-editorblocktype="Content" datatype="text">
  Content here
</div>

//Marketing-page element
<div data-container="true" data-editorblocktype="Marketing Page"></div>

//Event element
<div data-container="true" data-editorblocktype="Event"></div>

//Survey element
<div data-container="true" data-editorblocktype="Survey"></div>

//Form element
<div data-container="true" data-editorblocktype="FormBlock">
  <form></form>
</div>

//Field element
<div data-container="true" data-editorblocktype="Field-email">
  <input type="email" name="email">
</div>

//Subscription-list element
<div data-container="true" data-editorblocktype="SubscriptionListBlock"></div>

//Forward-to-a-friend element
<div data-container="true" data-editorblocktype="ForwardToFriendBlock"></div>

//Do-not-email and Remember-me element
<div data-container="true" data-editorblocktype="Field-checkbox">
  <input type="checkbox">
</div>

//Submit-button element
<div data-container="true" data-editorblocktype="SubmitButtonBlock">
  <button type="submit">Submit</button>
</div>

//Reset-button element
<div data-container="true" data-editorblocktype="ResetButtonBlock">
  <button type="reset">Reset</button>
</div>

//Captcha element
<div data-container="true" data-editorblocktype="CaptchaBlock"></div>
```
---

### 4. Protection and Locking Features

Control what users can edit to maintain brand consistency.

**Lock Container Content (Hard Lock):**
```html
<div data-container="true" data-locked="hard">
  <!-- All content here is read-only -->
</div>
```

**Protect Individual Elements:**
```html
<div data-editorblocktype="{type}" data-protected="true">
  <!-- Properties cannot be edited -->
</div>
```

---

## Style Configuration System

### Style Declaration

Create customizable settings on Styles panel.

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

### Custom Fonts

Add fonts to text toolbar:
```html
<meta type="xrm/designer/setting"
      name="additional-fonts"
      datatype="font"
      value="Roboto;Open Sans;Lato">
```

---

## Email Templates

### Overview

Email templates have strict requirements due to email client limitations. Design for the most restrictive clients (T-Online.de and Outlook).

**Critical Requirements:**
- Width: 700px (preferred) to 800px max
- Layout: Table-based ONLY (no div layouts)
- CSS: Inline styles + embedded `<style>` tag
- No media queries
- No CSS background images (use `<img>` instead)
- No border-radius dependencies
- Include fallback fonts
- HTML4/XHTML validation

**What's Supported:**
- ✓ Table layouts
- ✓ Inline CSS
- ✓ `<img>` tags
- ✓ Animated GIFs
- ✓ Headers, paragraphs

**What's NOT Supported:**
- ✗ Media queries
- ✗ CSS background-image
- ✗ Border-radius (unreliable)
- ✗ Form controls
- ✗ CSS animations/transitions
- ✗ `<video>`

**For complete email documentation, see:** [docs/email.md](docs/email.md)

### Quick Start

Minimal working email template:

```html
<!DOCTYPE html>
<html>
<head>
  <meta type="xrm/designer/setting" name="type" value="marketing-designer-content-editor-document">
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
  </style>
</head>
<body>
  <table width="700" align="center">
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

---

## Form Templates

### Overview

Form templates are used for lead capture, surveys, event registration, and data collection in Dynamics 365 Customer Insights.

**Key Requirements:**
- Must include `FormBlock` wrapper
- At least one input field (typically email)
- `SubmitButtonBlock` for submission
- Can use divs or tables for layout
- HTML5 validation supported
- Full CSS flexibility

**Common Form Types:**
- Marketing forms (lead/contact capture)
- Event registration forms
- Survey forms
- Preference centers (consent management)

**For complete form documentation, see:** [docs/form.md](docs/form.md)

### Quick Start

Minimal working form template:

```html
<!DOCTYPE html>
<html>
<head>
  <meta type="xrm/designer/setting" name="type" value="marketing-designer-content-editor-document">
</head>
<body>
  <div data-container="true">
    <div data-editorblocktype="FormBlock">
      <div data-editorblocktype="Field-email"></div>
      <div data-editorblocktype="SubmitButtonBlock"></div>
    </div>
  </div>
</body>
</html>
```

---

## Page Templates

### Overview

Page templates (landing pages, content pages) have full CSS flexibility and no layout restrictions.

**Key Features:**
- Divs preferred, tables allowed
- Full CSS support (media queries, background images, border radius)
- Responsive design fully supported
- Flexible width (no 700-800px constraint)
- HTML5 validation
- Media queries allowed

**Common Uses:**
- Landing pages
- Content pages
- Thank you pages
- Unsubscribe pages

**For complete page documentation, see:** [docs/page.md](docs/page.md)

### Quick Start

Minimal working page template:

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
        <h1>Page Title</h1>
        <p>Page content here.</p>
      </div>
    </div>
  </div>
</body>
</html>
```

---

## Preference Center

### Overview

Preference centers are specialized form templates for managing email subscription preferences and consent.

**Key Elements:**
- `Topic` - Individual subscription topic checkbox
- `Purpose` - Brand/purpose group with unsubscribe option
- `ContactOptIn` - Email address display and channel selector

**Requirements:**
- Must include D365 scripts before closing `</body>` tag
- Typically uses multi-column layout (3 columns for multi-brand)
- Each column has container for draggable Topic/Purpose elements

**For complete preference center documentation, see:** [docs/preference-center.md](docs/preference-center.md)

---

## Design Elements Reference

### Complete Element Examples

**Text Element:**
```html
<div data-editorblocktype="Text">
  <h1>Heading</h1>
  <p>Paragraph text</p>
</div>
```

**Image Element:**
```html
<div data-editorblocktype="Image">
  <img src="image-url.jpg" alt="description">
</div>
```

**Button Element:**
```html
<div data-editorblocktype="Button">
  <a href="#">Button Text</a>
</div>
```

**Divider Element:**
```html
<div data-editorblocktype="Divider"></div>
```

**Content Block Element:**
```html
<div data-editorblocktype="Content" datatype="text">
  Content here
</div>
```

**Marketing Page Element:**
```html
<div data-editorblocktype="Marketing Page"></div>
```

**Event Element:**
```html
<div data-editorblocktype="Event"></div>
```

**Survey Element:**
```html
<div data-editorblocktype="Survey"></div>
```

**Form Element:**
```html
<div data-editorblocktype="FormBlock">
  <form></form>
</div>
```

**Field Element:**
```html
<div data-editorblocktype="Field-email">
  <input type="email" name="email">
</div>
```

**Checkbox Element:**
```html
<div data-editorblocktype="Field-checkbox">
  <input type="checkbox">
</div>
```

**Subscription List Element:**
```html
<div data-editorblocktype="SubscriptionListBlock"></div>
```

**Forward to Friend Element:**
```html
<div data-editorblocktype="ForwardToFriendBlock"></div>
```

**Submit Button Element:**
```html
<div data-editorblocktype="SubmitButtonBlock">
  <button type="submit">Submit</button>
</div>
```

**Reset Button Element:**
```html
<div data-editorblocktype="ResetButtonBlock">
  <button type="reset">Reset</button>
</div>
```

**Captcha Element:**
```html
<div data-editorblocktype="CaptchaBlock"></div>
```

---

## Component Library

### Copy-Paste Ready Components

**Header with Logo:**
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

**Two-Column Layout (Email-Safe):**
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

**Call-to-Action Button (Email-Safe):**
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

**Footer with Social Links:**
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

**Hero Image Section:**
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

**Content Section with Heading:**
```html
<table width="100%">
  <tr>
    <td style="padding: 30px;">
      <div data-container="true">
        <div data-editorblocktype="Text">
          <h2 style="color: #333; margin: 0 0 15px 0;">Section Heading</h2>
          <p style="color: #666; line-height: 1.6; margin: 0;">
            Your content goes here.
          </p>
        </div>
      </div>
    </td>
  </tr>
</table>
```

**Spacer Row:**
```html
<table width="100%">
  <tr>
    <td style="height: 30px; line-height: 30px;">&nbsp;</td>
  </tr>
</table>
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
- Page type: [Preference Center/landing page/content page]
- Layout: [sections and structure]
- Responsive: [yes/no]
- Style customization: [colors, fonts, spacing]

Requirements:
- Use div-based or table-based layout
- Include drag-and-drop containers in [specify areas]
- Lock [specify sections]
```

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

**Result:** Template loads in simple full-page editor mode without drag-and-drop

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

**Result:** Users cannot drag any elements into the template

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

**Result:** Inconsistent rendering across email clients

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

**Result:** Horizontal scrolling or clipping in email clients

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

**Result:** Media queries ignored or blocked by T-Online.de and Outlook

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

**Result:** Background image not displayed in many email clients

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

**Result:** Text collapses to 0px height in some email clients

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

**Result:** Link breaks in T-Online.de email client

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

**Result:** Text displays in default system font when custom font unavailable

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

**Result:** Changes overwritten when element properties updated in Designer

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

**Result:** Second style block may be ignored by designer parser

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

### ❌ Anti-Pattern 12: Style Settings Not Referenced

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

**Result:** Setting does not appear on Styles panel

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

### ❌ Anti-Pattern 13: Invalid HTML in Email

**Problem:**
```html
<xml>
  <data>Custom data</data>
</xml>
```

**Result:** Email blocked by T-Online.de due to invalid HTML

**✓ Correction:**
Remove all non-standard HTML elements. Use only HTML4/XHTML compliant tags.

---

### ❌ Anti-Pattern 14: Form Elements in Email

**Problem:**
```html
<input type="email" placeholder="Enter email">
<button type="submit">Submit</button>
```

**Result:** Form controls not supported in email templates

**✓ Correction:**
Use form elements only in Form templates, not Email templates. In emails, link to a landing page with a form instead.

---

## Production Reference Implementations

See complete production-ready templates in `/templates/` directory:
- `contact-form.html` - Full contact form with validation
- `preference-center.html` - Multi-brand preference center

---

## Additional Resources

### Microsoft Documentation

- [Design Elements Reference](https://learn.microsoft.com/dynamics365/customer-insights/journeys/content-blocks)
- [Designer Feature Protection](https://learn.microsoft.com/dynamics365/customer-insights/journeys/designer-feature-protection)
- [Dynamic Content](https://learn.microsoft.com/dynamics365/customer-insights/journeys/dynamic-email-content)
- [Email Design Requirements](https://learn.microsoft.com/dynamics365/customer-insights/journeys/email-design)

### External Resources

- [Megan V. Walker's Blog](https://meganvwalker.com) - Dynamics 365 customization articles
- W3C HTML Validator - For validating email templates

---

**Document Version:** 3.0
**Last Updated:** October 21, 2025
**Platform:** Dynamics 365 Customer Insights Journeys 1.1.59247.103
