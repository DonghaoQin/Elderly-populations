<template>
  <div>
    <!-- Search bar -->
    <div>
      <input v-model="query" @keyup.enter="searchLocation" placeholder="Search for a location" />
      <button @click="searchLocation">Search</button>
      <button v-if="destination" @click="navigateToDestination">Navigate</button> <!-- Navigate button -->
    </div>

    <!-- Map container -->
    <div id="map" style="width: 100%; height: 500px;"></div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

export default {
  name: 'MapView',
  data() {
    return {
      map: null,
      query: '',  // User's input for the location search
      marker: null,  // Marker for the searched location
      userLocation: [145.1346, -37.9105],  // Fixed location: 33 Innovation Walk, Clayton VIC 3168
      destination: null,  // Coordinates of the searched location (for navigation)
    };
  },
  mounted() {
    // Initialize the map with a fixed location (33 Innovation Walk)
    mapboxgl.accessToken = 'pk.eyJ1IjoiZG9uZ2hhb3FpbiIsImEiOiJjbTIxb3I2MmcwOWs5Mm1weHdzODJleWF3In0.J-NoM8jZreEeTpXxiobzYQ';
    this.initializeMap(this.userLocation);  // Use fixed location
  },
  methods: {
    // Function to initialize the map
    initializeMap(location) {
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: location,  // Set the map center to the fixed location
        zoom: 12,
      });

      // Add a marker for the fixed location
      this.marker = new mapboxgl.Marker({ color: "blue" })
        .setLngLat(location)
        .addTo(this.map);
    },
    // Search for a location using Mapbox Geocoding API
    searchLocation() {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(this.query)}.json?access_token=pk.eyJ1IjoiZG9uZ2hhb3FpbiIsImEiOiJjbTIxb3I2MmcwOWs5Mm1weHdzODJleWF3In0.J-NoM8jZreEeTpXxiobzYQ`;

      // Log the request URL to check if it is constructed correctly
      console.log('Request URL:', url);

      // Make the API call using axios
      axios.get(url)
        .then((response) => {
          // Log the API response to inspect it
          console.log('API Response:', response);

          const features = response.data.features;
          if (features.length > 0) {
            const location = features[0].center;
            this.destination = location;  // Save the destination coordinates for navigation

            // Move the map to the searched location
            this.map.flyTo({ center: location, zoom: 14 });

            // If a marker already exists, remove it
            if (this.marker) {
              this.marker.remove();
            }

            // Add a new marker for the searched location
            this.marker = new mapboxgl.Marker().setLngLat(location).addTo(this.map);
          } else {
            alert("Location not found, please try again.");
          }
        })
        .catch((error) => {
          // Log the error to the console
          console.error('Error during API request:', error);
        });
    },
    // Navigate from the fixed location to the searched destination
    navigateToDestination() {
      if (!this.destination) {
        alert('No destination set. Please search for a location first.');
        return;
      }

      const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${this.userLocation[0]},${this.userLocation[1]};${this.destination[0]},${this.destination[1]}?geometries=geojson&access_token=pk.eyJ1IjoiZG9uZ2hhb3FpbiIsImEiOiJjbTIxb3I2MmcwOWs5Mm1weHdzODJleWF3In0.J-NoM8jZreEeTpXxiobzYQ`;

      // Request directions from Mapbox Directions API
      axios.get(directionsUrl)
        .then((response) => {
          const route = response.data.routes[0].geometry;

          // Add the route as a source to the map
          if (this.map.getSource('route')) {
            this.map.removeLayer('route');
            this.map.removeSource('route');
          }

          this.map.addSource('route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: route
            }
          });

          this.map.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#3887be',
              'line-width': 5,
              'line-opacity': 0.75
            }
          });

          // Fit the map to the route
          const bounds = new mapboxgl.LngLatBounds();
          route.coordinates.forEach((coord) => {
            bounds.extend(coord);
          });
          this.map.fitBounds(bounds, { padding: 20 });
        })
        .catch((error) => {
          console.error('Error fetching directions:', error);
        });
    }
  }
};
</script>

<style scoped>
/* Styling for the search bar */
input {
  margin-bottom: 10px;
  padding: 10px;
  width: 300px;
  font-size: 16px;
}

button {
  padding: 10px;
  font-size: 16px;
}
</style>
