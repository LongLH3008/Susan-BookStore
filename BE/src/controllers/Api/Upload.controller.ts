import { Request, Response } from "express";
import { SuccessResponse } from "../../cores/succes.response";
import UploadService from "../../Services/upload.service";


class UploadController {
    static async upload(req: Request, res: Response): Promise<any> {
        return new SuccessResponse({
            message: "Upload successfully",
            metadata: await UploadService.uploadImagesToLocal(req)
        }).send(res)
    }
    static async delete(req: Request, res: Response): Promise<any> {
        return new SuccessResponse({
            message: "delete  successfully",
            metadata: await UploadService.deleteFromLocalByUrl(req.body)
        }).send(res)
    }

}
export default UploadController