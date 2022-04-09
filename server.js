import express from "express";
import path from "path";
import authCheck from "./controllers/authController.js";
import mongoose from "mongoose";
import routes from "./routes/routes.js";

const app = express();

mongoose.connect(process.env.mongourl);
const __dirname = path.resolve();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", authCheck, routes);
app.use("/auth", routes);

mongoose.connection.on("connected", () => {
  console.log("connected to mongo server.");
});
mongoose.connection.on("error", (err) => {
  console.log("error:", err);
});

app.use(express.static(path.resolve(__dirname, "./build")));

app.listen(process.env.PORT || 3000, () => {
  console.log("server started...");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./build", "index.html"));
  });
});
