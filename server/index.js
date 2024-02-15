const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { URLSearchParams } = require('url');
const cors = require('cors');
const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post('/authenticate', async (req, res) => {
  const { code } = req.body;
  const clientId = '1000.GW70XWAC3O04CJ67TUTEAYEOVP7RIM';
  const clientSecret = '532929ef83d5a2b57ceb5f5ddb3f94e0ebb30b7ebc';
  const redirectUri = 'https://tensketch.vanavihari.com/register.html';
  const grantType = 'authorization_code';
  const tokenUrl = 'https://accounts.zoho.com/oauth/v2/token';

  // const response = await axios.get("https://accounts.zoho.com/oauth/v2/auth?response_type=code&client_id=1000.GW70XWAC3O04CJ67TUTEAYEOVP7RIM&client_secret=532929ef83d5a2b57ceb5f5ddb3f94e0ebb30b7ebc&scope=ZohoCreator.form.CREATE&redirect_uri=https://tensketch.vanavihari.com/register.html&access_type=offline", {
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded",
  //   },
  // });
  // const data = response.data;
  // res.send(data);


  const params = new URLSearchParams({
    grant_type: grantType,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    code: code
  });
  const url = `${tokenUrl}?${params.toString()}`;

  const response = await axios.post(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  res.send(response.data);
  // try {
  //   const params = new URLSearchParams({
  //     grant_type: grantType,
  //     client_id: clientId,
  //     client_secret: clientSecret,
  //     redirect_uri: redirectUri,
  //     code: code
  //   });
  //   const url = `${tokenUrl}?${params.toString()}`;

  //   const response = await axios.post(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //   });

  //   const data = await response;
  //   res.send(data);
  // } catch (error) {
  //   console.error("Error:", error);
  //   res.status(500).json({ error: "Internal Server Error" });
  // }

});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
