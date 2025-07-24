
document.addEventListener("DOMContentLoaded", function () {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close");

  const gridImages = document.querySelectorAll(".grid-item img");

  gridImages.forEach((img) => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
    lightboxImg.src = "";
    lightboxImg.alt = "";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
      lightboxImg.src = "";
      lightboxImg.alt = "";
    }
  });
});
