import fs from "fs";
import swaggerUi from "swagger-ui-express";
import express from 'express';
import http from 'http';

const { PORT } = process.env;

const openApiDocumentation = JSON.parse(
  fs.readFileSync("./apis.json").toString()
);

console.log("Test", openApiDocumentation);
const app = express();
app.get("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

const server = http.createServer(app);

async function main() {
  let port = PORT;
  if (!port) {
    console.log("Environment variable PORT is not set. " + "Example PORT=4000");
    port = '3000';
  }
  server.listen(parseInt(port, 10), () => {
    console.log(`Dhiway gateway is running at http://localhost:${port}`);
  });
}

main().catch((e) => console.log(e));
