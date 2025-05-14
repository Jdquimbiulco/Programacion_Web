// filepath: c:\Users\frank\NRC-22394\Programacion_Web\Pry_Espe\paginas\cargarForm.js
document.addEventListener("DOMContentLoaded", () => {
  // Carga el formulario de inicio de sesión al cargar la página
    cargarFormulario("./paginas/formLogin.html");
});

function cargarFormulario(archivoFormulario) {
  console.log("Intentando cargar:", archivoFormulario); // Depuración
  fetch(archivoFormulario)
    .then(respuesta => {
      if (!respuesta.ok) {
        throw new Error(`HTTP error! status: ${respuesta.status}`);
      }
      return respuesta.text();
    })
    .then(html => {
      console.log("Formulario cargado correctamente.");
      document.getElementById("form-container").innerHTML = html;
    })
    .catch(error => {
      console.error("Error al cargar el formulario:", error);
      document.getElementById("form-container").innerHTML = "<p class='text-danger'>No se pudo cargar el contenido.</p>";
    });
}