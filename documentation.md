# Dynamics 365 Customer Insights - Template Documentation

**Complete Reference for Email, Form & Page Templates**

---

```yaml
document_type: comprehensive_documentation
target_audience: developers, marketers, LLM_code_generation
supported_outputs: [email, form, page, preference_center]
version: 3.1
last_updated: 2025-10-21
platform: Dynamics 365 Customer Insights Journeys 1.1.59247.103
```

---

## Table of Contents

1. [Introduction & Quick Start](#introduction--quick-start)
2. [Template Type Decision Tree](#template-type-decision-tree)
3. [Custom Attributes & Settings](#custom-attributes--settings)
4. [Style Configuration System](#style-configuration-system)

**Template-Specific Documentation:**
- [Email Templates](docs/email.md)
- [Form Templates](docs/form.md)
- [Page Templates](docs/page.md)
- [Preference Center](docs/preference-center.md)

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

### Common Element Examples

**Text Element:**
```html
<div data-container="true">
  <div data-editorblocktype="Text">
    <h1>Heading</h1>
    <p>Paragraph text</p>
  </div>
</div>
```

**Image Element:**
```html
<div data-container="true">
  <div data-editorblocktype="Image">
    <img src="image-url.jpg" alt="description">
  </div>
</div>
```

**Button Element:**
```html
<div data-container="true">
  <div data-editorblocktype="Button">
    <a href="#">Button Text</a>
  </div>
</div>
```

**Divider Element:**
```html
<div data-container="true">
  <div data-editorblocktype="Divider"></div>
</div>
```

**Content Block Element:**
```html
<div data-container="true">
  <div data-editorblocktype="Content" datatype="text">
    Content here
  </div>
</div>
```

**Marketing Page Element:**
```html
<div data-container="true">
  <div data-editorblocktype="Marketing Page"></div>
</div>
```

**Event Element:**
```html
<div data-container="true">
  <div data-editorblocktype="Event"></div>
</div>
```

**Survey Element:**
```html
<div data-container="true">
  <div data-editorblocktype="Survey"></div>
</div>
```

### Form Element Examples

**Form with Fields:**
```html
<div data-container="true">
  <div data-editorblocktype="FormBlock">

    <!-- Email field -->
    <div data-editorblocktype="Field-email"></div>

    <!-- Checkbox field -->
    <div data-editorblocktype="Field-checkbox"></div>

    <!-- Submit button -->
    <div data-editorblocktype="SubmitButtonBlock"></div>

  </div>
</div>
```

**Subscription List Element:**
```html
<div data-container="true">
  <div data-editorblocktype="SubscriptionListBlock"></div>
</div>
```

**Forward to Friend Element:**
```html
<div data-container="true">
  <div data-editorblocktype="ForwardToFriendBlock"></div>
</div>
```

**Reset Button Element:**
```html
<div data-container="true">
  <div data-editorblocktype="ResetButtonBlock"></div>
</div>
```

**Captcha Element:**
```html
<div data-container="true">
  <div data-editorblocktype="CaptchaBlock"></div>
</div>
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

**Document Version:** 3.1
**Last Updated:** October 21, 2025
**Platform:** Dynamics 365 Customer Insights Journeys 1.1.59247.103
