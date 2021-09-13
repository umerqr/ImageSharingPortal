const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require(`./routes`);
const app = express();
require('dotenv').config();
const healthyFunction = (req, res) =>
  res.json({
    healthy: true,
  });
let corsOptions = {
  origin: 'http://localhost:8081',
};

// app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(
    `Access-Control-Allow-Methods`,
    `POST,DELETE,PUT,PATCH,GET,OPTIONS`
  );
  res.header(
    `Access-Control-Allow-Headers`,
    `Origin,X-Requested-With,Content-Type,Accept,Authorization,Access-Control-Allow-1, token,Access-Control-Allow-Origin,x-amz-acl,account`
  );
  return next();
});
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.get(`/`, healthyFunction);
app.use(`/api`, routes);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
