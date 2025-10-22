# Preference Center Templates

## Preference Center Overview

Preference center templates are a specialized type of form template used for managing email subscription preferences. They allow users to select which topics they want to receive communications about and provide unsubscribe options.

---

## Key Differences from Standard Forms

| Feature | Standard Form | Preference Center |
|---------|--------------|-------------------|
| Purpose | Lead/contact capture | Subscription management |
| Target Audience | New or existing contacts | Existing contacts only |
| Special Elements | Standard form fields | Topic, Purpose, ContactOptIn |
| Required Scripts | Standard D365 form scripts | Preference center scripts |
| Layout | Single column typical | Multi-column grid typical |

---

## Required D365 Scripts

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

---

## Preference Center Elements

Preference centers use three special draggable elements:

| Element | `data-editorblocktype` | Purpose |
|---------|----------------------|---------|
| Topic | `Topic` | Individual subscription topic checkbox |
| Purpose | `Purpose` | Brand/purpose group with unsubscribe option |
| ContactOptIn | `ContactOptIn` | Email address display and channel selector |

### Topic Element

Represents an individual subscription topic (e.g., "Monthly Newsletter", "Product Updates"):

```html
<div data-editorblocktype="Topic">
  <!-- Topic checkbox managed by designer -->
  <!-- Users drag this from Toolbox into containers -->
</div>
```

### Purpose Element

Represents a brand or purpose group with an "unsubscribe from all" option:

```html
<div data-editorblocktype="Purpose">
  <!-- Purpose unsubscribe option managed by designer -->
  <!-- Typically placed at bottom of each brand column -->
</div>
```

### ContactOptIn Element

Displays the contact's email address and channel preferences:

```html
<div data-editorblocktype="ContactOptIn" data-channels="Email">
  <!-- Email display managed by designer -->
  <!-- Channel selector managed by designer -->
</div>
```

**Placement:** Typically placed after all Topic/Purpose selections and before the Submit button.

---

## Multi-Column Purpose Layout

Preference centers typically display multiple brands or purposes in a grid layout. Each column represents one brand or purpose group:

```html
<table width="100%" style="border-spacing: 20px;">
  <tr>
    <!-- Column 1 - Brand A -->
    <td data-container="true" width="33%" style="vertical-align: top;">
      <!-- Logo -->
      <div data-editorblocktype="Image">
        <img src="brand-a-logo.png" alt="Brand A Logo">
      </div>

      <!-- Topics: Drag Topic elements here from Toolbox -->
      <!-- Each topic = one subscription option for this brand -->

      <!-- Purpose: Unsubscribe from all Brand A communications -->
      <!-- Drag Purpose element here from Toolbox -->
    </td>

    <!-- Column 2 - Brand B -->
    <td data-container="true" width="33%" style="vertical-align: top;">
      <!-- Repeat structure for Brand B -->
    </td>

    <!-- Column 3 - Brand C -->
    <td data-container="true" width="33%" style="vertical-align: top;">
      <!-- Repeat structure for Brand C -->
    </td>
  </tr>
</table>
```

**Design Pattern:**
1. Each column has `data-container="true"` for drag-and-drop
2. Place brand logo/image at top of column
3. Drag multiple Topic elements into column (one per subscription option)
4. Place Purpose element at bottom of column for "unsubscribe all"

---

## Complete Preference Center Structure

### Basic Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preference Center</title>

  <!-- Required: Designer Mode Activation -->
  <meta type="xrm/designer/setting"
        name="type"
        value="marketing-designer-content-editor-document">

  <style>
    /* Your styles */
  </style>
</head>
<body>
  <form>
    <!-- Header Section -->
    <div data-container="true">
      <div data-editorblocktype="Text">
        <h1>Privacy & Preference Center</h1>
        <p>Manage your email preferences below</p>
      </div>
    </div>

    <!-- Multi-column brand/purpose grid -->
    <table width="100%">
      <tr>
        <td data-container="true" width="33%" style="vertical-align: top;">
          <!-- Brand A: Logo + Topics + Purpose -->
        </td>
        <td data-container="true" width="33%" style="vertical-align: top;">
          <!-- Brand B: Logo + Topics + Purpose -->
        </td>
        <td data-container="true" width="33%" style="vertical-align: top;">
          <!-- Brand C: Logo + Topics + Purpose -->
        </td>
      </tr>
    </table>

    <!-- Email display and channel selector -->
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

    <!-- Footer Section -->
    <div data-container="true">
      <div data-editorblocktype="Text">
        <p>Questions? Contact us at privacy@company.com</p>
        <p>&copy; 2025 Company Name. All rights reserved.</p>
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

