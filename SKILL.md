---
name: ms-code
description: Working with Microsoft Dynamics 365 Customer Insights HTML designer templates, custom attributes, and form design
---

# Ms-Code Skill

Comprehensive assistance with Microsoft Dynamics 365 Customer Insights - Journeys HTML designer features, focusing on custom attributes that enable drag-and-drop editing, template design, and form customization for emails, pages, and forms.

## When to Use This Skill

This skill should be triggered when:
- Creating or customizing email templates for Dynamics 365 Customer Insights
- Building marketing pages with drag-and-drop design elements
- Implementing custom HTML templates with designer features
- Working with data containers and design elements in Dynamics 365
- Setting up locked/unlocked regions in templates
- Adding custom fonts or style settings to the designer
- Debugging template properties or designer functionality
- Converting external HTML into Dynamics 365 designer-compatible format

## Key Concepts

### Design Elements
Dynamics 365 uses special `data-editorblocktype` attributes to identify design components that appear in the graphical editor. Common types include Text, Image, Divider, Button, Form fields, and Content blocks.

### Data Containers
Containers marked with `data-container="true"` define regions where users can drag and drop design elements. Content outside containers remains locked in the Designer view.

### Designer Modes
- **Drag-and-Drop Mode**: Full designer with toolbox, enabled by meta tag
- **Full-Page Editor**: Simplified rich-text editor for pasted HTML without meta tag

### Custom Attributes
Special HTML attributes (like `data-protected`, `data-locked`) control editing behavior in the Designer view, allowing template creators to lock specific elements or containers.

## Quick Reference

### 1. Enable Drag-and-Drop Editor

Add this meta tag to the `<head>` section to activate full designer features:

```xml
<meta type="xrm/designer/setting" name="type" value="marketing-designer-content-editor-document">
```

Without this tag, the Designer shows a simplified full-page editor. With it, you get the toolbox and drag-and-drop functionality.

### 2. Create a Draggable Container

Define regions where users can add design elements:

```xml
<table aria-role="presentation">
    <tbody><tr>
        <td>
            LOCKED CONTENT
        </td>
        <td>
            <div data-container="true">
                <!-- Users can drag elements here -->
            </div>
        </td>
    </tr>
</tbody></table>
```

### 3. Mixed Locked and Draggable Regions

Create containers with both editable and locked sections:

```xml
<div data-container="true">
    <!-- DRAG HERE (top section) -->
    <p>This content is locked and cannot be moved</p>
    <!-- DRAG HERE (bottom section) -->
</div>
```

### 4. Lock a Container (Hard Lock)

Prevent all editing within a container:

```xml
<div data-container="true" data-locked="hard">
    <!-- All elements and content here are locked -->
    <!-- Properties panel won't be shown -->
</div>
```

### 5. Lock Individual Design Elements

Protect specific elements from editing:

```xml
<div data-editorblocktype="Divider" data-protected="true">
    <!-- Element content is locked -->
    <!-- Users cannot modify properties -->
</div>
```

### 6. Define a Text Design Element

Create a text block that users can edit:

```xml
<div data-editorblocktype="Text">
    <p>Enter your text here</p>
</div>
```

### 7. Define an Image Design Element

Create an image with optional link:

```xml
<div data-editorblocktype="Image">
    <div align="Center" class="imageWrapper">
        <a href="example.com" title="example.com">
            <img alt="Some alt text" height="50" src="about:blank" width="50">
        </a>
    </div>
</div>
```

### 8. Add Custom Fonts to Designer

Extend the font menu in the text formatting toolbar:

```xml
<meta type="xrm/designer/setting" name="additional-fonts" datatype="font" value="Arial Black;Courier New;Georgia">
```

Fonts are semicolon-separated in the `value` attribute.

### 9. Create a Style Setting

Add a customizable color setting to the Styles tab:

```xml
<head>
    <meta type="xrm/designer/setting" name="color1" value="#ff0000" datatype="color" label="Color 1">
    <style>
        h1 {color: /* @color1 */ #ff0000 /* @color1 */;}
    </style>
</head>
```

### 10. Apply Style Settings to HTML Elements

Use `property-reference` to bind style settings to HTML attributes:

```xml
<head>
    <meta type="xrm/designer/setting" name="hero-image" value="picture.jpg" datatype="picture" label="Hero image">
    <meta type="xrm/designer/setting" name="hero-image-height" value="100px" datatype="text" label="Hero image height">
</head>
<body>
    <img property-reference="src:@hero-image;height:@hero-image-height;">
</body>
```

This resolves to: `<img src="picture.jpg" height="100px">`

## Reference Files

This skill includes comprehensive documentation in `references/`:

### other.md
Contains the complete guide to custom template attributes for Dynamics 365 Customer Insights. Includes:

- **Custom Attribute Summary**: Quick reference table of all meta tags and attributes
- **Drag-and-Drop Editor**: How to enable designer features in pasted HTML
- **Data Containers**: Creating editable regions in templates
- **Locking Mechanisms**: Container-level and element-level protection
- **Design Element Reference**: Complete list of available element types with attributes
- **Style Settings**: Creating customizable properties on the Styles tab
- **Font Management**: Adding custom fonts to the designer
- **Import Workflows**: Converting external HTML to designer-compatible format

**Key Sections:**
1. Tag and attribute summary
2. Show the toolbox and enable drag-and-drop editing
3. Create a container where users can add design elements
4. Lock a container in Designer view
5. Identify design elements
6. Lock elements in Designer view
7. Import externally created HTML into the designer

## Working with This Skill

