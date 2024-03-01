import axios from 'axios';
import bodyParser from 'body-parser';
import { URLSearchParams } from 'url';
import cors from 'cors';

const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const apiLink = 'https://www.zohoapis.com/creator/custom/vanavihari/';

exports.handler = async (event, context) => {
  const { path, httpMethod, body } = event;

  if (path === '/registration' && httpMethod === 'POST') {
    const publickey = '8xZYn5bvUfjjBVVpvK7qAsKsR';
    const apiUri = apiLink + 'Account_Registration?publickey=' + publickey;
    const updates = JSON.parse(body).params.updates;
    const queryParams = updates.map(update => `${update.param}=${encodeURIComponent(update.value)}`);
    const queryString = queryParams.join('&');
    const finalUrl = `${apiUri}&${queryString}`;

    try {
      const response = await axios.get(finalUrl);
      return {
        statusCode: 200,
        body: JSON.stringify(response.data),
      };
    } catch (error) {
      return {
        statusCode: error.response.status || 500,
        body: JSON.stringify(error.response.data || { error: 'Internal Server Error' }),
      };
    }
  }

  if (path === '/email-verification' && httpMethod === 'POST') {
    const publickey = 'fArmqypVSku88tfArkejTR5wq';
    const apiUri = apiLink + 'Email_Verification?publickey=' + publickey;
    const verificationToken = JSON.parse(body).verificationToken;
    const finalUrl = apiUri + '&' + 'token=' + verificationToken;

    try {
      const response = await axios.get(finalUrl);
      return {
        statusCode: 200,
        body: JSON.stringify(response.data),
      };
    } catch (error) {
      return {
        statusCode: error.response.status || 500,
        body: JSON.stringify(error.response.data || { error: 'Internal Server Error' }),
      };
    }
  }

  if (path === '/login' && httpMethod === 'POST') {
    const publickey = '3gJbpvFUR8pR3knE8u0tMtt8p';
    const apiUri = apiLink + 'Login_Validation?publickey=' + publickey;
    const updates = JSON.parse(body).params.updates;
    const queryParams = updates.map(update => `${update.param}=${encodeURIComponent(update.value)}`);
    const queryString = queryParams.join('&');
    const finalUrl = `${apiUri}&${queryString}`;

    try {
      const response = await axios.get(finalUrl);
      return {
        statusCode: 200,
        body: JSON.stringify(response.data),
      };
    } catch (error) {
      return {
        statusCode: error.response.status || 500,
        body: JSON.stringify(error.response.data || { error: 'Internal Server Error' }),
      };
    }
  }

  return {
    statusCode: 404,
    body: JSON.stringify({ error: 'Not Found' }),
  };
};
