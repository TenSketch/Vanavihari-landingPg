const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/authenticate', async (req, res) => {
  const { code } = req.body;
  const clientId = '1000.GW70XWAC3O04CJ67TUTEAYEOVP7RIM';
  const clientSecret = '532929ef83d5a2b57ceb5f5ddb3f94e0ebb30b7ebc';
  const redirectUri = 'https://tensketch.vanavihari.com/register.html';
  const grantType = 'authorization_code';
  const tokenUrl = 'https://accounts.zoho.com/oauth/v2/token';

  try {
    const response = await axios.post(tokenUrl, {
      grant_type: grantType,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      code: code
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.response.data);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
