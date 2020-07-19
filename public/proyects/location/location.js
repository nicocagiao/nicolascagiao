window.onload=function(){
  document.getElementById("loc").addEventListener("click", function(){

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            document.getElementById('latitud').textContent = lat.toFixed(5);
            document.getElementById('longitud').textContent = lon.toFixed(5);
    

            const data = {lat, lon};
            const options = {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify(data),
            };
            const response = await fetch('/api2', options);
            const json = await response.json();
            console.log(json);

            var mymap = L.map('mapid').setView([lat, lon], 15);
            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
                accessToken: 'pk.eyJ1Ijoibmljb2NhZ2lhbyIsImEiOiJja2NudTVmYnUwZW1zMnRtcTc3Z3Nkem05In0.32qzhDUo7f6olpUfQ7QQag'
            }).addTo(mymap);
            
            var marker = L.marker([lat, lon]).addTo(mymap);
            marker.bindPopup("Acá estas picarón!");


    });
    } else {
    console.log('no hay geolocalización')
    }

});
}

