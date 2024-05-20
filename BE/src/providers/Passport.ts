import { Application } from "express"
import passport from "passport"
import session from "express-session";
import Locals from "./Locals";
import GoogleAuth20 from 'passport-google-oauth20'

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
            async (accessToken, refreshToken, profile, done) => {
                console.log(profile);

                // tạo người dùng , check người dùng , nhả token oqr đây 
                return done(null, profile)
            }
        ))

        return _express
    }
}

export default new Passport