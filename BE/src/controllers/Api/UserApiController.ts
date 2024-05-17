import { Response, Request, NextFunction } from "express";
import User from "../../models/User";
import { MongoError } from "mongodb";
class UserApiController {
    // public static async index (req : Request, res : Response, next : NextFunction){
    //     return res.json();
    // }   

    public static async getAllUsers (req : Request, res : Response, next : NextFunction){
        try {
            const allUsers = await User.find({});
            if (allUsers.length == 0){
                return res.json({mes : "No one avaiable"});
            }
            return res.status(200).json(allUsers);
        } catch (error) {
            return res.status(404).json({mes: error});
        }
    }

    public static async getUser(req : Request, res : Response, next : NextFunction){
        try {
            const user = await User.find({_id: req.params.id});
            if (!user) {
                return res.json({mes : "User not found"})
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(404).json({mes: error});
        }
    }

    public static async storeUser(req : Request, res : Response, next : NextFunction){
        try {
            const user = await User.create(req.body);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(404).json({mes: error});
        }
    }

    public static async editUser(req : Request, res : Response, next : NextFunction){
        try {
            const user = await User.create(req.body);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(404).json({mes: error});
        }
    }
}

export default UserApiController;