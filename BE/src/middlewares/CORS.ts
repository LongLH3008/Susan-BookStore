import cors from 'cors';
import { Application } from 'express';
import Locals from '../providers/Locals';

export class CORS {
    public static mount( _express:Application ) : Application{
        _express.use(cors({
            origin: Locals.config().appUrl,
            // origin: process.env.APP_URL
        }));
        return _express;
    }
}

export default CORS;