---

## Production Example: Multi-Brand Preference Center

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preference Center</title>

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
      background-color: #f5f5f5;
    }

    /* Header */
    .header {
      background-color: /* @brand-primary */ #0078d4 /* @brand-primary */;
      color: white;
      padding: 40px 20px;
      text-align: center;
    }

    .header h1 {
      font-size: 32px;
      margin-bottom: 10px;
    }

    /* Main Content */
    .main-content {
      max-width: 1200px;
      margin: 40px auto;
      padding: 0 20px;
    }

    /* Brand Columns */
    .brand-columns {
      background-color: white;
      padding: 40px;
      border-radius: 8px;
      margin-bottom: 30px;
    }

    .brand-column {
      padding: 20px;
      background-color: #fafafa;
      border-radius: 4px;
    }

    .brand-column img {
      max-width: 150px;
      margin-bottom: 20px;
    }

    /* Contact Section */
    .contact-section {
      background-color: white;
      padding: 30px;
      border-radius: 8px;
      margin-bottom: 30px;
    }

    /* Submit Section */
    .submit-section {
      text-align: center;
      padding: 20px;
    }

    /* Footer */
    .footer {
      background-color: #333;
      color: white;
      padding: 30px 20px;
      text-align: center;
      font-size: 14px;
    }

    .footer a {
      color: white;
      text-decoration: none;
    }
  </style>
</head>

<body>
  <form>
    <!-- Header -->
    <header class="header">
      <div data-container="true">
        <div data-editorblocktype="Text">
          <h1>Privacy & Preference Center</h1>
          <p>Manage your email subscription preferences</p>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="main-content">

      <!-- Brand Columns -->
      <div class="brand-columns">
        <table width="100%" style="border-spacing: 20px;">
          <tr>
            <!-- Brand A -->
            <td data-container="true" width="33%" style="vertical-align: top;" class="brand-column">
              <div data-editorblocktype="Image">
                <img src="brand-a-logo.png" alt="Brand A">
              </div>
              <div data-editorblocktype="Text">
                <h3>Brand A Communications</h3>
              </div>
              <!-- Users drag Topic elements here -->
              <!-- Users drag Purpose element here -->
            </td>

            <!-- Brand B -->
            <td data-container="true" width="33%" style="vertical-align: top;" class="brand-column">
              <div data-editorblocktype="Image">
                <img src="brand-b-logo.png" alt="Brand B">
              </div>
              <div data-editorblocktype="Text">
                <h3>Brand B Communications</h3>
              </div>
              <!-- Users drag Topic elements here -->
              <!-- Users drag Purpose element here -->
            </td>

            <!-- Brand C -->
            <td data-container="true" width="33%" style="vertical-align: top;" class="brand-column">
              <div data-editorblocktype="Image">
                <img src="brand-c-logo.png" alt="Brand C">
              </div>
              <div data-editorblocktype="Text">
                <h3>Brand C Communications</h3>
              </div>
              <!-- Users drag Topic elements here -->
              <!-- Users drag Purpose element here -->
            </td>
          </tr>
        </table>
      </div>

      <!-- Contact Email Display -->
      <div class="contact-section">
        <div data-container="true">
          <div data-editorblocktype="ContactOptIn" data-channels="Email">
            <!-- Managed by designer -->
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="submit-section">
        <div data-container="true">
          <div data-editorblocktype="SubmitButtonBlock">
            <!-- Managed by designer -->
          </div>
        </div>
      </div>

    </div>

    <!-- Footer -->
    <footer class="footer">
      <div data-container="true">
        <p>&copy; 2025 Company Name. All rights reserved.</p>
        <p style="margin-top: 10px;">
          <a href="#">Privacy Policy</a> |
          <a href="#">Terms of Service</a> |
          <a href="#">Contact Us</a>
        </p>
      </div>
    </footer>
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

---

## Component Library

### Copy-Paste Ready Components for Preference Centers

#### Header with Logo

