const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const routes = require("./routes");

const port = process.env.PORT || 4000;

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1/users', routes.users);


app.listen(port, () => console.log(`Sercer is running on port ${port}`));