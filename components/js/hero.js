
document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".carousel-item");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const dotsContainer = document.querySelector(".carousel-dots");

    let current = 0;
    let autoSlideInterval;

    // Buat dot navigasi
    items.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    function updateCarousel() {
        items.forEach((item, index) => {
            item.classList.toggle("active", index === current);
            dots[index].classList.toggle("active", index === current);
        });
    }

    function goToSlide(index) {
        current = index;
        updateCarousel();
        resetAutoSlide();
    }

    function nextSlide() {
        current = (current + 1) % items.length;
        updateCarousel();
    }

    function prevSlide() {
        current = (current - 1 + items.length) % items.length;
        updateCarousel();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // 5 detik
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    nextBtn.addEventListener("click", () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        resetAutoSlide();
    });

    startAutoSlide();
});

