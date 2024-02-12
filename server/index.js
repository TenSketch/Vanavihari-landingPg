const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.post('/authenticate', async (req, res) => {
  const { code } = req.body;
  console.log(req.body);
  const clientId = '1000.GW70XWAC3O04CJ67TUTEAYEOVP7RIM';
  const clientSecret = '532929ef83d5a2b57ceb5f5ddb3f94e0ebb30b7ebc';
  const redirectUri = 'https://tensketch.vanavihari.com/register.html';
  const grantType = 'authorization_code';
  const tokenUrl = 'https://accounts.zoho.com/oauth/v2/token';


  try {
    const params = new URLSearchParams({
      grant_type: grantType,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      code: code
    });
    const url = `${tokenUrl}?${params.toString()}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

  
  // const response = await axios.post(tokenUrl, {
  //   grant_type: grantType,
  //   client_id: clientId,
  //   client_secret: clientSecret,
  //   redirect_uri: redirectUri,
  //   code: code
  // });
  // const res = res.send(response.data);
    // console.log(response);
  // try {
  // } catch (error) {
  //   // res.status(500).send(error.response.data);
  //   console.log('error');
  //   return 0;
  // }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
