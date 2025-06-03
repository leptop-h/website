
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

    updateCarousel();
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
        autoSlideInterval = setInterval(nextSlide, 8000); // 5 detik
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

// components/js/hero.js
document.addEventListener("DOMContentLoaded", () => {
  fetch('data/hero.json')
    .then(res => res.json())
    .then(data => {
      const carousel = document.getElementById("hero-carousel");
      const nav = carousel.querySelector(".carousel-nav");
      
      data.slides.forEach((slide, index) => {
        const item = document.createElement("div");
        item.className = "carousel-item" + (index === 0 ? " active" : "");
        item.style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${slide.background}')`;
        item.style.backgroundSize = 'cover';

        item.innerHTML = `
          <div class="hero-content">
            <h1>${slide.title}</h1>
            <p>${slide.description}</p>
            <div class="hero-buttons">
              <a href="${slide.button1_url}" class="btn primary">${slide.button1_label}</a>
              <a href="${slide.button2_url}" class="btn secondary">${slide.button2_label}</a>
            </div>
          </div>
        `;
        
        carousel.insertBefore(item, nav);
      });

      // Optional: Inisialisasi carousel logic (next/prev btn) bisa ditaruh di sini
    })
    .catch(err => console.error("Gagal memuat hero.json:", err));
});


