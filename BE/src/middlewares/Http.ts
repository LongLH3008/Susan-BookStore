import express, { Application } from "express";
import cors from 'cors';
import flash from 'connect-flash';
import helmet from "helmet";
import compression from 'compression';
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';

import Locals from "../providers/Locals";

class Http {
    public static mount(_express: Application): Application {

        _express.use(cors());
        _express.use(flash());

        _express.use(helmet());

        _express.use(compression());

        _express.use(session({
            resave: false,
            secret: Locals.config().secretKey,
            saveUninitialized: false,
            // em đặt cái này thành false để cho google nó có thể chả phiên đăng nhập vào đây 
            // vì môi trường local của mình nó là http nên em bật secure = true nó éo cho phép động vào
            // cookie nên em để tạm false , bao h deploy nó thành https thì bật lại là true nhé 
            // em đông auth =_=
            cookie: { secure: false },
            // store : new (MongoDBStore as any)({
            //     uri: process.env.MONGOOSE_URL,
            //     collection: 'sessions', 
            // })
            
        }));


        return _express;
    }
}

export default Http;