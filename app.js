// Dataset with safety indicator
const data = [
    { "location": [-20, 70], "metals": { "aluminium": 1.65, "ammonia": 9.08, "arsenic": 0.04 } },
    { "location": [-45, 71], "metals": { "aluminium": 2.32, "ammonia": 21.16, "arsenic": 0.01 } },
    { "location": [-22, 65], "metals": { "aluminium": 1.01, "ammonia": 14.02, "arsenic": 0.04 } },
    { "location": [-23, 60], "metals": { "aluminium": 1.36, "ammonia": 11.33, "arsenic": 0.04 } },
    { "location": [-30, 80], "metals": { "aluminium": 1.5, "ammonia": 10.0, "arsenic": 0.02 } }, // safe point
    { "location": [-34, 84], "metals": { "aluminium": 0.92, "ammonia": 24.33, "arsenic": 0.03 } },
    { "location": [-39, 100], "metals": { "aluminium": 0.94, "ammonia": 14.47, "arsenic": 0.03 } },
    { "location": [-26, 76], "metals": { "aluminium": 2.36, "ammonia": 5.6, "arsenic": 0.01 } },
    { "location": [-36, 91], "metals": { "aluminium": 0.8, "ammonia": 5.0, "arsenic": 0.01 } },  // safe point
    { "location": [-50, 75], "metals": { "aluminium": 3.93, "ammonia": 19.87, "arsenic": 0.04 } },
    { "location": [-28, 88], "metals": { "aluminium": 0.6, "ammonia": 24.58, "arsenic": 0.01 } },
    { "location": [-29, 99], "metals": { "aluminium": 0.61, "ammonia": 22.58, "arsenic": 0.02 } },
    { "location": [-40, 82], "metals": { "aluminium": 1.2, "ammonia": 15.0, "arsenic": 0.025 } }, // safe point    
];

// Determine if the point is safe
const isSafe = (metals) => {
    const thresholds = { aluminium: 2.0, ammonia: 20.0, arsenic: 1.0 };
    return metals.aluminium < thresholds.aluminium && 
           metals.ammonia < thresholds.ammonia && 
           metals.arsenic < thresholds.arsenic;
};

// Initialize the map
const map = L.map('map').setView([-25, 75], 5);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add data points to the map
data.forEach(point => {
    const safeStatus = isSafe(point.metals) ? "Safe" : "Unsafe";
    const markerColor = isSafe(point.metals) ? 'blue' : 'red';

    const marker = L.circleMarker(point.location, {
        color: markerColor,
        radius: 8,
        fillOpacity: 0.5,
    }).addTo(map);

    const popupContent = `
        <strong>Metal Concentrations:</strong><br>
        Aluminium: ${point.metals.aluminium} µg/L<br>
        Ammonia: ${point.metals.ammonia} µg/L<br>
        Arsenic: ${point.metals.arsenic} µg/L<br>
        <strong>Status: ${safeStatus}</strong>
    `;
    marker.bindPopup(popupContent);
});

