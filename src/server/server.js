import config from "./../config/config.js";
import express from "express";
import mongoose from "mongoose";
import routes from "./routes/routes.js";
const app = express();

mongoose.connect(config.mongourl);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);

mongoose.connection.on("connected", () => {
    console.log("connected to mongo server.");
})
mongoose.connection.on("error", (err) => {
    console.log("error:",err);
})

app.listen(config.port, () => {
    console.log("listening..");
})