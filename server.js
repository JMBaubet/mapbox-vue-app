const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all routes

// Serve static files from the Vue.js build directory
app.use(express.static(path.join(__dirname, 'client/dist')));

app.get('/status', (req, res) => {
  res.status(200).send('OK');
});

// All other requests go to the Vue.js app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.listen(port, () => {
});
