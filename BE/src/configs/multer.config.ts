import appRootPath from "app-root-path";
import multer, { StorageEngine } from "multer";

const uploadDisk: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, appRootPath.path + "/public/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.fieldname}-${file.originalname}`);
  },
});

const upload = multer({ storage: uploadDisk });

export { upload };