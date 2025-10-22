22-10-2025
**Contact Form V2 - Error Message Styling Update**

Updated error message styling to match form-prototype.html validation message design

Changed error display to flexbox layout with icon and text side-by-side

Added warning icon (⚠) with #F5A623 color for better visual feedback

Updated error text to 16px font size and #666 color for improved readability

Removed shake animation from error messages for cleaner presentation

**Contact Form V2 - Floating Label Design**

Created contact-form-v2.html with new floating label field styling

Updated form field containers with position: relative and margin-bottom: 32px

Implemented floating labels with absolute positioning at top of fields (font-size: 22px, background: white, color: #000)

Applied new input wrapper styling with 0.2rem border and calc(1.5em + 3.8rem) height

Added hover state with border-color: #000 for enhanced interactivity

Added focus state with border-color: #000 for clear user feedback

Updated placeholder color to #BDBDBD for consistent visual hierarchy

Added optional field styling with lighter border-color: #9E9E9E for non-required fields

Updated required asterisk color to #dc0000 for better visibility

Maintained all Dynamics 365 custom attributes and accessibility standards

**Documentation Improvements and Cleanup**

Fixed typo in docs/email.md (Documentation was misspelled as "Documentaiton")

Removed duplicate content from docs/email.md (entire Email Templates section was duplicated)

Created missing docs/page.md file referenced in documentation.md Table of Contents

Added comprehensive page template documentation with responsive design examples

Removed massive duplicate content from docs/preference-center.md (file reduced from 1044 to 587 lines)

Reorganized preference-center.md with clear sections: Overview, Elements, Layout, Examples, Checklist

Fixed broken reference in docs/form.md (changed /docs-pc.md to preference-center.md)

All template-specific documentation now consistent and non-redundant

21-10-2025
**Documentation Cleanup - Template Details Moved**

Removed all template-specific content from documentation.md (Email, Form, Page, Preference Center sections)

Removed Component Library, LLM Prompt Templates, Anti-Patterns sections

Removed Production Reference Implementations section

documentation.md now focused on core concepts: Custom Attributes, Style Configuration, Design Elements

Updated Table of Contents to link to template-specific docs in docs/ folder

Version updated to 3.1

**Design Element Examples Added**

Added Common Element Examples section to documentation.md (section 3)

Added Form Element Examples section to documentation.md (section 3)

Corrected structure: containers wrap design elements (data-container separate from data-editorblocktype)

All examples now in proper HTML blocks for readability

**Documentation Restructure**

Made documentation.md high-level overview with links to detailed docs

Simplified Email, Form, Page, Preference Center sections to quick start guides

Enhanced docs/form.md with comprehensive form element types and checklists

Added Form Template Structure section to docs/form.md

Added complete implementation checklist to docs/form.md

Each template type now has brief overview + link to detailed documentation

**Documentation Merge**

Merged documentation.md and llm.md into comprehensive single file

Added complete Design Elements Reference with all element examples

Added Component Library with copy-paste ready components

Added LLM Prompt Templates section

Removed duplicate content from both files

Organized into 14 major sections for easy navigation

Backed up old files as documentation-old.md and llm-old.md

**Contact Form CSS Reorganization**

Reorganized CSS with structured sections for better maintainability

Added section headers: External Resources, Reset & Base, Typography, Buttons, Form Validation, Animations, Layout, D365 Blocks, Form Fields, Radio/Checkboxes, Notifications, Modal

Added inline comments throughout CSS (one line per comment)

**CLAUDE.md Development Guide**

Clarified Single-File Architecture section (external resources like Google Fonts ARE allowed)



Added comprehensive development guide for Claude AI assistant

Added Communication Preferences section (simple, clear, minimal responses preferred)

Added coding conventions section with comment style guidelines (one line per comment)

Added changelog management requirements for tracking all code changes

Added file organization guidelines (new templates in /templates/ folder)

Added protected sections rule (always ask before modifying headers)

Updated accessibility requirements to be CRITICAL priority (WCAG 2.1 AA minimum)

Added primary workflows documentation (create templates, modify templates, add features, fix bugs)


18-10-2025
**Email Validation Enhancements
**

Added intelligent domain typo detection with auto-suggestions (e.g., "gmial.com" → "Did you mean gmail.com?")

Implemented disposable email blocking for 11+ temporary email providers (mailinator, tempmail, guerrillamail, etc.)

Added RFC 5321 email length validation (254 character maximum)

Implemented TLD validation to ensure proper domain extensions (minimum 2 characters)

Added pattern validation to prevent leading/trailing dots, consecutive dots, and invalid characters

Keyboard accessibility: Press Enter or Tab to auto-accept suggested email corrections

**Form Validation System
**
Created modular validation system with three specialized validators: NameValidator, EmailValidator, and MessageValidator

Implemented progressive error display: errors only appear after user leaves field (blur event), not while typing

Added real-time form state tracking with dynamic button enable/disable based on all fields' validity

Name fields require 2+ characters and only accept letters, spaces, hyphens, and apostrophes

Message field requires 3-2000 characters with internal validation (no visible character counter)
