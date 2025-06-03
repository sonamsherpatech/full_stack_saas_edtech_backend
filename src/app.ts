import express from "express"; //ecma js way to import the package
const app = express();
import authRoute from "./routes/globals/auth/auth.route";

app.use(express.json());
app.use("/api/", authRoute);

export default app;
