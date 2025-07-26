/*
 * Combined script to enable both a Lightbox preview and a before–after
 * slider on the same page. This single file merges the behaviour of the
 * original script.js (for the before–after slider) and script‑v2.js
 * (for the lightbox). It should be loaded after the DOM has been
 * constructed (typically at the end of the body). All event handlers
 * are attached within a single DOMContentLoaded callback to ensure
 * proper initialisation.
 */
document.addEventListener("DOMContentLoaded", function () {
  /* mobile navigation toggle */
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navBar = document.querySelector('.main-nav');
  let lastScroll = 0;
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }

  /* hide nav on scroll down, show on scroll up */
  window.addEventListener('scroll', () => {
    if (!navBar) return;
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScroll && currentScroll > navBar.offsetHeight) {
      navBar.classList.add('hide');
    } else {
      navBar.classList.remove('hide');
    }
    lastScroll = currentScroll;
  });
  /* Lightbox functionality */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.querySelector(".close");
  const gridImages = document.querySelectorAll(".grid-item img");

  let currentIndex = 0;

  function openLightbox(index) {
    const img = gridImages[index];
    // Display the overlay and update the image source and alt text
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    if (lightboxCaption) {
      lightboxCaption.textContent = img.alt || "";
    }
    currentIndex = index;
  }

  // Attach click listeners to each grid item and its image to open the lightbox.
  // We listen on the parent element (grid-item) to avoid the overlay div
  // blocking pointer events. Clicking on either the image or its overlay
  // will trigger the lightbox to open.
  gridImages.forEach((img, index) => {
    // Register on the image element
    img.addEventListener("click", () => openLightbox(index));
    // Also register on the parent .grid-item element
    if (img.parentElement) {
      img.parentElement.addEventListener("click", () => openLightbox(index));
    }
  });

  // Close button hides the lightbox and clears its contents
  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
    lightboxImg.src = "";
    if (lightboxCaption) {
      lightboxCaption.textContent = "";
    }
  });

  // Clicking on the backdrop (but not the image) closes the lightbox
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
      lightboxImg.src = "";
      if (lightboxCaption) {
        lightboxCaption.textContent = "";
      }
    }
  });

  // Keyboard navigation: arrow keys to navigate, escape to close
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
        if (lightboxCaption) {
          lightboxCaption.textContent = "";
        }
      }
    }
  });

  /* Before–After slider functionality */
  document.querySelectorAll('.ba-container').forEach(container => {
    const afterImage = container.querySelectorAll('img')[1];
    const slider = container.querySelector('.ba-slider');

    const updateSlider = (x) => {
      const rect = container.getBoundingClientRect();
      let offsetX = x - rect.left;
      // Ensure the slider remains within the container bounds
      offsetX = Math.max(0, Math.min(offsetX, rect.width));
      const percent = (offsetX / rect.width) * 100;
      // Adjust the visible portion of the after image via clip‑path
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

  /* Contact form handling */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const emailInput = document.getElementById('email');
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!subject) {
        alert('Please enter a subject.');
        return;
      }

      if (!emailInput.checkValidity()) {
        alert('Please enter a valid email address.');
        return;
      }

      const mailtoLink = `mailto:charlescruz.k@me.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + emailInput.value + '\n\n' + message)}`;
      window.location.href = mailtoLink;
    });
  }
});
