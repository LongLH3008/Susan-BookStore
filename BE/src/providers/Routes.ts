import { Application } from "express";
import Locals from "./Locals";
import apiRouter from '../routers/Api';
import webRouter from '../routers/Web';
import Log from "./Log";
import morgan from "morgan";

class Routes {
    public static mountWeb(_express: Application): Application{  
        Log.showLogs("Routes => Mounting Web Routes...");
        _express.use(morgan('short'));
        return _express.use('/', webRouter);
    }
    public static mountApi(_express: Application) : Application{
        Log.showLogs("Routes => Mounting API Routes...");
        _express.use(morgan('short'));
        return _express.use(`/${Locals.config().apiPrefix}`, apiRouter);
    }
}

export default Routes;
