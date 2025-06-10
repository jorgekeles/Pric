document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("id");

  if (!projectId) return;

  fetch("data/project.json")
    .then(response => response.json())
    .then(data => {
      const currentIndex = data.findIndex(p => p.id === projectId);
      if (currentIndex === -1) return;

      const proyecto = data[currentIndex];

      const anterior = currentIndex > 0 ? data[currentIndex - 1] : null;
      const siguiente = currentIndex < data.length - 1 ? data[currentIndex + 1] : null;

      const main = document.getElementById("project-content");

      const lineas = proyecto.descripcion.split("\n").filter(line => line.trim() !== "");
      const primeraLinea = lineas[0];
      const otrasLineas = lineas.slice(1);

    const descripcionHTML = `
  <div class="text-description">
    <p class="intro">${primeraLinea}</p>
    ${otrasLineas.map(line => {
      if (line.startsWith("- ")) {
        // Lista con cuadradito
        return `<p><span class="square"></span>${line.slice(2)}</p>`;
      } else if (line.includes(":")) {
        // Líneas que contienen ':' sin cuadradito pero con estilo especial
        return `<p class="with-colon">${line}</p>`;
      } else {
        // Párrafos normales
        return `<p>${line}</p>`;
      }
    }).join("")}
  </div>
`;

      const navButtonsHTML = `
        <div class="project-nav">
          ${anterior ? `<a href="project.html?id=${anterior.id}" class="nav-button prev"><img src="img/icons/arrow.svg" alt="anterior" /></a>` : ""}
          ${siguiente ? `<a href="project.html?id=${siguiente.id}" class="nav-button next"><img src="img/icons/arrow.svg" alt="siguiente" /></a>` : ""}
        </div>
      `;

      main.innerHTML = `
        <div class="detail-main-image project">
          <img src="${proyecto.portada}" alt="Slide 1" />
          <div class="text">
            <h1>${proyecto.titulo}</h1>
            <span class="square"></span>
            <span class="number">${proyecto.ubicacion}</span>
          </div>
        </div>

        <section class="project-page">
          <div class="text-section">
            <div class="split-columns">
              <div class="left-block">
                <div class="title">
                  <div class="section-header">
                    <h2>${proyecto.categoria}</h2>
                  </div>
                  <div class="description dark">
                    <p><span>Obra .</span> ${proyecto.obra}</p>
                    <p><span>Estado .</span> ${proyecto.estado}</p>
                    <p><span>Año .</span> ${proyecto.anio}</p>
                    <p><span>Superficie .</span> ${proyecto.superficie}</p>
                  </div>
                </div>
              </div>

              <div class="right-block">
                ${descripcionHTML}
              </div>
            </div>
          </div>
        </section>

        <section class="work-page-projects grey work">
          <div class="work-container">
            <div class="work-image-container">
              ${proyecto.imagenes.map(img => `
                <div class="work-card-container on-page">
                  <img src="${img}" alt="proyectos" class="gallery-image"/>
                </div>
              `).join("")}
            </div>
          </div>
                    ${navButtonsHTML}

        </section>

      `;
      setTimeout(() => {
  const overlay = document.getElementById("lightbox-overlay");
const overlayImg = overlay.querySelector(".gallery-img");
  const nextBtn = document.getElementById("lightbox-next");
  const prevBtn = document.getElementById("lightbox-prev");

  const images = Array.from(document.querySelectorAll(".gallery-image"));
  let currentIndex = 0;

  function showImage(index) {
    if (index >= 0 && index < images.length) {
      overlayImg.src = images[index].src;
      currentIndex = index;
    }
  }

  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      overlay.style.display = "flex";
      showImage(index);
    });
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const nextIndex = (currentIndex + 1) % images.length;
    showImage(nextIndex);
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(prevIndex);
  });

  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
    overlayImg.src = "";
  });
});

    });
});
