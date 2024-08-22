import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { Request, Response, NextFunction } from "express";
import path from "path";
import cloudinaryConfig from "../libs/cloudinary";

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
}).fields([
  { name: "image", maxCount: 4 },
  { name: "fotoMurid", maxCount: 1 },
  { name: "fotoKK", maxCount: 1 },
  { name: "fotoAkta", maxCount: 1 },
  { name: "fotoIjazah", maxCount: 1 },
  { name: "fotoGaleri", maxCount: 1 },
  { name: "fotoEktra", maxCount: 1 },
  { name: "fotoBerita", maxCount: 1 },
  { name: "fotoBukti", maxCount: 1 },
]);

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

          if (files.fotoMurid) {
            const fotoMuridFile = files.fotoMurid[0];
            if (fotoMuridFile && fotoMuridFile.path) {
              const fotoMuridUrl = await cloudinary.uploader.upload(
                fotoMuridFile.path,
                {
                  folder: "PPDB",
                }
              );
              req.body.fotoMurid = fotoMuridUrl.secure_url;
            }
          }
          if (files.fotoMurid) {
            const fotoMuridFile = files.fotoMurid[0];
            if (fotoMuridFile && fotoMuridFile.path) {
              const fotoMuridUrl = await cloudinary.uploader.upload(
                fotoMuridFile.path,
                {
                  folder: "PPDB",
                }
              );
              req.body.fotoMurid = fotoMuridUrl.secure_url;
            }
          }

          if (files.fotoKK) {
            const fotoKKFile = files.fotoKK[0];
            if (fotoKKFile && fotoKKFile.path) {
              const fotoKKUrl = await cloudinary.uploader.upload(
                fotoKKFile.path,
                {
                  folder: "PPDB",
                }
              );
              req.body.fotoKK = fotoKKUrl.secure_url;
            }
          }

          if (files.fotoAkta) {
            const fotoAktaFile = files.fotoAkta[0];
            if (fotoAktaFile && fotoAktaFile.path) {
              const fotoAktaUrl = await cloudinary.uploader.upload(
                fotoAktaFile.path,
                {
                  folder: "PPDB",
                }
              );
              req.body.fotoAkta = fotoAktaUrl.secure_url;
            }
          }

          if (files.fotoIjazah) {
            const fotoIjazahFile = files.fotoIjazah[0];
            if (fotoIjazahFile && fotoIjazahFile.path) {
              const fotoIjazahUrl = await cloudinary.uploader.upload(
                fotoIjazahFile.path,
                {
                  folder: "PPDB",
                }
              );
              req.body.fotoIjazah = fotoIjazahUrl.secure_url;
            }
          }

          if (files.fotoEktra) {
            const fotoEktraFile = files.fotoEktra[0];
            if (fotoEktraFile && fotoEktraFile.path) {
              const fotoEktraUrl = await cloudinary.uploader.upload(
                fotoEktraFile.path,
                {
                  folder: "PPDB",
                }
              );
              req.body.fotoEktra = fotoEktraUrl.secure_url;
            }
          }

          if (files.fotoGaleri) {
            const fotoGaleriFile = files.fotoGaleri[0];
            if (fotoGaleriFile && fotoGaleriFile.path) {
              const fotoGaleriUrl = await cloudinary.uploader.upload(
                fotoGaleriFile.path,
                {
                  folder: "PPDB",
                }
              );
              req.body.fotoGaleri = fotoGaleriUrl.secure_url;
            }
          }

          if (files.fotoBerita) {
            const fotoBeritaFile = files.fotoBerita[0];
            if (fotoBeritaFile && fotoBeritaFile.path) {
              const fotoBeritaUrl = await cloudinary.uploader.upload(
                fotoBeritaFile.path,
                {
                  folder: "PPDB",
                }
              );
              req.body.fotoBerita = fotoBeritaUrl.secure_url;
            }
          }
          if(files.fotoBukti){
            const fotoBuktiFile = files.fotoBukti[0];
            if (fotoBuktiFile && fotoBuktiFile.path) {
              const fotoBuktiUrl = await cloudinary.uploader.upload(
                fotoBuktiFile.path,
                {
                  folder: "PPDB",
                }
              );
              req.body.fotoBukti = fotoBuktiUrl.secure_url;
            }
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
