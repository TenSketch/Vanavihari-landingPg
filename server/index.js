const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Proxy route to forward requests
app.post('/triggerUrl', async (req, res) => {
    console.log('test trigger');
});
app.get('/sign-up', (req, res, next) => {
  console.log('test sign up');
  // const paramValue = req.query.paramName; // Change 'paramName' to the name of your query parameter
  // if (!paramValue) {
  //     // If the query parameter is not present, redirect to a specific URL
  //     return res.redirect('/redirect-url');
  // }
  next(); // If the query parameter is present, continue to the next middleware
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
