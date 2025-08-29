<template>
  <div id="map-container"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import mapboxgl from 'mapbox-gl';

// IMPORTANT: Replace with your Mapbox Access Token
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN; 

let map;

onMounted(() => {
  map = new mapboxgl.Map({
    container: 'map-container',
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9 // starting zoom
  });
});

onUnmounted(() => {
  if (map) {
    map.remove();
  }
});
</script>

<style scoped>
#map-container {
  width: 100%;
  height: 100%;
}
</style>
