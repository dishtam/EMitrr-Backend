import express from "express";
import config from "./utils/environments.js";
import mongoDB from "./db.js";
import createUser from "./Routes/CreateUser.js";
import home from "./Routes/Home.js";
import getQuestions from "./Routes/GetQuestions.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const port = config.PORT;

mongoDB();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.send("Hello World!");
});

app.use("/api",createUser);
app.use("/api",home);
app.use("/api",getQuestions);

app.listen(port,()=>{
    console.log(`App is running at http://localhost:${port}`);
});
