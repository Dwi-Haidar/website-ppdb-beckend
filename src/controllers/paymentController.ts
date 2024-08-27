import { Response, Request } from "express";
import * as paymentService from "../services/paymentService";

export const createPayment = async (req: Request, res: Response) => {
  try {
    const ppdb = await paymentService.create(req, res);
    res.json({
      status: 200,
      message: "Create Payment and Order",
      data: ppdb,
    });
  } catch (error) {
    const err = error as unknown as Error;
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
