const express = require('express');
const cookieParser = require('cookie-parser');
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
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'https://accounts.zoho.com'); // Replace with your frontend URL
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies) to be sent
//   next();
// });

app.post('/authenticate', async (req, res) => {
  const codeGenerationUrl = 'https://accounts.zoho.com/oauth/v2/auth';
  const { code } = req.body;
  const clientId = '1000.C3YEEYUWBVTK62AVHRVQT3EZR1Y48X';
  const clientSecret = '74b59cd0d3a4a113aa62b0143fd05a06d9df6dce1b';
  const redirectUri = 'http://localhost:4200';
  const grantType = 'authorization_code';
  const tokenUrl = 'https://accounts.zoho.com/oauth/v2/token';
 
  // const codeParams = new URLSearchParams({
  //   response_type: 'code',
  //   client_id: clientId,
  //   client_secret: clientSecret,
  //   redirect_uri: redirectUri,
  //   scope: 'ZohoCreator.form.CREATE',
  //   access_type: 'offline'
  // });
  // const codeUrl = `${codeGenerationUrl}?${codeParams.toString()}`;
  // const codeResponse = await axios.get(codeUrl, { responseType: 'text', withCredentials: true });
  // const responseData = codeResponse.data;
  // res.send(responseData); 

  
  const params = new URLSearchParams({
    grant_type: grantType,
    client_id: clientId,
    client_secret: clientSecret,
    code: code
  });
  const url = `${tokenUrl}?${params.toString()}`;
  const response = await axios.post(url+'&redirect_uri=https://tensketch.vanavihari.com/register.html', {
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
