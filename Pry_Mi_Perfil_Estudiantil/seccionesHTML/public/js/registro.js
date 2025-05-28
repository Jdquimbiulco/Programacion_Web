document.addEventListener("DOMContentLoaded", () => {
    // Elementos
    const btnGuardar = document.getElementById("btn_guardar");
    const nombre = document.getElementById("nombre");
    const edad = document.getElementById("edad");
    const departamentoRadios = document.querySelectorAll('input[name="departamento"]');
    var btnUbicacion = document.getElementById("btn_ubicacion");
    const ubicacionInfo = document.getElementById("ubicacionInfo");
    const video = document.getElementById("my_video");
    const canvas = document.getElementById("my_foto");
    const context = canvas.getContext("2d");



    // Guardar datos en localStorage
    btnGuardar.addEventListener("click", () => {
        const nombreVal = nombre.value.trim();
        const edadVal = edad.value.trim();
        const departamentoSeleccionado = Array.from(departamentoRadios).find(r => r.checked);

        if (!nombreVal || !edadVal || !departamentoSeleccionado) {
            alert("Por favor, complete todos los campos antes de guardar.");
            return;
        }

        const datosUsuario = {
            nombre: nombreVal,
            edad: edadVal,
            departamento: departamentoSeleccionado.id,
        };

        localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));
        alert("Datos guardados correctamente.");
    });

    // Iniciar cámara
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                video.srcObject = stream;
            })
            .catch(() => {
                alert("No se pudo acceder a la cámara.");
            });
    }

    // Tomar foto
    document.getElementById("btn_tomar_foto").addEventListener("click", () => {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
    });

    // Descargar foto
    document.getElementById("btn_descargar").addEventListener("click", () => {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "foto.png";
        link.click();
    });

    // Mapa Leaflet
    let mapa;
    let marcador;

    btnUbicacion.addEventListener("click", () => {
        if (!navigator.geolocation) {
            ubicacionInfo.textContent = "Geolocalización no soportada por tu navegador.";
            return;
        }
        ubicacionInfo.textContent = "Obteniendo ubicación...";

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                ubicacionInfo.textContent = `Latitud: ${latitude.toFixed(5)}, Longitud: ${longitude.toFixed(5)}`;

                if (!mapa) {
                    mapa = L.map("mapa").setView([latitude, longitude], 13);
                    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                        maxZoom: 19,
                        attribution: "© OpenStreetMap",
                    }).addTo(mapa);
                    marcador = L.marker([latitude, longitude]).addTo(mapa);
                } else {
                    mapa.setView([latitude, longitude], 13);
                    marcador.setLatLng([latitude, longitude]);
                }

            },
            (error) => {
                ubicacionInfo.textContent = `Error al obtener ubicación: ${error.message}`;
            }
        );
    });
});
