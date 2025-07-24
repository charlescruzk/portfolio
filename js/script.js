
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const close = document.querySelector(".close");

  document.querySelectorAll(".grid-item img").forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
  });

  close.addEventListener("click", () => lightbox.style.display = "none");
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) lightbox.style.display = "none";
  });
});

document.querySelectorAll('.ba-container').forEach(container => {
  const afterImage = container.querySelectorAll('img')[1];
  const slider = container.querySelector('.ba-slider');

  const updateSlider = (x) => {
    const rect = container.getBoundingClientRect();
    let offsetX = x - rect.left;
    offsetX = Math.max(0, Math.min(offsetX, rect.width));
    const percent = (offsetX / rect.width) * 100;

    afterImage.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
    slider.style.left = `${percent}%`;
  };

  let isDragging = false;

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateSlider(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) updateSlider(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  container.addEventListener('touchstart', (e) => {
    updateSlider(e.touches[0].clientX);
  });

  container.addEventListener('touchmove', (e) => {
    updateSlider(e.touches[0].clientX);
  });
});
