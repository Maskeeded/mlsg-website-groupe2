const map = L.map('map').setView([50.8247455, 4.3463968], 19);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const basicIcon = L.icon({
    iconUrl: "assets/images/marker-icon.png",
});
const marker = L.marker([50.8247455, 4.3463968], {icon: basicIcon}).addTo(map);


