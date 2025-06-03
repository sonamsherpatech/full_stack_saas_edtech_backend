import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/config";

const sequelize = new Sequelize({
  database: envConfig.database,
  username: envConfig.userName,
  password: envConfig.password,
  host: envConfig.localHost,
  dialect: "mysql",
  port: Number(envConfig.dbPort),
  models: [__dirname + "/models"], //current location + models
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Authenticate, connected");
  })
  .catch((error) => {
    console.log(error);
  });

//migrate garnu paryo
sequelize.sync({ alter: false }).then(() => {
  console.log("migrated successfully new changes");
});

export default sequelize;
