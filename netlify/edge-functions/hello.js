// hello.js

import axios from 'axios';

export async function handler(event, context) {
  try {
    // Make an API call
    const response = await axios.get('https://api.example.com/data');

    // Extract data from the API response
    const responseData = response.data;

    // Return a successful response
    return {
      statusCode: 200,
      body: JSON.stringify({ data: responseData }),
    };
  } catch (error) {
    // Return an error response if the API call fails
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
}
