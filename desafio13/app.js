import express from 'express'; 
import router from './src/routes/index.js'; 
import { connectMongoDB } from './src/config/mongoDb.config.js';
import session from "express-session"; 
import MongoStore from 'connect-mongo';
import passport from 'passport';
import initializePassport from './src/config/passport.config.js';
import cookieParser from 'cookie-parser';
import envs from "./src/config/env.config.js"
import cors from "cors";
import { errorHandler } from './src/errors/errorHandle.js';
import { logger } from './src/utils/logger.js';

connectMongoDB();

const app = express();

const urlDbMongo = envs.MONGO_URL; 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser(envs.CODE_SECRET)); 
app.use(session({ 
    store: MongoStore.create({ 
        mongoUrl: urlDbMongo, 
        ttl: 15 
    }),
    secret: envs.CODE_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); 
initializePassport(); 
app.use(cors()); 

app.use("/api", router);

// app.get("/operacionsencilla", (req, res) => {
//     let sum = 0;
//     for(let i = 0; i <100000; i++) {
//         sum += i
//     }
//     res.send({ sum });
// })

// app.get("/operacioncompleja", (req, res) => {
//     let sum = 0;
//     for(let i = 0; i < 5e8; i++) {
//         sum += i
//     }
//     res.send({ sum });
// })

app.use(errorHandler); 


const port = envs.PORT; 
const ready = logger.info("Escuchando el servidor en el puerto " + port); 

app.listen(port, ready);