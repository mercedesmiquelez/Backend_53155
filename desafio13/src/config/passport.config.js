import passport from "passport";
import google from "passport-google-oauth20";
import jwt from "passport-jwt";
import local from "passport-local";
import envs from "../config/env.config.js";
import usersRepository from "../persistences/mongo/repositories/users.repository.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import cartsRepository from "../persistences/mongo/repositories/carts.repository.js";
import { logger } from "../utils/logger.js";

const LocalStrategy = local.Strategy 
const GoogleStrategy = google.Strategy; 
const JWTStrategy = jwt.Strategy; 
const ExtractJWT = jwt.ExtractJwt; 

const cookieExtractor = (req) => { 
    let token = null;  

    if (req && req.cookies) { 
        token = req.cookies.token;
    }

    return token;
};

const initializePassport =() => {
    passport.use(  
        "register",
        new LocalStrategy ({passReqToCallback: true, usernameField: "email" },
            async (req, username, password, done) => {
                try {
                    
                    const { firstName, lastName, email, age, role } = req.body; 

                    const user = await usersRepository.getUserByEmail(username); 
                    if (user) return done(null, false, {message: "El usuario ya existe"}) 


                    const cart = await cartsRepository.createCart(); 

                    const newUser = { 
                        firstName,
                        lastName,
                        email,
                        age,
                        password: createHash(password), 
                        role,
                        cart: cart._id 
                    }

                    const createUser= await usersRepository.createUser(newUser);
                    return done(null, createUser) 

                } catch (error) {
                    return done(error);
                    
                }
            } 
        ));

    passport.use( 
        "login",
        new LocalStrategy({ usernameField: "email"},
        async (username, password, done) =>{
            try {
                
                const user = await usersRepository.getUserByEmail(username); 
                if(!user || !isValidPassword(user, password)) return done(null, false, {message: "Email o password no válidos"});
                return done(null, user);

            } catch (error) {
                done(error)
                
            }
        })
    );

    passport.use( 
        "google",
        new GoogleStrategy(
            {
                clientID: "",
                clientSecret: "",
                callbackURL: "",        
            },
            async (accessToken, refreshToken, profile, cb) => {
                try {
                    
                    const { name, emails } = profile; 
                    const user = { 
                        firstName: name.givenName,
                        lastName: name.familyName,
                        email: emails[0].value
                    };

                    const existUser = await usersRepository.getUserByEmail(emails[0].value)
                    if (existUser) return cb(null,existUser);

                    const newUser = await usersRepository.createUser(user); 
                    cb(null, newUser) 


                } catch (error) {
                    return cb(error);
                }
            }
        )
    );

    passport.use( 
        "jwt",
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), 
                secretOrKey: envs.CODE_SECRET,
            },
            async (jwt_payload, done) => {
                try {
                    return done(null, jwt_payload);
                } catch (error) {
                    return done(error);
                }
            }
    ));

    passport.serializeUser((user, done) => { 
        done(null, user._id);
    });

    passport.deserializeUser( async (id, done) => { 
        const user =await usersRepository.getUserById(id);
        done(null, user);
    })
}

export default initializePassport;