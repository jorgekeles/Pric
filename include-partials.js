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
  const navMobile = document.querySelector(".nav-mobile");

  toggle.addEventListener("click", () => {
    const isActive = navMobile.classList.contains("open");

    // Toggle visibilidad
    navMobile.classList.toggle("open");

    // Cambiar ícono
    toggle.textContent = isActive ? "☰" : "✕";
  });

  // Cerrar menú al hacer clic en un link
  const navLinks = document.querySelectorAll(".nav-mobile a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMobile.classList.remove("open");
      toggle.textContent = "☰";
    });
  });
}


});