import dotenv from 'dotenv'
dotenv.config()

 import express from 'express'
const app = express();

import sequelize from "./config/database.js";
sequelize.sync()
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
