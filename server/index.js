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


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
