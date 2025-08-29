<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Mapbox Vue App</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container fluid class="fill-height pa-0">
        <MapboxMap />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import MapboxMap from './components/MapboxMap.vue';
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  overflow: hidden;
}
</style>
