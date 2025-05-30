document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');
    let touchStartX = 0;
    let touchEndX = 0;
    let lastScrollY = window.scrollY;
    const isHomePage = document.body.id === 'home-page';

    // Inisialisasi header
    if (isHomePage) {
        navbar.classList.add('transparent');
    } else {
        navbar.classList.add('fixed');
    }

    // Scroll behavior
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (isHomePage) {
            navbar.classList.toggle('scrolled', currentScrollY > 50);
            navbar.classList.toggle('transparent', currentScrollY <= 50);
        }

        if (Math.abs(currentScrollY - lastScrollY) >= 5) {
            navbar.classList.toggle('visible', currentScrollY <= lastScrollY || currentScrollY <= 0);
        }

        lastScrollY = currentScrollY;

        // Statistik animasi
        document.querySelectorAll('.stats-number h2').forEach(number => {
            const rect = number.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= window.innerHeight && !number.classList.contains('animate')) {
                number.classList.add('animate');
            }
        });
    });

    navbar.classList.add('visible');

    // Toggle sidebar
    function toggleSidebar(show = null) {
        const action = show === null ? 'toggle' : (show ? 'add' : 'remove');
        hamburger.classList[action]('active');
        sidebar.classList[action]('active');
    }

    hamburger.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        toggleSidebar();
    });

    // Klik luar sidebar menutup
    document.addEventListener('click', e => {
        if (!hamburger.contains(e.target) && !sidebar.contains(e.target)) {
            toggleSidebar(false);
        }

        document.querySelectorAll('.sidebar .dropdown-content.show').forEach(content => {
            content.classList.remove('show');
            content.parentElement.classList.remove('active');
        });
    });

    // Sidebar link behavior
    sidebar.querySelectorAll('a').forEach(link => {
        if (!link.closest('.dropdown')) {
            link.addEventListener('click', () => toggleSidebar(false));
        }
    });

    // Enhanced touch gestures for Android sidebar
    let touchActive = false;
    let startTime = 0;
    let lastTouchY = 0;
    let isScrolling = false;

    sidebar.addEventListener('touchstart', e => {
        touchActive = true;
        touchStartX = e.touches[0].clientX;
        lastTouchY = e.touches[0].clientY;
        startTime = Date.now();
        isScrolling = false;
        sidebar.style.transition = 'none';
        requestAnimationFrame(updateSidebar);
    });

    sidebar.addEventListener('touchmove', e => {
        if (!touchActive) return;
        const touchY = e.touches[0].clientY;
        const deltaY = touchY - lastTouchY;
        
        // Detect vertical scrolling
        if (!isScrolling && Math.abs(deltaY) > Math.abs(e.touches[0].clientX - touchStartX)) {
            isScrolling = true;
            return;
        }

        if (!isScrolling) {
            touchEndX = e.touches[0].clientX;
            const deltaX = touchEndX - touchStartX;
            if (deltaX <= 0) {
                e.preventDefault();
            }
        }

        lastTouchY = touchY;
    });

    function updateSidebar() {
        if (!touchActive || isScrolling) return;
        const deltaX = touchEndX - touchStartX;
        if (deltaX <= 0) {
            const progress = Math.max(0, 1 + deltaX / 300);
            sidebar.style.transform = `translateX(${deltaX}px)`;
            sidebar.style.opacity = progress.toString();
        }
        requestAnimationFrame(updateSidebar);
    }

    sidebar.addEventListener('touchend', () => {
        if (!touchActive || isScrolling) return;
        touchActive = false;
        const deltaX = touchEndX - touchStartX;
        const swipeTime = Date.now() - startTime;
        const swipeSpeed = Math.abs(deltaX) / swipeTime;

        sidebar.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

        if (deltaX < -50 || (swipeSpeed > 0.5 && deltaX < 0)) {
            toggleSidebar(false);
        } else {
            sidebar.style.transform = 'translateX(0)';
            sidebar.style.opacity = '1';
        }
    });

    // Add touch feedback for sidebar links
    sidebar.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('touchstart', () => {
            link.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });
        link.addEventListener('touchend', () => {
            link.style.backgroundColor = '';
        });
    });
    });

    // Dropdown sidebar mobile
    document.querySelectorAll('.sidebar .dropdown').forEach(dropdown => {
        const toggle = dropdown.querySelector('a');
        const content = dropdown.querySelector('.dropdown-content');

        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            dropdown.classList.toggle('active');
            content.classList.toggle('show');

            document.querySelectorAll('.sidebar .dropdown').forEach(other => {
                if (other !== dropdown) {
                    other.classList.remove('active');
                    other.querySelector('.dropdown-content').classList.remove('show');
                }
            });
        });

        // Izinkan link dropdown tetap bisa navigasi
        dropdown.querySelectorAll('.dropdown-content a').forEach(link => {
            link.addEventListener('click', e => e.stopPropagation());
        });
    });

    if (window.innerWidth <= 768) {
        document.querySelectorAll('.sidebar .dropdown').forEach(d => d.style.pointerEvents = 'auto');
    }

    // Smooth scroll internal
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                toggleSidebar(false);
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Carousel
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.carousel-dots');
    let current = 0;
    let autoplay;
    let animating = false;

    function updateSlide() {
        if (animating) return;
        animating = true;

        items.forEach(item => {
            item.style.transition = 'opacity 0.8s ease-in-out';
            item.classList.remove('active');
        });
        document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));

        items[current].classList.add('active');
        document.querySelectorAll('.dot')[current].classList.add('active');

        setTimeout(() => animating = false, 800);
    }

    function goToSlide(i) {
        current = i;
        updateSlide();
        resetAutoplay();
    }

    function nextSlide() {
        if (!animating) {
            current = (current + 1) % items.length;
            updateSlide();
        }
    }

    function prevSlide() {
        current = (current - 1 + items.length) % items.length;
        updateSlide();
    }

    function startAutoplay() {
        autoplay = setInterval(() => !animating && nextSlide(), 6000);
    }

    function resetAutoplay() {
        clearInterval(autoplay);
        startAutoplay();
    }

    // Setup carousel
    items.forEach(item => {
        item.style.pointerEvents = 'none';
        item.querySelectorAll('a, button').forEach(el => el.style.pointerEvents = 'auto');
    });

    if (document.querySelector('.hero')) {
        const heroButtons = document.querySelectorAll('.hero a, .hero button');
        document.querySelector('.hero').style.pointerEvents = 'none';
        heroButtons.forEach(btn => btn.style.pointerEvents = 'auto');
    }

    items.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });

    carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
    carousel.addEventListener('mouseleave', startAutoplay);

    // Start carousel
    startAutoplay();
