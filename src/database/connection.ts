import { Sequelize } from "sequelize";
import { envConfig } from "../config/config";

const sequelize = new Sequelize({
  database: envConfig.database,
  username: envConfig.userName,
  password: envConfig.password,
  host: envConfig.localHost,
  dialect: "mysql",
  port: Number(envConfig.dbPort),
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Authenticate, connected");
  })
  .catch((error) => {
    console.log(error);
  });

export default sequelize;
