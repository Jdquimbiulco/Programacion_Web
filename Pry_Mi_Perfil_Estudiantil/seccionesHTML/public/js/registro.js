document.addEventListener("DOMContentLoaded", function () {
    const btnGuardar = document.getElementById("btn_guardar");
    const btnFoto = document.getElementById("btn_tomar_foto");
    const btnDescargar = document.getElementById("btn_descargar");
    const btnUbicacion = document.getElementById("btn_ubicacion");

    const video = document.getElementById("my_video");
    const canvas = document.getElementById("my_foto");
    const context = canvas.getContext("2d");
    const infoUbicacion = document.getElementById("ubicacionInfo");

    let mapa = null;
    let marcador = null;

    // Activar cámara
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;
            })
            .catch(() => alert("No se pudo acceder a la cámara."));
    }

    // Tomar foto
    btnFoto.addEventListener("click", () => {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
    });

    // Descargar foto
    btnDescargar.addEventListener("click", () => {
        const imagen = canvas.toDataURL("image/png");
        const enlace = document.createElement("a");
        enlace.href = imagen;
        enlace.download = "foto.png";
        enlace.click();
    });

    // Obtener ubicación
    btnUbicacion.addEventListener("click", () => {
        if (!navigator.geolocation) {
            infoUbicacion.textContent = "Geolocalización no soportada.";
            return;
        }

        infoUbicacion.textContent = "Obteniendo ubicación...";

        navigator.geolocation.getCurrentPosition(pos => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;

            infoUbicacion.textContent = `Latitud: ${lat.toFixed(5)}, Longitud: ${lon.toFixed(5)}`;

            if (!mapa) {
                mapa = L.map("mapa").setView([lat, lon], 13);
                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    maxZoom: 19,
                    attribution: "© OpenStreetMap"
                }).addTo(mapa);
                marcador = L.marker([lat, lon]).addTo(mapa);
            } else {
                mapa.setView([lat, lon], 13);
                marcador.setLatLng([lat, lon]);
            }
        }, err => {
            infoUbicacion.textContent = "Error: " + err.message;
        });
    });

    // Guardar datos
    btnGuardar.addEventListener("click", () => {
        const nombre = document.getElementById("nombre").value.trim();
        const apellidos = document.getElementById("apellidos").value.trim();
        const cedula = document.getElementById("cedula").value.trim();
        const email = document.getElementById("email").value.trim();
        const edad = document.getElementById("edad").value.trim();

        const departamento = document.querySelector('input[name="departamento"]:checked');

         const imagen = canvas.toDataURL("image/png");

        if (!nombre || !apellidos || !cedula || !email || !edad || !departamento) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const datos = {
            nombre,
            apellidos,
            cedula,
            email,
            edad,
            departamento: departamento.value,
            imagen: imagen 
        };

        localStorage.setItem("datosUsuario", JSON.stringify(datos));
        alert("Datos guardados correctamente.");
    });
});
