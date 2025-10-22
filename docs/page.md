# Page Templates

## Page Template Overview

Page templates are used for landing pages, content pages, and other web-based content in Dynamics 365 Customer Insights. Unlike email templates, page templates support modern CSS features including media queries, responsive design, and advanced layout techniques.

---

## Page vs. Email Differences

| Feature | Email | Page |
|---------|-------|------|
| Layout method | Tables required | Divs preferred, tables allowed |
| CSS flexibility | Restricted | Full support |
| Width | 700-800px | Flexible |
| Media queries | Not supported | Supported |
| Background images | Not supported | Supported |
| Border radius | Unreliable | Supported |
| Responsive design | Limited | Full support |
| JavaScript | Not supported | Supported |

---

## Page Layout Structure

### Div-Based Layout (Recommended)

Modern semantic HTML5 structure with flexbox/grid support:

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

  <style>
    /* Your styles with full CSS3 support */
  </style>
</head>
<body>
  <div class="page-wrapper">
    <header>
      <div data-container="true">
        <!-- Header content -->
      </div>
    </header>

    <main>
      <div data-container="true">
        <!-- Main content area -->
      </div>
    </main>

    <footer>
      <div data-container="true">
        <!-- Footer content -->
      </div>
    </footer>
  </div>
</body>
</html>
```

### Table-Based Layout (Alternative)

Use when compatibility with older systems is required:

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

---

## Responsive Design Support

Page templates fully support responsive design with media queries:

```css
/* Mobile-first approach */
.container {
  padding: 20px;
  max-width: 100%;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    max-width: 720px;
    margin: 0 auto;
  }
}

/* Desktop and up */
@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}
```

---

## Style Configuration

Page templates support the same style configuration system as other template types:

```html
<head>
  <!-- Brand color setting -->
  <meta type="xrm/designer/setting"
        name="brand-primary"
        value="#0078d4"
        datatype="color"
        label="Primary Brand Color">

  <!-- Hero background image -->
  <meta type="xrm/designer/setting"
        name="hero-image"
        value="hero.jpg"
        datatype="picture"
        label="Hero Background">

  <style>
    .header {
      background-color: /* @brand-primary */ #0078d4 /* @brand-primary */;
    }

    .hero {
      background-image: url(/* @hero-image */ hero.jpg /* @hero-image */);
    }
  </style>
</head>
```

---

## Common Page Layouts

### Single Column Layout

```html
<div class="page-wrapper">
  <section class="hero">
    <div data-container="true">
      <div data-editorblocktype="Text">
        <h1>Page Title</h1>
      </div>
    </div>
  </section>

  <section class="content">
    <div data-container="true">
      <div data-editorblocktype="Text">
        <p>Main content</p>
      </div>
    </div>
  </section>
</div>
```

### Two Column Layout

```html
<div class="two-columns">
  <div class="column" data-container="true">
    <div data-editorblocktype="Text">
      <h2>Left Column</h2>
      <p>Content</p>
    </div>
  </div>

  <div class="column" data-container="true">
    <div data-editorblocktype="Text">
      <h2>Right Column</h2>
      <p>Content</p>
    </div>
  </div>
</div>

<style>
  .two-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  @media (max-width: 768px) {
    .two-columns {
      grid-template-columns: 1fr;
    }
  }
</style>
```

### Three Column Grid

```html
<div class="three-columns">
  <div data-container="true">
    <!-- Column 1 -->
  </div>
  <div data-container="true">
    <!-- Column 2 -->
  </div>
  <div data-container="true">
    <!-- Column 3 -->
  </div>
</div>

<style>
  .three-columns {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }

  @media (max-width: 992px) {
    .three-columns {
      grid-template-columns: 1fr;
    }
  }
