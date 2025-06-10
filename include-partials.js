document.addEventListener("DOMContentLoaded", function () {
  fetch("header.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("header-placeholder").innerHTML = data;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setActiveLink();
          setupMobileNav();
        });
      });
    });

  fetch("footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer-placeholder").innerHTML = data;
    });

  function setActiveLink() {
    const navLinks = document.querySelectorAll(".main-nav a");
    const currentUrl = window.location.pathname.split("/").pop();

    navLinks.forEach(link => {
      const linkHref = link.getAttribute("href");
      if (linkHref === currentUrl || (currentUrl === "" && linkHref === "index.html")) {
        link.classList.add("active");
      }

      link.addEventListener("click", function () {
        navLinks.forEach(l => l.classList.remove("active"));
        this.classList.add("active");
      });
    });
  }

function setupMobileNav() {
  const toggle = document.querySelector(".menu-toggle");
  const navLeft = document.querySelector(".nav-left");
  const navRight = document.querySelector(".nav-right");

  toggle.addEventListener("click", () => {
    const isActive = navLeft.classList.contains("active");

    // Toggle visibilidad
    navLeft.classList.toggle("active");
    navRight.classList.toggle("active");

    // Cambiar ícono
    toggle.textContent = isActive ? "☰" : "✕";
  });

  // Cerrar menú al hacer clic en un link
  const navLinks = document.querySelectorAll(".nav-left a, .nav-right a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLeft.classList.remove("active");
      navRight.classList.remove("active");
      toggle.textContent = "☰";
    });
  });
}

});