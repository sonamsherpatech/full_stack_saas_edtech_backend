import app from "./src/app";
import { envConfig } from "./src/config/config";

function startSever() {
  const port = envConfig.portNumber;
  app.listen(port, function () {
    console.log(`Server has started at port ${port}`);
  });
}

startSever();
