let My_geolocation = navigator.geolocation;

if(My_geolocation) {
    My_geolocation.getCurrentPosition(function(position) {
        console.log(position.coords.latitude);
    
        document.getElementById("txt_latitud").value = position.coords.latitude;
        document.getElementById("txt_longitud").value = position.coords.longitude;

        var map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 14);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 50,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
    
    })
}else{
    alert("Navegador no soporta,Cambia de PC");
}