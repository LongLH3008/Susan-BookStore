import path from "path";
import appRootPath from "app-root-path";
import { BadRequestError } from "../cores/error.response";
import fs from "fs"

interface UploadedFile extends Express.Multer.File { }

class UploadService {


    static uploadImagesToLocal = (req: any) => {
        try {
            const files = req.files as UploadedFile[];
            const fileLinks = files.map((file: UploadedFile) => {
                return `${req.protocol}://${req.get('host')}/${file.filename}`;
            });
            console.log(path.join(appRootPath.path, 'public'))
            return {
                fileLinks: fileLinks
            }
        } catch (error: any) {
            throw new BadRequestError("co loi xay ra khi up date")
        }
    }

    static deleteFromLocalByUrl = ({ urls }: { urls: string[] }) => {


        if (!urls || !Array.isArray(urls)) {
            throw new BadRequestError('Danh sách URL không hợp lệ.');
        }

        const deletedFiles: string[] = [];
        const failedFiles: string[] = [];

        urls.forEach(url => {
            const filename = path.basename(url);
            console.log(filename)
            const filepath = path.join(appRootPath.path, 'public', filename);
            console.log(filepath)

            try {
                fs.unlinkSync(filepath);
                deletedFiles.push(url);
            } catch (error) {
                failedFiles.push(url);
            }
        });

        return {
            deletedFiles,
            failedFiles
        }
    }
}


export default UploadService