### For Beginners
Start by reading **other.md** to understand the foundation of custom attributes in Dynamics 365 Customer Insights. Focus on:
- The difference between drag-and-drop mode and full-page editor
- How to create basic data containers
- Understanding design element types

**First Steps:**
1. Learn how to enable the drag-and-drop editor (Quick Reference #1)
2. Practice creating simple data containers (Quick Reference #2)
3. Experiment with basic design elements like Text and Image (Quick Reference #6-7)

### For Intermediate Users
Once comfortable with basics, explore:
- Locking strategies for templates (container vs. element level)
- Creating custom style settings for the Styles tab
- Adding custom fonts to the designer
- Mixing locked and editable regions in templates

**Intermediate Techniques:**
- Use `property-reference` attributes for dynamic styling
- Create reusable template structures with strategic locking
- Implement CSS comment patterns for style settings

### For Advanced Users
Master the complete designer customization system:
- Build complex templates with multiple containers and locked regions
- Create comprehensive style setting systems
- Import and adapt external HTML designs
- Optimize templates for specific marketing campaigns

**Advanced Patterns:**
- Combine multiple style settings with CSS comments and property-reference
- Create template hierarchies with nested containers
- Design form elements with custom validation and protection
- Build responsive templates with designer-compatible code

### Navigation Tips
- **Quick Reference**: Use for common code patterns (10 examples provided)
- **other.md**: Reference for complete technical details and edge cases
- **This Document**: Overview and conceptual understanding

## Common Design Element Types

| Element Name | data-editorblocktype Value | Additional Attributes |
|--------------|----------------------------|----------------------|
| Text element | `Text` | - |
| Image element | `Image` | - |
| Divider element | `Divider` | - |
| Button element | `Button` | - |
| Content block element | `Content` | `data-block-datatype="text"` or `"image"` |
| Field element (forms) | `Field-<field-name>` | Example: `Field-email` |
| Submit button (forms) | `SubmitButtonBlock` | - |
| Captcha element | `CaptchaBlock` | - |

## Style Setting Datatypes

When creating style settings with meta tags, use these datatype values:

| Datatype | Description | UI Control |
|----------|-------------|------------|
| `color` | Color values like #000 or #1a32bf | Color picker |
| `font` | Font family names (or comma-separated stacks) | Text input |
| `number` | Numerical value (no units) | Input with up/down buttons |
| `picture` | Image source URL | Text input |
| `text` | Text and numbers (use for values with units like "10px") | Text input |

## Best Practices

1. **Always Include the Designer Meta Tag**: Add `<meta type="xrm/designer/setting" name="type" value="marketing-designer-content-editor-document">` to enable full functionality.

2. **Strategic Locking**: Use container-level locks for entire sections, element-level locks for specific components.

3. **Clear Container Structure**: Organize templates with obvious container boundaries for better user experience.

4. **Style Settings in Head Only**: CSS comments for style settings (`/* @tag-name */`) only work in `<style>` tags in the `<head>` section.

5. **Test Both Modes**: Verify templates work correctly in both Designer view and HTML view.

6. **Semantic HTML**: Use proper HTML structure even though custom attributes add designer functionality.

7. **Document Custom Attributes**: Comment complex templates to explain locking and container purposes.

8. **Font Stack Fallbacks**: When adding custom fonts, include fallback fonts in comma-separated lists.

## Resources

### references/
Contains official documentation extracted from Microsoft Learn with:
- Detailed technical explanations
- Complete attribute reference tables
- Real-world usage examples
- Links to original Microsoft documentation
- Table of contents for quick navigation

### scripts/
Add helper scripts here for:
- Template validation
- Batch processing of HTML files
- Automated testing of designer compatibility
- Custom attribute generation utilities

### assets/
Add templates, boilerplate, or example projects here:
- Starter email templates
- Page layout examples
- Form design patterns
- Reusable component libraries

## Important Notes

- **No Custom HTML Support**: Microsoft doesn't provide support for custom HTML in emails - use custom attributes within supported structures.

- **HTML Tab Access**: Even protected elements can be edited on the HTML tab. Limit HTML tab access to enforce locking.

- **Full-Page Editor Behavior**: When the full-page editor is enabled (no designer meta tag), all drag-and-drop features are disabled and containers have no effect.

- **Designer Overrides**: Avoid editing design element content directly in HTML - the designer may overwrite your changes.

- **Square Bracket Labels**: Labels on the Styles tab may appear in square brackets like "[My Style]" if no translation is available. Use standard labels from out-of-box templates to avoid this.

## Troubleshooting

**Problem**: Drag-and-drop not working
- **Solution**: Verify the designer meta tag is present in `<head>`

**Problem**: Container not accepting dragged elements
- **Solution**: Check for `data-container="true"` attribute on the container div

**Problem**: Style settings not appearing on Styles tab
- **Solution**: Ensure the setting is referenced in at least one CSS style or HTML tag

**Problem**: Element remains editable despite protection
- **Solution**: Container-level locks override element-level locks - check both levels

**Problem**: Custom fonts not showing in menu
- **Solution**: Verify semicolon separation in the `additional-fonts` meta tag value

## Related Microsoft Dynamics 365 Features

This skill focuses on custom attributes for designer features. For related topics, consult:
- Marketing email best practices
- Form configuration and validation
- Customer Insights journey orchestration
- Content block management
- A/B testing for emails and pages

## Updating

To refresh this skill with updated documentation:
1. Re-run the scraper with the same configuration
2. The skill will be rebuilt with the latest information from Microsoft Learn
