require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// file
const sequelize = require("./src/config/database.js");
const routerHandle = require("./src/routes/index.js");

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

// handle router
routerHandle(app);

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// require("./src/config/persist");

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