```html
<table width="100%" style="background-color: #0078d4;">
  <tr>
    <td style="padding: 20px; text-align: center;">
      <img src="logo.png" alt="Company Logo" width="200" height="60">
      <h1 style="color: white; margin: 10px 0 0 0; font-size: 24px;">Preference Center</h1>
    </td>
  </tr>
</table>
```

#### Two-Column Layout

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

#### Footer with Legal Links

```html
<table width="100%" style="background-color: #f5f5f5;">
  <tr>
    <td style="padding: 20px; text-align: center;">
      <p style="margin: 0 0 10px 0; font-size: 12px; color: #666;">
        © 2025 Company Name. All rights reserved.
      </p>
      <p style="margin: 0; font-size: 12px;">
        <a href="#" style="color: #0078d4; margin: 0 5px;">Privacy Policy</a> |
        <a href="#" style="color: #0078d4; margin: 0 5px;">Terms of Service</a> |
        <a href="#" style="color: #0078d4; margin: 0 5px;">Contact Us</a>
      </p>
    </td>
  </tr>
</table>
```

#### Brand Column Container

```html
<td data-container="true" width="33%" style="padding: 15px; vertical-align: top; background-color: #fafafa;">
  <div data-editorblocktype="Image">
    <img src="brand-logo.png" alt="Brand Name" style="max-width: 120px; margin-bottom: 15px;">
  </div>
  <div data-editorblocktype="Text">
    <h3 style="margin-bottom: 10px;">Brand Name</h3>
    <p style="font-size: 14px; color: #666;">Select the topics you'd like to hear about:</p>
  </div>
  <!-- Users drag Topic elements here -->
  <!-- Users drag Purpose element here at bottom -->
</td>
```

---

## Implementation Checklist

### Required Elements
- [ ] Designer meta tag in `<head>`
- [ ] D365 preference center scripts before `</body>` (contextId, formId, orgId, SerializedData)
- [ ] Multi-column layout structure (typically 2-3 columns)
- [ ] Containers in each column for draggable elements
- [ ] ContactOptIn element for email display
- [ ] SubmitButtonBlock for form submission

### Layout & Design
- [ ] Header section with title and instructions
- [ ] Brand/purpose columns with logos
- [ ] Visual separation between columns
- [ ] Footer with legal links and contact info
- [ ] Consistent spacing and typography

### Draggable Elements (users add these)
- [ ] Topic elements in each brand column
- [ ] Purpose elements at bottom of each column
- [ ] ContactOptIn element after brand selections
- [ ] Submit button at bottom

### Styling
- [ ] Style configuration for brand colors
- [ ] Responsive design (optional but recommended)
- [ ] Clear visual hierarchy
- [ ] Brand consistency

### Testing
- [ ] Test Topic element drag-and-drop
- [ ] Test Purpose element functionality
- [ ] Test ContactOptIn display
- [ ] Verify form submission
- [ ] Test with real contact data
- [ ] Validate preference updates save correctly

---

## Accessibility

Preference centers must follow WCAG 2.1 Level AA guidelines:

- **Labels**: All checkboxes must have associated labels
- **Keyboard Navigation**: All interactive elements keyboard accessible
- **Color Contrast**: Minimum 4.5:1 for text, 3:1 for large text
- **Focus Indicators**: Visible focus states on all controls
- **Screen Reader Support**: Proper ARIA labels and roles
- **Heading Hierarchy**: Logical h1, h2, h3 structure

```html
<!-- Good accessibility example -->
<label for="topic-newsletter">
  <input type="checkbox" id="topic-newsletter" name="newsletter">
  Monthly Newsletter
</label>
```

---

## Additional Resources

### Microsoft Documentation
- [Design Elements Reference](https://learn.microsoft.com/dynamics365/customer-insights/journeys/content-blocks)
- [Designer Feature Protection](https://learn.microsoft.com/dynamics365/customer-insights/journeys/designer-feature-protection)
- [Dynamic Content Implementation](https://learn.microsoft.com/dynamics365/customer-insights/journeys/dynamic-email-content)

### Best Practices
- Use clear, descriptive topic names
- Group related topics by brand or purpose
- Provide clear unsubscribe options
- Include privacy policy link
- Test with real contact data before deployment

---

**Document Version:** 2.0
**Last Updated:** October 22, 2025
**Platform:** Dynamics 365 Customer Insights Journeys 1.1.59247.103
