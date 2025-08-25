// File: /location-map-app/location-map-app/src/app.js

const mapContainer = document.getElementById('map');
let map;
let userLocationMarker;

function initMap() {
    map = L.map(mapContainer).setView([0, 0], 2); // Set initial view to world map

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Get user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;

                // Add a red circle at the user's location.
                // Leaflet automatically handles redrawing the circle when the map is panned or zoomed.
                // The 'move' and 'zoom' event listeners are not needed for this.
                userLocationMarker = L.circle([userLat, userLng], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 30 // Radius in meters
                }).addTo(map);
            },
            () => {
                alert("Unable to retrieve your location. Please enable location services.");
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initMap();

    const startBtn = document.getElementById('start-btn');
    const timerDiv = document.getElementById('timer');
    let countdownInterval;

    startBtn.addEventListener('click', () => {
        let timeLeft = 180;
        startBtn.disabled = true;

        function updateTimer() {
            const min = Math.floor(timeLeft / 60);
            const sec = timeLeft % 60;
            startBtn.textContent = `${min}:${sec.toString().padStart(2, '0')}`;
        }

        updateTimer();

        countdownInterval = setInterval(() => {
            timeLeft--;
            updateTimer();
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                alert("timer stop");
                startBtn.textContent = "Start";
                startBtn.disabled = false;
            }
        }, 1000);
    });
});