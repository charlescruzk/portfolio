
document.addEventListener("DOMContentLoaded", function () {
  const sliders = document.querySelectorAll('.slide-in-section');

  // Apply a staggered delay based on the element's position
  sliders.forEach((slider, index) => {
    slider.style.setProperty('--delay', `${index * 0.2}s`);
  });

  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px"
  };

  const appearOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  sliders.forEach(slider => {
    appearOnScroll.observe(slider);
  });
});
