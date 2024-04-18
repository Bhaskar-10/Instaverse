import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import storyRoutes from "./routes/stories.js";

const app = express(); // Init app to leverage all express methods
dotenv.config();

app.use(bodyParser.json({limit: "32mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "32mb", extended: true}));
app.use(cors());
app.use("/stories", storyRoutes); // Starting path for all routes inside stories.js

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5001;

const connectDB = async () => {

    try {
        await mongoose.connect(MONGO_URI);  // Promise return requires await for async function
        app.listen(PORT, () => console.log(`Server running on post: ${PORT}`));
    } catch (err) {
        console.log("Connection to MongoDB failed", err.message);
    }
}

connectDB();

mongoose.connection.on("open", () => console.log("Connection to database was sucessfully established"));
mongoose.connection.on("error", (err) => console.log(err));