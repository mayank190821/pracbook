import config from "./../config/config.js";
import express from "express";
import mongoose from "mongoose";
import routes from "./routes/routes.js";
const app = express();

mongoose.connect(config.mongourl);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/",routes);
mongoose.connection.on("connected", () => {
    console.log("connected to mongo server.");
})
mongoose.connection.on("error", (err) => {
    console.log("error:",err);
})

app.post("/", (req, res) => {
    console.log(req.body);
    res.send("done");
})
app.get("/", (req, res) => {
    res.send("return message");
})

app.listen(3000, () => {
    console.log("listening..");
})