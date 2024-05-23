import UserService from "../../Services/User.service"
import { SuccessResponse } from "../../cores/succes.response"


class UserController {

    // google 
    public static async createUserFromGoogle(req: Request, res: Response): Promise<any> {
        return new SuccessResponse({
            message: "Create user from google successfully!",
            metadata: await UserService.createUserFromGoogle(req.body)
        }).send(res)
    }

    // common 
    static async getAll(req: Request | any, res: Response): Promise<any> {
        return new SuccessResponse({
            message: "Get all users successfully !",
            metadata: await UserService.getAll(req.query)
        })
            .send(res)
    }

    static async getByUserId(req: Request | any, res: Response): Promise<any> {
        //console.log(req.params.id);

        return new SuccessResponse({
            message: "get user from id successFully !",
            metadata: await UserService.getUserById({ id: req.params.id })
        })
            .send(res)
    }

    static async getAllUserByTypeAuth(req: Request | any, res: Response): Promise<any> {
        return new SuccessResponse({
            message: "get user by type auth successFully !",
            metadata: await UserService.getAllUsersByTypeAuth({ type: req.params.type }) as any
        })
            .send(res)
    }

    static async updateUser(req: Request | any, res: Response) {
        return new SuccessResponse({
            message: "Upadate user successFully !",
            metadata: await UserService.updateUser(req.params.id, req.body) as any
        })
            .send(res)
    }

    


}

export default UserController