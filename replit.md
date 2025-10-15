# Relva Loup Fonoaudióloga Infantil - Website

## Overview
This is a static website for Relva Loup, a pediatric speech therapist (Fonoaudióloga Infantil) specializing in orofacial motricity. The website showcases services, specialties, and provides contact information for potential clients.

**Current State**: Fully functional static HTML/CSS/JavaScript website running on Node.js HTTP server

## Recent Changes
- **2025-10-14**: Initial Replit setup & Mobile Optimization
  - Created Node.js HTTP server (server.js) to serve static files on port 5000
  - Configured workflow to run the server
  - Added cache control headers to prevent browser caching issues
  - Set up deployment configuration for Replit's autoscale service
  - **Mobile Optimization**: Implemented comprehensive mobile responsiveness improvements
    - Optimized hero section with better spacing (min-height: 600px, improved padding)
    - Enhanced font sizes for mobile: hero h2 at 1.9rem, specialty text at 1.4rem
    - Touch-friendly buttons (50px minimum height, inline-flex alignment)
    - Improved specialty cards with better padding, gaps, and icon sizing
    - Enhanced section spacing and legibility across all mobile breakpoints (768px, 480px)
    - Fixed JavaScript errors (confetti effect and DOMContentLoaded closure)
    - All visual effects maintained while improving mobile UX

## Project Architecture

### Technology Stack
- **Frontend**: Pure HTML5, CSS3, and vanilla JavaScript
- **Server**: Node.js HTTP server (development)
- **Deployment**: Replit Autoscale (static site hosting)

### Project Structure
```
relva-site/
├── index.html              # Main page
├── style.css              # Main styles
├── script.js              # Main JavaScript
├── server.js              # Development server (Replit-specific)
├── sw.js                  # Service worker for PWA
├── manifest.json          # PWA manifest
├── images/                # Image assets
├── js/                    # Additional JavaScript
│   ├── mobile.js
│   └── waves.js
└── scripts/               # Build scripts (not used in production)
    ├── generate-icons.js
    └── optimize-images.js
```

### Key Features
- Responsive design for mobile, tablet, and desktop
- Progressive Web App (PWA) capabilities with service worker
- WhatsApp integration for contact
- Animated sections and smooth scrolling
- Specialty cards highlighting services

### Development Notes
- This is a static site that doesn't require a build process
- The package.json contains webpack scripts, but they are not used
- The site is served directly from the root directory
- Cache control headers are set to prevent browser caching during development

### Deployment
- Configured for Replit Autoscale deployment
- No build step required
- Serves static files directly from root directory
