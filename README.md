![https://repository-images.githubusercontent.com/1078737337/458a5796-de1b-4306-b985-40e5db41c48d)


# Dynamics 365 Customer Insights Journeys: Customized Form

A Dynamic Template enabling you to create your own modern, branded Form in Dynamics 365.

Create a great experience for your customers and contacts and help them manage their consent with this fully customizable, WCAG-compliant template for **Customer Insights Journeys** 

This Form has been built from the ground up and is designed to give you complete control over branding, layout, and user experience.

**The Challenge**
The out-of-the-box setup for Form in Dynamics is limited and customization is minimal. This means that the customer experince when landing on your company's Form is sub-par to what is possible.

---

## 📖 Overview

This project provides a production-ready HTML template that extends Dynamics 365's default Form with:

- 🌐 **Multi-language support** – English, Chinese, German with auto-detection
- 🎨 **Complete brand customization** – Simplified 5-color system
- ♿ **WCAG 2.1 Level AA/AAA accessibility** – Fully compliant
- 📱 **Mobile-first responsive design with Dark Mode support** – Smooth animations
- 🌐 **Modern web standards** – Semantic HTML5, CSS Grid, Flexbox
- 🔒 **GDPR & CAN-SPAM compliant** – Legal footer text included
- ⚡ **Performance optimized** – Fast loading, minimal dependencies
- 💬 **Smart notifications** – Dismissible with close button and auto-dismiss
- AND
- ✅ **Semantic HTML5** structure with ARIA landmarks
- ✅ **Keyboard navigation** with visible focus indicators
- ✅ **Screen reader optimized** with proper ARIA attributes
- ✅ **Motion preferences** support (`prefers-reduced-motion`)


### Design & UX
- 🎨 **5 customizable CSS variables** for easy theming
- 🌈 **Browser theme colors** for Chrome, Safari, Edge
- ⚡ **Auto-updating copyright year** via JavaScript

### Developer Experience
- 📝 **JSDoc-style code documentation**
- 🔧 **Single variable brand name replacement**
- 🎯 **Placeholder-based customization** (`[Company Name]`, `[Year]`)
- 📐 **Organized CSS** with table of contents
- 🧩 **Dynamics 365 compatible** – All required attributes preserved
- ✅ **Single-file architecture** – Everything in one HTML file

---

## 🚀 Quick Start

### Basic Setup
Read how to customize the Form: https://github.com/mylokaye/Custom-Preference-Center-Dynamics-365-Customer-Insights/wiki/Customize-Preference-Centre

### 🌐 Multi-Language Configuration

#### Current Languages
-  **English (en-US)** - Default
-  **Chinese (zh)** - Simplified Chinese
-  **German (de)** - German

#### Adding a New Language
1. Open `index.html` and locate the `TRANSLATIONS` object (around line 69)
2. Copy the entire English block and paste it
3. Change the language code (e.g., `'es'` for Spanish)
4. Translate all the strings
5. Add the language option to the selector (around line 1742):
   ```html
   <option value="es">🇪🇸 Español</option>
   ```

#### Customizing Brand Name
Update line 1066:
```javascript
const BRAND_NAME = "YourCompanyName";
```
This will replace all `[Company Name]` placeholders across all languages.

## 🙏 Acknowledgments

**Inspired by:** [Megan V. Walker's article](https://meganvwalker.com/customising-your-compliance-profile-preference-centres) on customizing Dynamics 365 Forms.

**Developed with:** Claude AI assistance for modern web standards and accessibility compliance.

**"Truestory"** is a placeholder – replace with your brand name.

---

## 📝 Changelog

### 1.6 /  October 12, 2025
**Multi-Language Support + Enhanced UX:**

####  Internationalization (NEW!)
-  **Multi-language support** - English (US), Chinese (中文), German (Deutsch)
-  **Auto language detection** - Detects browser language automatically
-  **Language persistence** - Remembers user's language choice in localStorage
-  **Language selector** - Elegant dropdown positioned in navigation menu with flag emojis
-  **35+ translated strings** - All UI text, notifications, and legal copy translated
-  **Fallback system** - Gracefully falls back to English if translation missing
-  **Single-file implementation** - All translations embedded (no external files needed)
-  **RTL-ready** - CSS structure prepared for right-to-left languages
-  **Mobile optimized** - Language selector appears inside mobile menu dropdown

####  Notification System Improvements
-  **Dismissible notifications** - Added close button (×) to all notifications
-  **Auto-dismiss errors** - Error messages auto-close after 2 seconds
-  **Keyboard accessible** - Close button accessible via keyboard
-  **No repeat errors** - Dynamics 365 script error only shows once
-  **Dev-friendly** - Script errors commented out for local development

####  Security & Privacy
-  Fixed deprecated referrer meta tag (`never` → `no-referrer`)
-  Added error handling for Dynamics 365 script loading failures
-  Added DNS prefetch hints for external resources

####  User Experience
-  **Success/Error notifications** - Visual feedback for form submissions
-  **Loading states** - Submit button shows "Updating..." during submission
-  **Active loader overlay** - Full-screen loader during form processing
-  **Client-side validation** - Validates selections before submission
-  **Unsubscribe confirmation** - Confirmation dialog for unsubscribe action
-  **Dirty form warning** - Warns users before leaving with unsaved changes
-  **Improved redirect logic** - Configurable redirect with delay after submission

#### Accessibility Improvements
-  **Skip navigation link** - Keyboard users can skip to main content
-  **Improved heading hierarchy** - Proper semantic structure with fieldset/legend
-  **Enhanced ARIA labels** - Form properly labeled for screen readers
-  **Keyboard navigation** - Escape key closes mobile menu, focus management
-  **Click-outside detection** - Mobile menu closes when clicking outside

####  Performance
-  **Font-display: swap** - Prevents Flash of Invisible Text (FOIT)
-  **DNS prefetch** - Faster loading for Google Fonts and assets
-  **Resource hints** - Preconnect for critical third-party resources

####  Code Quality
-  **JavaScript namespacing** - All code in `PreferenceCenter` module (no globals)
-  **Semantic CSS variables** - Typography, spacing, transitions, and sizing
-  **Enhanced JSDoc** - Comprehensive function documentation
-  **Removed duplicate CSS** - Consolidated responsive visibility helpers
-  **Configuration system** - Easy redirect and brand name customization

### 1.6 /  October 11, 2025
-  Dark Mode support
-  Added comprehensive JavaScript documentation (JSDoc-style)
-  Implemented auto-updating copyright year
-  Added placeholder system for brand customization
-  Improved mobile menu slide-down animation
-  Enhanced code comments throughout

### 1.5 / October 10, 2025
-  Simplified color system to 5 CSS variables
-  Updated to WCAG 2.1 Level AA/AAA standards
-  Added multi-format favicon support
-  Improved semantic HTML structure
-  Added focus management for accessibility
-  Implemented `prefers-reduced-motion` support
-  Added browser theme color meta tags
-  Consolidated CSS and JavaScript

---

## 🔍 Keywords

Dynamics 365 Form Customization | Custom Dynamics 365 Marketing Form | Dynamics 365 Customer Insights Journeys Template | GDPR Compliant Form | Accessible Email Form | Dynamics 365 Compliance Profile | Custom Branded Form Microsoft Dynamics

---

## 📄 License

Free to use and modify. Attribution appreciated but not required.

---

## 💬 Support

**For Dynamics 365 questions:** Refer to [Microsoft Learn documentation](https://learn.microsoft.com/en-us/dynamics365/customer-insights/)

**For template issues:** Ensure all Dynamics 365 required elements remain intact before troubleshooting.

---

**Made with ❤️ for CRM Managers** 
