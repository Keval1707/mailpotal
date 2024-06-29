const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
require('dotenv').config();


// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/view'));

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Import the router
const router = require('./routes/router');

// Use the router
app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
