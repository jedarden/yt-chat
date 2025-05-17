// server.js - Starts the backend API server

const app = require('./index');
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Backend API listening on port ${PORT}`);
});