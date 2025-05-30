document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');
    const dropdowns = document.querySelectorAll('.sidebar .dropdown');
    const isHomePage = document.body.id === 'home-page';
    let lastScrollY = window.scrollY;
    let touchStartX = 0, touchEndX = 0;

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
    });

    navbar.classList.add('visible');

    // Sidebar toggle
    function toggleSidebar(show = null) {
        const isActive = sidebar.classList.contains('active');
        const shouldShow = show !== null ? show : !isActive;

        sidebar.classList.toggle('active', shouldShow);
        hamburger.classList.toggle('active', shouldShow);
    }

    hamburger.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        toggleSidebar();
    });

    // Klik luar sidebar tutup sidebar (kecuali dropdown)
    document.addEventListener('click', e => {
        if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
            toggleSidebar(false);
        }
    });

    // Dropdown handling
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('a');
        const content = dropdown.querySelector('.dropdown-content');

        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const isActive = dropdown.classList.contains('active');

            dropdowns.forEach(d => {
                d.classList.remove('active');
                d.querySelector('.dropdown-content')?.classList.remove('show');
            });

            if (!isActive) {
                dropdown.classList.add('active');
                content.classList.add('show');
            }
        });

        content.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', e => e.stopPropagation());
        });
    });

    // Link klik tutup sidebar
    sidebar.querySelectorAll('a:not(.dropdown > a)').forEach(link => {
        link.addEventListener('click', () => toggleSidebar(false));
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.getElementById(this.getAttribute('href').substring(1));
            if (target) {
                e.preventDefault();
                toggleSidebar(false);
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Sidebar touch gesture
    let touchActive = false, lastTouchY = 0, startTime = 0, isScrolling = false;

    sidebar.addEventListener('touchstart', e => {
        if (!sidebar.classList.contains('active')) return;
        touchActive = true;
        touchStartX = touchEndX = e.touches[0].clientX;
        lastTouchY = e.touches[0].clientY;
        startTime = Date.now();
        isScrolling = false;
        sidebar.style.transition = 'none';
    });

    sidebar.addEventListener('touchmove', e => {
        if (!touchActive) return;

        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const deltaX = touchX - touchStartX;
        const deltaY = touchY - lastTouchY;

        if (!isScrolling && Math.abs(deltaY) > Math.abs(deltaX)) {
            isScrolling = true;
            return;
        }

        if (!isScrolling && deltaX < 0) {
            e.preventDefault();
            touchEndX = touchX;
            const offset = Math.max(-300, deltaX);
            sidebar.style.transform = `translateX(${offset}px)`;
        }

        lastTouchY = touchY;
    });

    sidebar.addEventListener('touchend', () => {
        if (!touchActive || isScrolling) return;

        touchActive = false;
        const deltaX = touchEndX - touchStartX;
        const duration = Date.now() - startTime;
        const velocity = deltaX / duration;

        sidebar.style.transition = 'transform 0.3s ease, opacity 0.3s ease';

        if (deltaX < -80 || velocity < -0.3) {
            toggleSidebar(false);
            sidebar.style.transform = '';
        } else {
            sidebar.style.transform = '';
        }
    });
});
