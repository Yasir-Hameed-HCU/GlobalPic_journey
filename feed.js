// Assuming mapboxgl.accessToken is set in another file or before this script
var map;
function mapinit() {
  map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11' // style URL
  });

  feedData(); // Call feedData to load and display the feed
}

function feedData() {
  fetch("https://your-server-endpoint.com/api/feed.json")
    .then(response => response.json())
    .then(data => {
      Object.keys(data).forEach(id => {
        var entry = data[id];
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<p>Status: ${entry.status}</p>
           <img src="${entry.image}" alt="Photo" style="width:100%;">
           <p>Email: ${entry.email}</p>`
        );

        // create DOM element for the marker
        const el = document.createElement('div');
        el.className = 'marker';

        // create the marker
        new mapboxgl.Marker(el)
          .setLngLat([entry.location.longitude, entry.location.latitude])
          .setPopup(popup) // sets a popup on this marker
          .addTo(map);
      });
    })
    .catch(error => console.error('Error loading feed:', error));
}

document.addEventListener('DOMContentLoaded', () => {
  if (!mapboxgl.supported()) {
    alert('Your browser does not support Mapbox GL');
  } else {
    mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
    mapinit(); // Initialize the map after the DOM is fully loaded
  }
});
