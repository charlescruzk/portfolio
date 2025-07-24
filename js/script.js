
document.addEventListener("DOMContentLoaded", function () {
  const resizers = document.querySelectorAll(".resizer");
  resizers.forEach((resizer) => {
    const wrapper = resizer.parentElement;
    const afterImg = wrapper.querySelectorAll("img")[1];
    let isDragging = false;

    resizer.addEventListener("mousedown", () => (isDragging = true));
    window.addEventListener("mouseup", () => (isDragging = false));
    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      let rect = wrapper.getBoundingClientRect();
      let offsetX = e.clientX - rect.left;
      let percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
      resizer.style.left = percentage + "%";
      afterImg.style.clipPath = `inset(0 0 0 ${percentage}%)`;
    });
  });
});
