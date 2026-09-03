# Carousel Documentation

## Overview

This carousel system provides multiple independent carousel instances on the same page using pure HTML, CSS, and JavaScript (no Django or backend processing required). The system is based on the W3Schools slideshow pattern with enhancements for multiple instances and improved state management.

## Features

- ✅ **Multiple Independent Carousels** - Each carousel on a page operates independently
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile devices
- ✅ **Keyboard Navigation** - Arrow keys control slides
- ✅ **Mouse Wheel Support** - Scroll wheel advances/reverses slides
- ✅ **Fullscreen Mode** - Click carousel to view in fullscreen
- ✅ **Image & Video Support** - Display both image files and Google Drive embedded videos
- ✅ **Dot Indicators** - Click dots to jump to specific slides
- ✅ **Pure HTML/CSS/JavaScript** - No backend dependencies

## File Structure

```
├── _includes/
│   ├── carousel.html         # Standalone carousel component
│   └── project-card.html     # Project card with integrated carousel
├── css/
│   └── carousel.css          # All carousel styling
├── js/
│   └── carousel.js           # Carousel functionality (multiple instances)
└── _layouts/
    └── default.html          # Main layout (includes carousel assets)
```

## Usage

### Option 1: Carousel Within Project Card (Recommended)

Use the combined project-card component which integrates a carousel directly:

```liquid
{% include project-card.html
  title="My Project"
  description="A description of my project"
  link="https://example.com"
  id="project-1"
  items="/path/to/image1.jpg,/path/to/image2.jpg,GOOGLE_DRIVE_FILE_ID"
%}
```

**Parameters:**
- `title` - Project title (required)
- `description` - Project description (required)
- `link` - Link to project website (required)
- `id` - Unique identifier for this project (required for carousel to function)
- `items` - Comma-separated list of carousel items (optional)
  - Image paths: `/path/to/image.jpg`
  - Google Drive IDs: `FILE_ID_HERE` (without path separators)
- `image` - Static image (used only if `items` is not provided)

**Example with images:**
```liquid
{% include project-card.html
  title="Portfolio Website"
  description="Personal portfolio showcasing design work"
  link="https://portfolio.example.com"
  id="portfolio-1"
  items="/assets/images/portfolio1.jpg,/assets/images/portfolio2.jpg,/assets/images/portfolio3.jpg"
%}
```

**Example with static image (no carousel):**
```liquid
{% include project-card.html
  title="Blog Project"
  description="Technical blog platform"
  link="https://blog.example.com"
  id="blog-1"
  image="/assets/images/blog-screenshot.jpg"
%}
```

**Example with mixed content (images and videos):**
```liquid
{% include project-card.html
  title="Video Demo Project"
  description="Project with video demonstrations"
  link="https://demo.example.com"
  id="demo-1"
  items="/assets/images/screenshot1.jpg,1a2b3c4d5e6f7g8h9i0j,/assets/images/screenshot2.jpg"
%}
```

### Option 2: Standalone Carousel Component

Use the carousel component independently:

```liquid
{% include carousel.html
  id="carousel-1"
  items="/path/to/image1.jpg,/path/to/image2.jpg"
%}
```

**Parameters:**
- `id` - Unique identifier (required)
- `items` - Comma-separated carousel items (required)

## Carousel Controls

### Mouse/Touch
- **Click carousel** - Enter fullscreen mode
- **Navigation arrows** - Click to move to previous/next slide
- **Dot indicators** - Click to jump to specific slide
- **Scroll wheel** - Scroll up/down to navigate slides

### Keyboard
- **Arrow Right** - Next slide
- **Arrow Left** - Previous slide
- **Escape** - Close fullscreen mode (in fullscreen only)

## Supported Media Types

### Images
Use relative paths to images in your repository:
```
/assets/images/photo1.jpg
/assets/images/project-screenshot.png
```

### Google Drive Videos
Embed Google Drive videos using the file ID:
```
1a2b3c4d5e6f7g8h9i0j  (just the ID, no /d/ or /preview)
```

To get a Google Drive file ID:
1. Right-click the file in Google Drive
2. Select "Get link"
3. Copy the ID from the URL: `https://drive.google.com/file/d/ID_HERE/view`

## Styling Customization

All carousel styles are defined in `css/carousel.css`. Key CSS classes:

```css
.carousel              /* Main carousel container */
.carousel-item        /* Individual slide */
.carousel-arrow       /* Navigation buttons */
.dot                  /* Indicator dots */
.carousel-fullscreen  /* Fullscreen overlay */
```

### Modifying Colors

Edit `css/carousel.css` to change colors:

```css
/* Navigation arrow background */
.carousel-arrow {
  background-color: rgba(0, 0, 0, 0.5);  /* Change this */
}

/* Active dot color */
.dot.active {
  background-color: rgba(255, 255, 255, 1);  /* Change this */
}
```

### Modifying Size

Adjust the aspect ratio for carousel containers:

```css
.carousel-container {
  aspect-ratio: 16 / 9;  /* Default. Change to 4/3, 1/1, etc. */
}
```

## JavaScript API

The carousel system initializes automatically on page load. Each carousel is managed by a `Carousel` class instance.

### Automatic Initialization

```javascript
// Automatically runs on DOMContentLoaded
// All elements with data-carousel-id are initialized
```

### Manual Initialization (if needed)

```javascript
const container = document.querySelector('[data-carousel-id="carousel-1"]');
const carousel = new Carousel(container);

// Navigate programmatically
carousel.changeSlide(1);     // Next slide
carousel.changeSlide(-1);    // Previous slide
carousel.currentSlide(3);    // Jump to slide 3
carousel.openFullscreen();   // Open fullscreen
carousel.closeFullscreen();  // Close fullscreen
```

## Troubleshooting

### Carousel doesn't appear
1. Check that `data-carousel-id` attribute is present
2. Verify `carousel.js` is loaded in your layout
3. Verify `carousel.css` is loaded in your layout
4. Check browser console for JavaScript errors

### Images not loading
1. Verify image paths are correct (relative to site root)
2. Check that files exist in the repository
3. Use absolute paths starting with `/`

### Google Drive videos not loading
1. Verify the Google Drive file ID is correct (just the ID, not the full URL)
2. Ensure the file is shared or publicly accessible
3. Check that the Google Drive file is a video or compatible media type

### Multiple carousels interfering
1. Ensure each carousel has a unique `id` attribute
2. Check that `data-carousel-id` matches the `id` parameter
3. Verify JavaScript is managing each carousel independently

## Migration from Old System

If you were using the old Liquid-based carousel system:

**Old way:**
```liquid
{% include carousel.html items="..." %}
{% include project-card.html title="..." %}
```

**New way:**
```liquid
{% include project-card.html
  title="..."
  items="..."
  id="unique-id"
%}
```

The new system combines both components and eliminates the need for separate includes. Simply add the `items` parameter to your project-card includes.

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Notes

- Each carousel instance is lightweight (~5KB minified)
- CSS uses efficient selectors
- JavaScript uses event delegation where possible
- Smooth transitions use CSS transforms (GPU-accelerated)

## Future Enhancements

Potential improvements for future versions:
- Auto-play with configurable interval
- Swipe gestures for mobile
- Thumbnail preview strip
- Lazy loading for images
- Analytics/tracking hooks
