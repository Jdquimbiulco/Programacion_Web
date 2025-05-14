  function cargarPaginas(ruta, link = null) {
    fetch(ruta)
      .then(response => {
        if (!response.ok) throw new Error("No se pudo cargar la página");
        return response.text();
      })
      .then(data => {
        document.getElementById("contenido").innerHTML = data;

        // Resaltar el enlace activo
        document.querySelectorAll('.sidebar .nav-link').forEach(el => el.classList.remove('active'));
        if (link) link.classList.add('active');
      })
      .catch(error => {
        document.getElementById("contenido").innerHTML = "<p class='text-danger'>Error al cargar la página.</p>";
        console.error(error);
      });
  }

  // Cargar página principal al inicio
  window.onload = () => {
    cargarPaginas('paginas/PrinDashboard.html');
  };