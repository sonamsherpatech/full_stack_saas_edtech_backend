import express from "express"; //ecma js way to import the package
const app = express();
import authRoute from "./routes/globals/auth/auth.route";
import instituteRoute from "./routes/institute/institute.route";
import courseRoute from "./routes/institute/course/course.route";
import categoryRoute from "./routes/institute/category/category.route";
import teacherRoute from "./routes/institute/teacher/teacher.route";

app.use(express.json());

app.use("/api", authRoute);
app.use("/api/institute", instituteRoute);
app.use("/api/institute/course", courseRoute);
app.use("/api/institute/category", categoryRoute);
app.use("/api/institute/teacher", teacherRoute);
export default app;
