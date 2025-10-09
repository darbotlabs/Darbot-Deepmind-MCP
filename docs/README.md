# Darbot Deepmind MCP Documentation

This directory contains the GitHub Pages documentation site for Darbot Deepmind MCP Server.

## Pages

- **index.html** - Main landing page with feature overview and quick start
- **configuration.html** - Setup and configuration guide
- **framework.html** - Technical architecture and framework documentation
- **api-reference.html** - Complete API reference with parameters and examples
- **troubleshooting.html** - Common issues and solutions

## Local Development

To view the documentation locally, simply open any HTML file in your browser:

```bash
# Open the main page
open docs/index.html

# Or use a simple HTTP server
cd docs
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## Deployment

The documentation is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the main branch.

**Live URL:** https://darbotlabs.github.io/Darbot-Deepmind-MCP/

## Structure

```
docs/
├── _config.yml           # Jekyll configuration
├── index.html            # Landing page
├── configuration.html    # Configuration guide
├── framework.html        # Framework documentation
├── api-reference.html    # API reference
├── troubleshooting.html  # Troubleshooting guide
└── assets/
    └── css/
        └── style.css     # Styles for all pages
```

## Contributing

When updating documentation:

1. Edit the HTML files directly
2. Maintain consistent navigation across all pages
3. Update links if adding new pages
4. Test locally before committing
5. Follow the existing style and structure

## Design

- Clean, modern design with gradient hero section
- Responsive layout that works on mobile and desktop
- Consistent navigation and footer across all pages
- Colored alerts and code blocks for better readability
- Professional typography and spacing
