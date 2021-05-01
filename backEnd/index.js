const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require(`./routes`);
const app = express();
const healthyFunction = (req, res) =>
  res.json({
    healthy: true,
  });
let corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

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
