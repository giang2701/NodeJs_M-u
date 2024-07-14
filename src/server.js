import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/index.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT;
const URI_DB = process.env.URI_DB;
mongoose.connect(URI_DB);
app.use(express.json()); //mitd where:co de ket noi vs csdl (create pro)
app.use("/api", router);

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
