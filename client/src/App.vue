<template>
  <v-app>
    <v-app-bar app :dark="isDarkTheme" class="pr-5">
      <v-tooltip text="Etat du serveur de données" location="bottom">
        <template v-slot:activator="{ props }">
          <v-icon v-bind="props" :color="isServerOnline ? 'green' : 'red'" class="ml-5 mr-2">{{ isServerOnline ? 'mdi-server' : 'mdi-server-off' }}</v-icon>
        </template>
      </v-tooltip>
      <v-toolbar-title>Mapbox Vue App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon :color="!isDarkTheme ? 'yellow-darken-3' : 'grey'" class="mr-2">mdi-white-balance-sunny</v-icon>
      <v-switch
        v-model="isDarkTheme"
        hide-details
        inset
        color="white"
        @change="toggleTheme"
      ></v-switch>
      <v-icon :color="isDarkTheme ? 'white' : 'grey'" class="ml-2">mdi-weather-night</v-icon>
    </v-app-bar>
    <v-main>
      <v-container fluid class="fill-height pa-0">
        <MapboxMap />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useTheme } from 'vuetify';
import MapboxMap from './components/MapboxMap.vue';

const theme = useTheme();
const isDarkTheme = ref(false); // Initial value will be set by config
const isServerOnline = ref(false);
let serverCheckInterval;

const toggleTheme = () => {
  theme.global.name.value = isDarkTheme.value ? 'dark' : 'light';
};

const checkServerStatus = async () => {
  try {
    const response = await fetch('http://localhost:3000/status');
    isServerOnline.value = response.ok;
  } catch (error) {
    isServerOnline.value = false;
    console.error('Server check failed:', error);
  }
};

const loadConfiguration = async () => {
  try {
    const response = await fetch('/config/configuration.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const config = await response.json();

    const darkModeConfig = config.find(item => item['Nom de la variable'] === 'darkMode');
    if (darkModeConfig) {
      isDarkTheme.value = (darkModeConfig['valeur surchargée'] !== null) ? darkModeConfig['valeur surchargée'] : darkModeConfig['valeur par défaut'];
      theme.global.name.value = isDarkTheme.value ? 'dark' : 'light';
    }

    const serverPollingConfig = config.find(item => item['Nom de la variable'] === 'serverPollingInterval');
    let pollingInterval = 5000; // Default if not found
    if (serverPollingConfig) {
      pollingInterval = (serverPollingConfig['valeur surchargée'] !== null) ? serverPollingConfig['valeur surchargée'] : serverPollingConfig['valeur par défaut'];
    }

    // Clear existing interval if any before setting a new one
    if (serverCheckInterval) {
      clearInterval(serverCheckInterval);
    }
    checkServerStatus(); // Initial check
    serverCheckInterval = setInterval(checkServerStatus, pollingInterval);

  } catch (error) {
    console.error('Failed to load configuration:', error);
    // Fallback to default values if config loading fails
    isDarkTheme.value = false; // Default to light mode
    theme.global.name.value = 'light';
    checkServerStatus();
    serverCheckInterval = setInterval(checkServerStatus, 5000);
  }
};

onMounted(() => {
  loadConfiguration();
});

onUnmounted(() => {
  if (serverCheckInterval) {
    clearInterval(serverCheckInterval);
  }
});
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  overflow: hidden;
}
</style>
