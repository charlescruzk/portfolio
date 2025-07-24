
document.addEventListener("DOMContentLoaded", () => {
  AOS.init({ duration: 1000, once: true });

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const close = document.querySelector(".close");

  document.querySelectorAll(".lightbox-trigger").forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
  });

  close.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });

  // Before/After slider
  const resizer = document.querySelector(".resizer");
  if (resizer) {
    const wrapper = document.querySelector(".ba-wrapper");
    const afterImg = wrapper.querySelectorAll("img")[1];
    let isDragging = false;
    resizer.addEventListener("mousedown", () => isDragging = true);
    window.addEventListener("mouseup", () => isDragging = false);
    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      let rect = wrapper.getBoundingClientRect();
      let offsetX = e.clientX - rect.left;
      let percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
      resizer.style.left = percentage + "%";
      afterImg.style.clipPath = `inset(0 0 0 ${percentage}%)`;
    });
  }
});
