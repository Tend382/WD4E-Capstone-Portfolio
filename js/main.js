/* ==========================================================================
   Portfolio Interactive Features (4 Extras)
   1. Dark/Light Theme Switcher with localStorage persistence
   2. Live Category Filter for Projects
   3. Accessible Keyboard + Mouse Lightbox Gallery Modal
   4. Accessible Real-Time Contact Form Validation
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  /* Extra #1: Dark / Light Theme Toggle */
  var themeBtn = document.getElementById("theme-toggle");
  var savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    if (themeBtn) {
      themeBtn.textContent = "Light Mode";
    }
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      document.body.classList.toggle("dark-theme");
      var isDark = document.body.classList.contains("dark-theme");
      localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
      themeBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
    });
  }

  /* Extra #2: Interactive Project Category Filter */
  var filterButtons = document.querySelectorAll(".filter-btn");
  var projectCards = document.querySelectorAll(".project-item");

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterButtons.forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");

      var category = btn.getAttribute("data-filter");
      projectCards.forEach(function (card) {
        var itemCat = card.getAttribute("data-category");
        if (category === "all" || itemCat === category) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  /* Extra #3: Accessible Lightbox Modal on Gallery Page */
  var galleryTriggers = document.querySelectorAll(".gallery-trigger");
  var modal = document.getElementById("lightbox-modal");
  var modalImg = document.getElementById("lightbox-img");
  var modalCaption = document.getElementById("lightbox-caption");
  var closeBtn = document.getElementById("lightbox-close");

  function openLightbox(imgElement) {
    if (!modal || !modalImg || !modalCaption) return;
    modalImg.src = imgElement.src;
    modalImg.alt = imgElement.alt;
    modalCaption.textContent = imgElement.alt;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  galleryTriggers.forEach(function (img) {
    img.setAttribute("tabindex", "0");
    img.addEventListener("click", function () {
      openLightbox(img);
    });
    img.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(img);
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeLightbox();
    }
  });

  /* Extra #4: Contact Form Client-Side Validation */
  var contactForm = document.getElementById("contact-form");
  var statusBox = document.getElementById("form-status");

  if (contactForm && statusBox) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var nameVal = document.getElementById("full-name").value.trim();
      var emailVal = document.getElementById("email-address").value.trim();
      var msgVal = document.getElementById("message-text").value.trim();

      if (nameVal.length < 2 || !emailVal.includes("@") || msgVal.length < 10) {
        statusBox.className = "status-msg error";
        statusBox.textContent = "Please enter a valid name, email address, and a message of at least 10 characters.";
        return;
      }

      statusBox.className = "status-msg success";
      statusBox.textContent = "Thank you, " + nameVal + "! Your message has been validated and sent.";
      contactForm.reset();
    });
  }
});