</style>
```

---

## Advanced Features

### Background Images

Unlike email templates, pages fully support CSS background images:

```css
.hero {
  background-image: url('hero.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 400px;
}
```

### Border Radius

Full support for rounded corners:

```css
.card {
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
```

### CSS Grid and Flexbox

Modern layout techniques are fully supported:

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

---

## Accessibility

Page templates must follow WCAG 2.1 Level AA guidelines:

- **Semantic HTML**: Use proper heading hierarchy (h1, h2, h3)
- **Alt Text**: All images must have descriptive alt attributes
- **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Keyboard Navigation**: All interactive elements must be keyboard accessible
- **ARIA Labels**: Use ARIA attributes for custom components
- **Focus Indicators**: Visible focus states for all interactive elements

```html
<!-- Good accessibility example -->
<nav aria-label="Main navigation">
  <ul>
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
  </ul>
</nav>

<img src="team.jpg" alt="Team photo showing five people in front of office building">

<button aria-label="Close modal">×</button>
```

---

## Page Template Checklist

### Required Elements
- [ ] Designer meta tag in `<head>`
- [ ] At least one `data-container="true"` element
- [ ] Proper HTML5 structure
- [ ] Viewport meta tag for responsive design

### Layout & Design
- [ ] Semantic HTML5 elements (header, main, footer, nav, section)
- [ ] Responsive design with media queries
- [ ] Mobile-first approach
- [ ] Lock branding sections (no container)
- [ ] Editable content areas (with container)

### Styling
- [ ] Style configuration for brand customization
- [ ] CSS variables or style settings for colors, fonts, images
- [ ] Consistent spacing and typography
- [ ] Cross-browser compatibility

### Accessibility
- [ ] Proper heading hierarchy (h1, h2, h3)
- [ ] Alt text on all images
- [ ] Sufficient color contrast (4.5:1 minimum)
- [ ] Keyboard navigation support
- [ ] ARIA labels where needed
- [ ] Focus indicators visible

### Testing
- [ ] Test on desktop (1920px, 1366px, 1024px)
- [ ] Test on tablet (768px)
- [ ] Test on mobile (375px, 320px)
- [ ] Validate HTML5
- [ ] Test in multiple browsers
- [ ] Test with screen reader

---

## Example: Complete Landing Page Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Landing Page</title>

  <!-- Designer Mode Activation -->
  <meta type="xrm/designer/setting"
        name="type"
        value="marketing-designer-content-editor-document">

  <!-- Style Configuration -->
  <meta type="xrm/designer/setting"
        name="brand-primary"
        value="#0078d4"
        datatype="color"
        label="Primary Color">

  <meta type="xrm/designer/setting"
        name="brand-secondary"
        value="#106ebe"
        datatype="color"
        label="Secondary Color">

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

    .header {
      background-color: /* @brand-primary */ #0078d4 /* @brand-primary */;
      color: white;
      padding: 20px 0;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .hero {
      background-color: /* @brand-primary */ #0078d4 /* @brand-primary */;
      color: white;
      padding: 80px 20px;
      text-align: center;
    }

    .content {
      padding: 60px 20px;
    }

    .cta-button {
      background-color: /* @brand-secondary */ #106ebe /* @brand-secondary */;
      color: white;
      padding: 15px 40px;
      text-decoration: none;
      display: inline-block;
      border-radius: 5px;
      font-weight: bold;
      margin-top: 20px;
    }

    @media (max-width: 768px) {
      .hero {
        padding: 40px 20px;
      }

      .content {
        padding: 30px 20px;
      }
    }
  </style>
</head>
<body>
  <!-- Header -->
  <header class="header">
    <div class="container">
      <div data-container="true">
        <h1>Company Name</h1>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="hero">
    <div class="container">
      <div data-container="true">
        <div data-editorblocktype="Text">
          <h2>Welcome to Our Service</h2>
          <p>Discover amazing solutions for your business</p>
        </div>
        <div data-editorblocktype="Button">
          <a href="#" class="cta-button">Get Started</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Main Content -->
  <main class="content">
    <div class="container">
      <div data-container="true">
        <div data-editorblocktype="Text">
          <h2>About Our Service</h2>
          <p>Your content here...</p>
        </div>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer class="header">
    <div class="container">
      <div data-container="true">
        <p>&copy; 2025 Company Name. All rights reserved.</p>
      </div>
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
- [Dynamic Content](https://learn.microsoft.com/dynamics365/customer-insights/journeys/dynamic-email-content)

### Best Practices
- Use semantic HTML5 elements
- Implement mobile-first responsive design
- Test across multiple devices and browsers
- Follow WCAG 2.1 AA accessibility guidelines
- Use style configuration for easy customization

---

**Document Version:** 1.0
**Last Updated:** October 22, 2025
**Platform:** Dynamics 365 Customer Insights Journeys 1.1.59247.103
