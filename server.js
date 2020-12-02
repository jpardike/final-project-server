const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const port = process.env.PORT || 4000;

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000'
};

// MIDDLEWARE
app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/v1/users', routes.users);


app.listen(port, () => console.log(`Server is running on port ${port}`));