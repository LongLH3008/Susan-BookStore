import { Application } from "express";

import CORS from "./CORS";
import Http from "./Http";
import SecurityImproving from "./SecurityImproving";
import Statics from "./Statics";
import Views from "./Views";

import Locals from "../providers/Locals";

class Kernel {
    public static init(_express: Application): Application {

        if (Locals.config().isCorsEnabled){
            _express = CORS.mount(_express);
        }

        _express = Http.mount(_express);

        _express = SecurityImproving.mount(_express);

        // _express = SecurityImproving.mount(_express, callback);

        _express = Views.mount(_express);

        _express = Statics.mount(_express);

        return _express;
    }       
}

export default Kernel;