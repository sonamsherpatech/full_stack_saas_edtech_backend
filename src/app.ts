import express from "express"; //ecma js way to import the package
const app = express();
import authRoute from "./routes/globals/auth/auth.route";
import instituteRoute from "./routes/institute/institute.route";
import courseRoute from "./routes/institute/course/course.route";

app.use(express.json());

app.use("/api", authRoute);
app.use("/api/institute", instituteRoute);
app.use("/api/institute/course", courseRoute);

export default app;
