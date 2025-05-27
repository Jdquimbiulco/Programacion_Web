function cargarPaginas(nombre_pagina) {
    fetch(nombre_pagina)
        .then(res => res.text())
        .then(data => document.getElementById("contenido").innerHTML = data)
        .catch(err => console.error("Error al cargar la página:", err));
}

// Configuración inicial para cargar una página por defecto
window.onload = () => {
    cargarPaginas("carusel.html"); // Página inicial por defecto
};
