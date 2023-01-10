const express = require ("express");
const app = express();
require('dotenv').config()
const sequelize = require ("./config/database.js");
const  {Entity} = require ("./config/persist.js");
console.log(Entity)

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

sequelize
  .sync()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
