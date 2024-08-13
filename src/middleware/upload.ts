import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { Request, Response, NextFunction } from "express";
import path from "path";
import cloudinaryConfig from "../libs/cloudinary";
// import cloudinaryConfig from "../lib/cloudinary";

cloudinaryConfig();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 4,
  },
}).fields([{ name: "image", maxCount: 4 }]);

const multerMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, async (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(401).json({
              status: false,
              message: "File too large",
            });
          }
          return res.status(500).json({
            status: false,
            message: err.message,
          });
        } else {
          return res.status(500).json({
            status: false,
            message: err.message,
          });
        }
      }

      if (req.files) {
        try {
          const files = req.files as {
            [fieldName: string]: Express.Multer.File[];
          };

          if (files.image) {
            const imagesUrls = await Promise.all(
              files.image.map(async (img) => {
                try {
                  if (!img.path) throw new Error("File path is missing");
                  const imageUrl = await cloudinary.uploader.upload(img.path, {
                    folder: "PPDB",
                  });
                  return { image: imageUrl.secure_url };
                } catch (error) {
                  console.error("Error uploading image:", error);
                  throw error;
                }
              })
            );
            req.body.image = imagesUrls;
          }
        } catch (error) {
          console.error("Error handling files:", error);
          return res.status(500).json({
            status: false,
            message: "Failed to process files",
          });
        }
      }

      next();
    });
  };
};

export default multerMiddleware;
