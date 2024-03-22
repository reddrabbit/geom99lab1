var map = L.map('map').setView([51.505, -0.09], 13);

// Add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Initialize Leaflet.draw
var drawnItems = new L.FeatureGroup(); // FeatureGroup to hold all drawn shapes
map.addLayer(drawnItems);
var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnItems
    }
});
map.addControl(drawControl);

// Variables to store the drawn circle and its radius
var drawnCircle;
var bufferRadius;

// Function to start buffer measurement
function startBuffer() {
    map.on('draw:created', function (e) {
        var type = e.layerType;
        var layer = e.layer;
        if (type === 'circle') {
            if (drawnCircle) {
                drawnItems.removeLayer(drawnCircle); // Remove previous circle if exists
            }
            drawnCircle = layer;
            bufferRadius = drawnCircle.getRadius();
            drawnItems.addLayer(drawnCircle);
            document.getElementById('bufferResult').innerHTML = 'Buffer Radius: ' + bufferRadius.toFixed(2) + ' meters';
            document.getElementById('clearBufferBtn').style.display = 'block';
        } else {
            drawnItems.addLayer(layer); // Add other shapes to the same FeatureGroup
        }
    });
}

// Function to clear buffer
function clearBuffer() {
    drawnItems.clearLayers();
    document.getElementById('bufferResult').innerHTML = '';
    document.getElementById('clearBufferBtn').style.display = 'none';
}

// Attach event listeners to buttons
document.getElementById('startBufferBtn').addEventListener('click', startBuffer);
document.getElementById('clearBufferBtn').addEventListener('click', clearBuffer);
