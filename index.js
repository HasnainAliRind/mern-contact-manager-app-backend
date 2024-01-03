import bodyParser from "body-parser";
import express from "express";
import initWebRoutes from "./routes/web.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";

let app = express();

dotenv.config()

app.use(cors({
    origin: [process.env.CORS_ORIGIN],
    methods: ["GET","POST","DELETE","PUT"],
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));


initWebRoutes(app);


app.listen(8081, ()=>{
    console.log("Backend is running at http://localhost:8081");
});