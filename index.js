require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const generateData = require("./src/utils/");

//swagger
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

// file
const sequelize = require("./src/config/database.js");
const routerHandle = require("./src/routes/index.js");

const options = {
  definition: {
    openapi: "3.0.0",
    infor: {
      title: "Apis library",
      version: "1.0.0",
      description: "Api for minimarket",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsDoc(options);

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
// handle router
routerHandle(app);

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

generateData();
// require("./src/config/persist");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
