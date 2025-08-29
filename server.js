const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the Vue.js build directory
app.use(express.static(path.join(__dirname, 'client/dist')));

// All other requests go to the Vue.js app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
