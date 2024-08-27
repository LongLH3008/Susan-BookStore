import multer, { StorageEngine } from "multer";

const uploadDisk: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${file.originalname}`);
  },
});

const upload = multer({ storage: uploadDisk });

export { upload };