require("dotenv").config();
const express = require("express");
const cors = require("cors");
var cron = require("node-cron");

const bodyParser = require("body-parser");
// const generateData  = require('./src/utils/index')
//swagger
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

require("./src/config/persist");
const routerHandle = require("./src/routes/index.js");
const { socketInit } = require("./src/socket");

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

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// handle router
routerHandle(app);
app.use(express.static("public"));

const port = process.env.PORT || 3000;

socketInit(app, port).listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
