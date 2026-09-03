/**
 * Carousel Manager - Handles multiple independent carousels on the same page
 * Based on W3Schools slideshow pattern with improvements for multiple instances
 */

class Carousel {
  constructor(container) {
    this.container = container;
    this.currentIndex = 1;
    this.fullscreenIndex = 1;
    this.isTransitioning = false;

    // Get the carousel ID from data attribute
    this.carouselId = container.getAttribute('data-carousel-id');
    
    // Initialize event listeners
    this.initializeCarousel();
  }

  initializeCarousel() {
    // Get all interactive elements within this carousel
    this.slides = this.container.querySelectorAll('.carousel-item');
    this.dots = this.container.querySelectorAll('.dot');
    this.prevBtn = this.container.querySelector('.carousel-prev');
    this.nextBtn = this.container.querySelector('.carousel-next');
    this.fullscreenOverlay = this.container.querySelector('.carousel-fullscreen');
    this.fullscreenSlides = this.container.querySelectorAll('.carousel-fullscreen-item');
    this.fullscreenDots = this.container.querySelectorAll('.carousel-fullscreen-dot');

    if (!this.slides.length) return;

    // Add event listeners
    this.container.addEventListener('click', (e) => this.handleContainerClick(e));
    this.container.addEventListener('wheel', (e) => this.handleScroll(e));
    this.container.addEventListener('keydown', (e) => this.handleKeypress(e));

    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', (e) => this.changeSlide(-1, e));
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', (e) => this.changeSlide(1, e));
    }

    // Dot click handlers
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', (e) => this.currentSlide(index + 1, e));
    });

    // Fullscreen dot click handlers
    this.fullscreenDots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.currentFullscreenSlide(index + 1));
    });

    // Fullscreen close button
    const closeBtn = this.container.querySelector('.carousel-fullscreen-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeFullscreen());
    }

    // Escape key closes fullscreen
    this.escapeKeyHandler = (e) => {
      if (e.key === 'Escape' && this.fullscreenOverlay?.classList.contains('active')) {
        this.closeFullscreen();
      }
    };
    document.addEventListener('keydown', this.escapeKeyHandler);

    // Show first slide
    this.showSlide(this.currentIndex);
  }

  handleContainerClick(e) {
    // Only open fullscreen if clicking the carousel itself, not buttons/dots
    if (
      e.target === this.container || 
      e.target.classList.contains('carousel-image') ||
      e.target.classList.contains('carousel-video')
    ) {
      this.openFullscreen();
    }
  }

  changeSlide(n, event) {
    if (event) event.stopPropagation();
    if (this.isTransitioning) return;
    this.showSlide(this.currentIndex += n);
  }

  currentSlide(n, event) {
    if (event) event.stopPropagation();
    if (this.isTransitioning) return;
    this.showSlide(this.currentIndex = n);
  }

  showSlide(n) {
    if (!this.slides.length) return;

    if (n > this.slides.length) {
      this.currentIndex = 1;
    }
    if (n < 1) {
      this.currentIndex = this.slides.length;
    }

    this.isTransitioning = true;

    // Hide all slides
    this.slides.forEach((slide) => {
      slide.classList.remove('active');
      slide.style.opacity = '0';
    });

    // Remove active dot
    this.dots.forEach((dot) => dot.classList.remove('active'));

    // Show active slide
    const activeSlide = this.slides[this.currentIndex - 1];
    activeSlide.classList.add('active');
    activeSlide.style.opacity = '1';
    this.dots[this.currentIndex - 1].classList.add('active');

    setTimeout(() => {
      this.isTransitioning = false;
    }, 300);
  }

  handleScroll(event) {
    event.preventDefault();

    if (event.deltaY > 0) {
      this.changeSlide(1, null);
    } else if (event.deltaY < 0) {
      this.changeSlide(-1, null);
    }
  }

  handleKeypress(event) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.changeSlide(1, null);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.changeSlide(-1, null);
    }
  }

  openFullscreen() {
    this.fullscreenIndex = this.currentIndex;
    this.fullscreenOverlay.classList.add('active');
    this.showFullscreenSlide(this.fullscreenIndex);
  }

  closeFullscreen() {
    this.fullscreenOverlay.classList.remove('active');
  }

  changeFullscreenSlide(n) {
    this.showFullscreenSlide(this.fullscreenIndex += n);
  }

  currentFullscreenSlide(n) {
    this.showFullscreenSlide(this.fullscreenIndex = n);
  }

  showFullscreenSlide(n) {
    if (!this.fullscreenSlides.length) return;

    if (n > this.fullscreenSlides.length) {
      this.fullscreenIndex = 1;
    }
    if (n < 1) {
      this.fullscreenIndex = this.fullscreenSlides.length;
    }

    this.fullscreenSlides.forEach((slide) => slide.classList.remove('active'));
    this.fullscreenDots.forEach((dot) => dot.classList.remove('active'));

    this.fullscreenSlides[this.fullscreenIndex - 1].classList.add('active');
    this.fullscreenDots[this.fullscreenIndex - 1].classList.add('active');
  }

  destroy() {
    // Clean up event listeners
    document.removeEventListener('keydown', this.escapeKeyHandler);
  }
}

// Initialize all carousels on page load
document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('[data-carousel-id]');
  carousels.forEach((carouselEl) => {
    new Carousel(carouselEl);
  });
});
