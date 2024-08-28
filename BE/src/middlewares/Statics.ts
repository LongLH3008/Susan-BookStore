import appRootPath from "app-root-path";
import express, { Application } from "express";
import path from "path";

class Statics {

    public static mount(_express: Application): Application {
        _express.use(express.json());
        _express.use(express.urlencoded({ extended: false }));
        _express.use(express.static(path.join(appRootPath.path, 'public')));

        return _express;
    }
}

export default Statics;