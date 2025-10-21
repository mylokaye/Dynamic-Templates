# Dynamics 365 Form Templates


## Conceptual Overview

This section provides a high-level understanding of the different form types available in Dynamics 365 Customer Insights, their intended use cases, and the key considerations when designing forms for marketing, event registration, and consent management. Use this as a starting point to plan and implement forms that meet both business and technical requirements.

### Form Types and Use Cases
Each form type serves a specific purpose in Dynamics 365 Customer Insights marketing workflows:

### Form Types
- **Marketing Forms:**
  - Purpose: Capture new leads or contacts
  - Target: Lead or contact audience
  - Features: Standard form fields, validation, submission handling

- **Event Registration Forms:**
  - Purpose: Allow registration to events
  - Target: Contact audience only
  - Special Components:
    - Session list selector
    - Speaker information
    - Event details display
    - Registration record creation

- **Preference Centers:**
  - Purpose: Manage consent preferences for contacts
  - Target: Existing contacts
  - Features: Consent management, subscription preferences
  - Full Preference Center documentation: [/docs-pc.md](/docs-pc.md)

### Form Audience Configuration
- Marketing forms: Target leads or contacts
- Event forms: Can only target contact audience
- Preference centers: Target existing contacts for consent management



## Technical Requirements


### Form Element Types

Complete list of available form elements:

| Element | `data-editorblocktype` | Purpose |
|---------|----------------------|---------|
| Form container | `FormBlock` | Wraps entire form (required) |
| Email field | `Field-email` | Email input |
| Text fields | `Field-firstname`, `Field-lastname` | Text inputs |
| Custom field | `Field-{name}` | Any CRM field (use logical name) |
| Checkbox | `Field-checkbox` | Checkbox field |
| Submit button | `SubmitButtonBlock` | Form submission (required) |
| Reset button | `ResetButtonBlock` | Form reset |
| Captcha | `CaptchaBlock` | Captcha verification |
| Subscription list | `SubscriptionListBlock` | Subscription options |
| Forward to friend | `ForwardToFriendBlock` | Forward functionality |

### Default form fields for Contacts & Leads

Field | Logical name

Contact / First Name (firstname)
Contact / Last Name (lastname)
Contact / Email (emailaddress1)

Lead | Logical name
Lead / First Name (firstname)
Lead / Last Name (lastname)
Lead / Email (emailaddress1)
Lead / Mobile phone (mobilephone)
Lead / Company name (companyname)


### Field Properties
Each form field supports the following properties:

| Property | Description | Example |
|----------|-------------|---------|
| Placeholder | Text shown when field is empty | "Enter your email" |
| Default Value | Pre-filled value | "newsletter@example.com" |
| Required | Makes field mandatory | true/false |
| Validation | Input validation rule | Custom RegExp |
| Hidden | Hide field from view | true/false |

### Accessibility

Design forms to be usable by everyone, including people using assistive technologies. Follow these best practices:

- **Label every field clearly:** Use `<label>` elements linked to inputs via `for` and `id` attributes.
- **Keyboard navigation:** Ensure all interactive elements (fields, buttons, checkboxes) are reachable and usable via Tab/Shift+Tab.
- **ARIA roles and attributes:** Use ARIA attributes (e.g., `aria-required`, `aria-label`, `aria-describedby`) for custom controls or when native semantics are missing.
- **Error messages:** Make error messages visible to screen readers (e.g., use `aria-live="polite"` on error containers).
- **Contrast and focus:** Use sufficient color contrast and clear focus indicators for all controls.
- **Group related fields:** Use `<fieldset>` and `<legend>` for related groups (e.g., consent checkboxes).
- **Accessible submit button:** Ensure the submit button is a `<button>` or `<input type="submit">` and is clearly labeled.
- **Test with screen readers:** Validate form usability with VoiceOver (macOS), NVDA, or JAWS.



## Implementation Guide

Both the header structure and body structure are required in each form in order to function. 

### Header Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Required: Designer Mode Activation -->
    <meta type="xrm/designer/setting" 
          name="type" 
          value="marketing-designer-content-editor-document">

    <!-- Required: Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Tailwind Configuration -->
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: {
                            DEFAULT: /* @brand-color */ '#0078d4' /* @brand-color */
                        }
                    },
                    fontFamily: {
                        roboto: ['Roboto', 'sans-serif']
                    }
                }
            }
        }
    </script>

    <!-- Google Fonts: Roboto -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
</head>
```



### Body Structure
```html
<body>
    <div class="form-container">
        <!-- Form Wrapper -->
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


### Complete Form Example

[/form-example.html](/form-example.html)

### Advanced styling

Using Tailwind CSS enables faster forms due to the CSS being hosted externally.

1. Typography
   - Use `font-roboto` for consistent font family
   - Headers: `font-medium` (500 weight)
   - Body: `font-normal` (400 weight)

2. Colors
   - Brand color: `text-brand` or `bg-brand`
   - Background: `bg-gray-50` for form background
   - Text: `text-gray-900` for primary text
   - Secondary text: `text-gray-500`

3. Spacing
   - Container padding: `p-8`
   - Between fields: `mb-4`
   - Section spacing: `mb-8`

4. Layout
   - Container width: `max-w-3xl`
   - Center alignment: `mx-auto`
   - Responsive padding: `px-4 sm:px-6 lg:px-8`




### Form Template Structure

Basic form structure requirements:

```html
<div data-container="true">
  <div data-editorblocktype="FormBlock">

    <!-- Email field (typically required) -->
    <div data-editorblocktype="Field-email">
      <!-- Managed by designer -->
    </div>

    <!-- First name field (optional) -->
    <div data-editorblocktype="Field-firstname">
      <!-- Managed by designer -->
    </div>

    <!-- Last name field (optional) -->
    <div data-editorblocktype="Field-lastname">
      <!-- Managed by designer -->
    </div>

    <!-- Checkbox example (optional) -->
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

### Implementation Checklist

#### Required Elements
- [ ] Designer meta tag in `<head>`
- [ ] FormBlock wrapper for form content
- [ ] At least one input field (typically email)
- [ ] SubmitButtonBlock component

#### Form Configuration
- [ ] Configure field validation in Properties panel
- [ ] Set required fields
- [ ] Configure form submission behavior
- [ ] Test form submission
- [ ] Validate error messages display correctly

#### Accessibility
- [ ] All fields have proper labels
- [ ] Labels linked to inputs via `for` and `id`
- [ ] Keyboard navigation works
- [ ] Error messages visible to screen readers
- [ ] Sufficient color contrast
- [ ] Focus indicators visible

#### Testing
- [ ] Test form submission
- [ ] Validate required fields
- [ ] Check mobile responsiveness
- [ ] Test with screen reader
- [ ] Verify data saves to CRM correctly

