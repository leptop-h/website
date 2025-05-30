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

    // Start automatic slideshow
    setInterval(nextSlide, slideInterval);

    // Project Gallery Hover Effects
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.project-overlay').style.transform = 'translateY(0)';
        });

        item.addEventListener('mouseleave', function() {
            this.querySelector('.project-overlay').style.transform = 'translateY(100%)';
        });
    });
});