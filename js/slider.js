document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.ba-container').forEach(container => {
    const afterImg = container.querySelector('.after-image');
    const slider = container.querySelector('.ba-slider');

    const moveSlider = (e) => {
      const bounds = container.getBoundingClientRect();
      let x = e.clientX - bounds.left;
      x = Math.max(0, Math.min(x, bounds.width));
      const percent = (x / bounds.width) * 100;
      afterImg.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
      slider.style.left = `${percent}%`;
    };

    const startDrag = () => {
      window.addEventListener('mousemove', moveSlider);
      window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', moveSlider);
      }, { once: true });
    };

    slider.addEventListener('mousedown', startDrag);
  });
});
