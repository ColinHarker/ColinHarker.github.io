# Mulligan Masters Golf Group Website

This repository contains the website for the Mulligan Masters Golf Group, hosted on GitHub Pages.

## Website Overview

The Mulligan Masters website is a static website built with HTML, CSS, and JavaScript. It serves as an online presence for the golf group, providing information about the group, its members, events, and a photo gallery.

### Pages

- **Home**: Landing page with video background and overview of the group
- **About**: Information about the group's history, mission, and values
- **Roster**: Profiles of the 15 members of the group
- **Events**: Information about upcoming and past events
- **Gallery**: Photo gallery showcasing the group's activities

## Technical Details

### Technologies Used

- HTML5
- CSS3 (with custom properties for theming)
- JavaScript (ES6+)
- Bootstrap 5 (for responsive layout)
- Font Awesome (for icons)
- AOS - Animate On Scroll (for scroll animations)

### File Structure

```
/
├── index.html (Home page)
├── about.html
├── roster.html
├── events.html
├── gallery.html
├── css/
│   ├── style.css (Main styles)
│   └── responsive.css (Media queries)
├── js/
│   ├── main.js (Core functionality)
│   └── gallery.js (Gallery functionality)
├── assets/
│   ├── images/ (For all site images)
│   ├── videos/ (For background video)
│   └── fonts/ (If custom fonts are needed)
└── README.md
```

## Customization Guide

### Adding Real Content

1. **Images**: Replace placeholder images in the `assets/images/` directory with real photos
   - Home page background: Replace or add a video in `assets/videos/`
   - Gallery: Add real photos to the gallery section
   - Member photos: Add member photos for the roster page

2. **Content**: Update the text content on each page to reflect accurate information about:
   - Group history and mission
   - Member details
   - Upcoming and past events
   - Contact information

### Color Scheme

The website uses a color scheme based on:
- Primary color: #0c3523 (dark green)
- Secondary color: #d2aa45 (gold)

To change the color scheme, modify the CSS variables in the `:root` section of `css/style.css`.

### Adding New Members

To add new members to the roster:
1. Open `roster.html`
2. Copy an existing member card HTML structure
3. Update the information with the new member's details
4. Add their photo to the `assets/images/` directory

### Adding New Events

To add new events:
1. Open `events.html`
2. Copy an existing event card HTML structure
3. Update with the new event details
4. Place in either the "Upcoming Events" or "Past Events" section

## Deployment

This website is deployed using GitHub Pages. Any changes pushed to the main branch will automatically be deployed to the live site.

## Contact

For questions or issues regarding this website, please contact:
- Email: mulliganmasters@gmail.com

## License

All rights reserved. This website and its content are the property of Mulligan Masters Golf Group.
