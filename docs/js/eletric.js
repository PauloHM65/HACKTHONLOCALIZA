(() => {
  const carousel = document.querySelector(".carousel");
  const slides = [...carousel.querySelectorAll(".carousel-slide")];
  const dots = [...carousel.querySelectorAll(".carousel-dot")];
  const previousButton = carousel.querySelector(".carousel-arrow--previous");
  const nextButton = carousel.querySelector(".carousel-arrow--next");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let activeIndex = 0;
  let autoplay;

  function showSlide(index) {
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
      slide.querySelectorAll("a").forEach((link) => {
        link.tabIndex = isActive ? 0 : -1;
      });
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeIndex;
      dot.classList.toggle("is-active", isActive);
      if (isActive) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  }

  function stopAutoplay() {
    window.clearInterval(autoplay);
  }

  function startAutoplay() {
    if (reducedMotion) return;
    stopAutoplay();
    autoplay = window.setInterval(() => showSlide(activeIndex + 1), 7000);
  }

  previousButton.addEventListener("click", () => {
    showSlide(activeIndex - 1);
    startAutoplay();
  });
  nextButton.addEventListener("click", () => {
    showSlide(activeIndex + 1);
    startAutoplay();
  });
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      startAutoplay();
    });
  });

  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);
  carousel.addEventListener("focusin", stopAutoplay);
  carousel.addEventListener("focusout", (event) => {
    if (!carousel.contains(event.relatedTarget)) startAutoplay();
  });
  showSlide(0);
  startAutoplay();

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#main-navigation");
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    navigation.classList.toggle("is-open", isOpen);
  });
  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
      navigation.classList.remove("is-open");
    }
  });

  const categoryList = document.querySelector("#category-list");
  document.querySelectorAll("[data-category-scroll]").forEach((button) => {
    button.addEventListener("click", () => {
      categoryList.scrollBy({
        left: Number(button.dataset.categoryScroll) * categoryList.clientWidth * 0.8,
        behavior: "smooth"
      });
    });
  });
})();
