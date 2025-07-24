
document.addEventListener("DOMContentLoaded", function () {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.querySelector(".close");
  const gridImages = document.querySelectorAll(".grid-item img");

  let currentIndex = 0;

  function openLightbox(index) {
    const img = gridImages[index];
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = img.alt || "";
    currentIndex = index;
  }

  gridImages.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
    lightboxImg.src = "";
    lightboxCaption.textContent = "";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
      lightboxImg.src = "";
      lightboxCaption.textContent = "";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "ArrowRight") {
        currentIndex = (currentIndex + 1) % gridImages.length;
        openLightbox(currentIndex);
      } else if (e.key === "ArrowLeft") {
        currentIndex = (currentIndex - 1 + gridImages.length) % gridImages.length;
        openLightbox(currentIndex);
      } else if (e.key === "Escape") {
        lightbox.style.display = "none";
        lightboxImg.src = "";
        lightboxCaption.textContent = "";
      }
    }
  });
});
