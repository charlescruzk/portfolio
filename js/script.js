// Optional: JS functionality can be added here later

// Before/After Slider Functionality
document.addEventListener("DOMContentLoaded", function () {
  const resizer = document.querySelector(".resizer");
  const wrapper = document.querySelector(".ba-wrapper");
  const afterImg = wrapper.querySelectorAll("img")[1];

  let isDragging = false;

  resizer.addEventListener("mousedown", function () {
    isDragging = true;
  });

  window.addEventListener("mouseup", function () {
    isDragging = false;
  });

  window.addEventListener("mousemove", function (e) {
    if (!isDragging) return;
    let rect = wrapper.getBoundingClientRect();
    let offsetX = e.clientX - rect.left;
    let percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
    resizer.style.left = percentage + "%";
    afterImg.style.clipPath = `inset(0 0 0 ${percentage}%)`;
  });
});
