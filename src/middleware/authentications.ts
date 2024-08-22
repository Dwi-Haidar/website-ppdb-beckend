import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AuthMiddlewareData } from "../types/app";
// import { AuthMiddlewareData } from "../types/app";

const authentication = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;
    const token = authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY!);

    if (!decoded) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
      });
    }

    res.locals.user = decoded as AuthMiddlewareData;

    return next();
  } catch (error) {
    const err = error as unknown as Error;
    console.log(err);

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export default authentication;
