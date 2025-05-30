document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider
    const slides = document.querySelectorAll('.hero-slider .slide');
    let currentSlide = 0;
    const slideInterval = 5000; // Change slide every 5 seconds

    function nextSlide() {
        // Fade out current slide
        slides[currentSlide].style.opacity = '0';
        slides[currentSlide].classList.remove('active');
        
        // Update slide index
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Fade in next slide
        setTimeout(() => {
            slides[currentSlide].classList.add('active');
            slides[currentSlide].style.opacity = '1';
        }, 50);
    }

    // Set initial slide
    slides[currentSlide].classList.add('active');
    slides[currentSlide].style.opacity = '1';

    // Start automatic slideshow
    setInterval(nextSlide, slideInterval);
})