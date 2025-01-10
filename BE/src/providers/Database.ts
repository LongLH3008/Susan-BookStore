import mongoose from "mongoose";
import Locals from "./Locals";
import { MongoError } from "mongodb";
class Database {
    public static init(): any {
        if (true) {
            mongoose.set("debug", true);
            mongoose.set("debug", { color: true });
        }
        mongoose.connect(Locals.config().mongoURL)
            .then(() => {
                console.log("Connect successful");
            }).catch((error: MongoError) => {
                console.log(error);
                throw error;

            });
    }
}

export default Database;