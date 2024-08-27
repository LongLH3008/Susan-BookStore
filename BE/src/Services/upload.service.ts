import cloudinary from "../configs/cloudinary.config";

interface UploadImageFromUrlParams {
    url: string;
}

interface UploadImageFromLocalParams {
    file: Express.Multer.File;
    folderName?: string;
}

interface UploadImageResponse {
    secure_url: string;
    shopId?: number;
    thumb_url?: string;
}

interface UploadImageParams {
    files: Express.Multer.File[];
    folderName?: string;
}

interface UploadImagesResponse {
    secure_urls: string[];
    shopId?: number;
    thumb_urls?: string[];
}


export const uploadImageFromUrl = async ({
    url,
}: UploadImageFromUrlParams): Promise<string | undefined> => {
    try {
        const folderName = "/pictures/shop";
        const fileName = "test";

        const res = await cloudinary.uploader.upload(url, {
            folder: folderName,
            public_id: fileName,
        });
        const { secure_url } = res;
        return secure_url;
    } catch (error) {
        console.log(error);
    }
};

export const uploadImageFromLocal = async ({
    file,
    folderName = "products",
}: UploadImageFromLocalParams): Promise<UploadImageResponse | undefined> => {
    try {
        const res = await cloudinary.uploader.upload(file.path, {
            folder: folderName,
            public_id: file.filename,
        });

        return {
            secure_url: res.secure_url,
            shopId: 8409,
            thumb_url: await cloudinary.url(res.public_id, {
                width: 150,
                height: 150,
                format: "jpg",
            }),
        };
    } catch (error) {
        console.log(error);
    }
};

export const uploadImages = async ({
    files,
    folderName = "products",
  }: UploadImageParams): Promise<UploadImagesResponse | undefined> => {
    try {
      const secureUrls: string[] = [];
      const thumbUrls: string[] = [];
  
      for (const file of files) {
        const res = await cloudinary.uploader.upload(file.path, {
          folder: folderName,
          public_id: file.filename,
        });
  
        secureUrls.push(res.secure_url);
  
        const thumbUrl = await cloudinary.url(res.public_id, {
          width: 150,
          height: 150,
          format: "jpg",
        });
        thumbUrls.push(thumbUrl);
      }
  
      return {
        secure_urls: secureUrls,
        shopId: 8409,
        thumb_urls: thumbUrls,
      };
    } catch (error) {
      console.log(error);
    }
  };