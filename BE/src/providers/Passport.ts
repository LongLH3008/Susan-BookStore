import { Application } from "express"
import passport from "passport"
import session from "express-session";
import Locals from "./Locals";
import GoogleAuth20 from 'passport-google-oauth20'
import User from "../models/User.model";
import { UserTypeAuth } from "../interfaces/models/IUser";

const GoogleStrategy = GoogleAuth20.Strategy

class Passport {
    public init(_express: Application): Application {
        console.log('Passport :: mounting...');

        // thiet lap phien
        _express = _express.use(passport.initialize());
        _express = _express.use(passport.session());

        // người dùng đăng nhập 
        passport.serializeUser((user: any, done) => {
            done(null, user)
        })

        // trả thông tin sau khi người dùng đăng nhập thành công 
        passport.deserializeUser((user: any, done) => {
            done(null, user)
        })


        // thiết lâp đối tượng đăng nhập 
        passport.use(new GoogleStrategy({
            clientID: Locals.config().google_client_id,
            clientSecret: Locals.config().google_client_secret,
            callbackURL: Locals.config().google_url_callback
        },
            async (accessToken, refreshToken, profile: any, done) => {
                console.log(profile);
                //check người dùng tồn tại hay chưa 
                const checkUser = await User.findOne({
                    user_email: profile.emails[0].value,
                    user_auth_type: UserTypeAuth.google
                })
                if (!checkUser) {
                    const newUser = await User.create({
                        user_email: profile.emails[0].value,
                        user_name: profile.displayName,
                        user_auth_type: UserTypeAuth.google,
                        user_avatar: profile.photos[0].value
                    })
                    return done(null, newUser)
                }

                return done(null, checkUser)
            }
        ))

        return _express
    }
}

export default new Passport