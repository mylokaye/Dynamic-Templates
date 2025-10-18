# Preference Center Templates

## Preference Center Overview

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
- [ ] Layout structure defined
- [ ] Designer meta tag added
- [ ] Containers for editable areas
- [ ] Style configuration added
- [ ] Responsive CSS (optional)
- [ ] HTML5 validated

---

## Preference Center Templates

### Preference Center-Specific Requirements

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

### Preference Template Checklist

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





---

### Preference Center Page Template

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

## Preference Center Templates

### Preference Center-Specific Requirements

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


## Additional Resources

### Microsoft Documentation

- [Design Elements Reference](https://learn.microsoft.com/dynamics365/customer-insights/journeys/content-blocks)
- [Designer Feature Protection](https://learn.microsoft.com/dynamics365/customer-insights/journeys/designer-feature-protection)
- [Dynamic Content Implementation](https://learn.microsoft.com/dynamics365/customer-insights/journeys/dynamic-email-content)
- [Email Design Requirements](https://learn.microsoft.com/dynamics365/customer-insights/journeys/email-design)


---

**Document Version:** 2.0  
**Source:** Microsoft Learn - Dynamics 365 Customer Insights  
**Last Updated:** October 2025  
**Compliance:** RFC 2119 (Requirement Levels)  
**Optimized For:** LLM Code Generation
