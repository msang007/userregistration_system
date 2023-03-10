import express from "express";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import bodyParser from "body-parser";
import hbs from "hbs";
import cookieParser from "cookie-parser";
import mysql from "mysql";
import path from "path";
import router from "./routes/pages.js";
import routers from "./routes/auth.js";
import { fileURLToPath } from 'url';

const app =express();


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(cors());

const ENV = dotenv.config().parsed;




const db = mysql.createConnection({
host:ENV.DB_HOST,
user:ENV.DB_USER,
password:ENV.DB_PASSWORD,
database:ENV.DB_NAME
});

db.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Connected to mysql Database!");
    }
})





const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//console.log(__dirname);
const location = path.join(__dirname, "./public");
app.use(express.static(location));
app.set("view engine", "hbs");
const partialsPath = path.join(__dirname, "./views/partials");
hbs.registerPartials(partialsPath);






app.use("/", router);
app.use("/auth",routers);






const port = process.env.Port || 5000;
app.listen(port,()=> console.log(`listening on port ${port}`));