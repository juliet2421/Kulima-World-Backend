import express from "express"
import passport from "passport"
import cookieParser from "cookie-parser"
import mongoose from "mongoose";
import session from "express-session";
import routerIndex from "../router/routerIndex.mjs";
import bodyParser from "body-parser";
import cors from "cors"

const app = express();
//database connection
mongoose.connect("mongodb://localhost/Kulima")
.then(()=>{console.log(`..Connected to database..`)})
.catch((error)=>{console.log(`error${error}`)});
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
    secret:"mySecret",
    saveUninitialized: false,
    resave:false,
    cookie:{
        maxAge: 60000 * 2,
        httpOnly: true,
        secure: false 
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(routerIndex);

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`..Connected on port: ${PORT}..`);
})

//main route
app.get("/",(request,response) => {
    request.session.visited = true
    console.log(request.sessionID);
    response.send({"msg":"Hi from Express sever"})
}) 
