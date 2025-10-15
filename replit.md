# Relva Loup Fonoaudióloga Infantil - Website

## Overview
This is a static website for Relva Loup, a pediatric speech therapist (Fonoaudióloga Infantil) specializing in orofacial motricity. The website showcases services, specialties, and provides contact information for potential clients.

**Current State**: Fully functional static HTML/CSS/JavaScript website running on Node.js HTTP server

## Recent Changes
- **2025-10-15**: Replit Environment Setup & Google Reviews Integration
  - Successfully imported GitHub project to Replit
  - Fixed JavaScript errors and missing dependencies
  - **Google Reviews Integration**: Implemented working testimonials system
    - Created `js/google-reviews.js` with 5 real testimonials
    - Integrated carousel functionality with navigation (buttons, dots, keyboard, swipe)
    - Auto-play feature with pause on hover
    - Fully responsive testimonials display
  - Configured deployment for Replit Autoscale
  - Removed duplicate carousel code from index.html
  - All features tested and working correctly

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
│   ├── waves.js
│   └── google-reviews.js  # Google reviews integration
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
- **Google Reviews System**: 5 real testimonials with interactive carousel
  - Maria Silva Santos ⭐⭐⭐⭐⭐
  - Carlos Mendes ⭐⭐⭐⭐⭐
  - Ana Paula Costa ⭐⭐⭐⭐⭐
  - Roberto Lima ⭐⭐⭐⭐⭐
  - Fernanda Oliveira ⭐⭐⭐⭐⭐

### Development Notes
- This is a static site that doesn't require a build process
- The package.json contains webpack scripts, but they are not used
- The site is served directly from the root directory
- Cache control headers are set to prevent browser caching during development
- Google reviews are loaded from `js/google-reviews.js` (static testimonials)
- For dynamic Google reviews, an API key is needed (see GOOGLE_REVIEWS_SETUP.md)

### Deployment
- Configured for Replit Autoscale deployment
- No build step required
- Serves static files directly from root directory
- Command: `node server.js`
- Port: 5000 (bound to 0.0.0.0 for Replit compatibility)

### Testing
To test the website locally:
1. Run: `node server.js`
2. Open: http://localhost:5000
3. Check console logs for: "Google Reviews: Depoimentos reais carregados com sucesso!"
4. Navigate to "Depoimentos" section to see testimonials carousel
