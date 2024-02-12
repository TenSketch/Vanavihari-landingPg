const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { URLSearchParams } = require('url');
const cors = require('cors');
const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
// app.use(cors());

//Code Generation

//https://accounts.zoho.com/oauth/v2/auth?response_type=code&client_id=1000.GW70XWAC3O04CJ67TUTEAYEOVP7RIM&scope=ZohoCreator.report.READ&redirect_uri=https://vanavihari.com/&access_type=offline

//https://accounts.zoho.com/oauth/v2/token?grant_type=authorization_code&client_id=1000.GW70XWAC3O04CJ67TUTEAYEOVP7RIM&client_secret=532929ef83d5a2b57ceb5f5ddb3f94e0ebb30b7ebc&redirect_uri=https://tensketch.vanavihari.com/register.html&code=1000.14e6ee7a0f9066ee9228073ec3849daa.b1070b64ad60c664ed39011d42178e4d

app.use(bodyParser.json());

// app.get('/authenticate', async (req, res) => {
//   const codeUrl = 'https://accounts.zoho.com/oauth/v2/auth';
//   const response_type = 'code';
//   const clientId = '1000.GW70XWAC3O04CJ67TUTEAYEOVP7RIM';
//   const clientSecret = '532929ef83d5a2b57ceb5f5ddb3f94e0ebb30b7ebc';
//   const scope = 'ZohoCreator.report.READ';
//   const redirectUri = 'https://tensketch.vanavihari.com/register.html';
//   const access_type = 'offline';

//   try {
//     // Construct the URL with query parameters
//     const params = new URLSearchParams({
//       response_type: response_type,
//       client_id: clientId,
//       client_secret: clientSecret,
//       scope: scope,
//       redirect_uri: redirectUri,
//       access_type: access_type
//     });
//     const url = `${codeUrl}?${params.toString()}`;

//     // Make a GET request to the Zoho API
//     const response = await fetch(url);

//     // Extract the value of the 'code' parameter from the URL in the response headers
//     const code = new URL(response.url).searchParams.get('code');

//     // Send the extracted code value back to the client as JSON
//     console.log({code});

//     res.json({ code });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });






//Access Token Generation.

// app.use(bodyParser.json());
app.post('/authenticate', async (req, res) => {
  const { code } = req.body;
  // console.log(req.body);
  const clientId = '1000.GW70XWAC3O04CJ67TUTEAYEOVP7RIM';
  const clientSecret = '532929ef83d5a2b57ceb5f5ddb3f94e0ebb30b7ebc';
  const redirectUri = 'https://tensketch.vanavihari.com/register.html';
  const grantType = 'authorization_code';
  const tokenUrl = 'https://accounts.zoho.com/oauth/v2/token';

  const response = await axios.get("https://accounts.zoho.com/oauth/v2/auth?response_type=code&client_id=1000.GW70XWAC3O04CJ67TUTEAYEOVP7RIM&client_secret=532929ef83d5a2b57ceb5f5ddb3f94e0ebb30b7ebc&scope=ZohoCreator.form.CREATE&redirect_uri=https://tensketch.vanavihari.com/register.html&access_type=offline", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  const data = response.data;
  res.send(data);
  // try {
  //   const params = new URLSearchParams({
  //     grant_type: grantType,
  //     client_id: clientId,
  //     client_secret: clientSecret,
  //     redirect_uri: redirectUri,
  //     code: code
  //   });
  //   const url = `${tokenUrl}?${params.toString()}`;

  //   const response = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //   });

  //   const data = await response.json();
  //   res.json(data);
  // } catch (error) {
  //   console.error("Error:", error);
  //   res.status(500).json({ error: "Internal Server Error" });
  // }

});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
