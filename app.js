const express = require('express');
const { serve, setup } = require('swagger-ui-express');
const { readFileSync } = require('fs');
const { parse } = require('yaml');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');
const path = require('path');

const app = express();
const PORT = 8080;

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'src'));

// Add middleware to serve static files
app.use(connectLivereload());

app.use('/api-docs', serve, (req, res, next) => {
  const file = readFileSync(
    './tsp-output/@typespec/openapi3/openapi.yaml',
    'utf8'
  );
  const swaggerDocument = parse(file);
  setup(swaggerDocument)(req, res, next);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Swagger Server is Running at http://localhost:${PORT}/api-docs`);
});

// Reload the server
liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});
