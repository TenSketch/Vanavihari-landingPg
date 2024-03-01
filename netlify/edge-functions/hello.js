// apiCallFunction.js

const axios = require('axios');

module.exports = async (event, context) => {
  try {
    // Make an API call
    const response = await axios.get('https://www.zohoapis.com/creator/custom/vanavihari/Login_Validation?publickey=3gJbpvFUR8pR3knE8u0tMtt8p&user_name=venkat408prabhu@gmail.com&password=123456');

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
};
