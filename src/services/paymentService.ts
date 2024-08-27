import { Request, Response } from "express";
import db from "../db/index";

export const create = async (req: Request, res: Response) => {
  try {
    const loginSession = res.locals.user;
    console.log("loginSession", loginSession);

    const ppdb = await db.ppdb.findFirst({
      where: {
        email: loginSession.email,
      },
    });
    console.log("ppdb", ppdb);

    const midtransClient = require("midtrans-client");
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: "SB-Mid-server-D7115u3C9p40iVIEBH0Xx7-P",
    });
    const random = Math.floor(Math.random() * 100000);
    const randomStr = random.toString().padStart(6, "0");

    let parameter = {
      transaction_details: {
        order_id: "ORDER" + randomStr + ppdb.id,
        gross_amount: 10000,
      },
      credit_card: {
        secure: true,
      },
      callbacks: {
        finish: "http://localhost:5173/",
      },
      customer_details: {
        name: ppdb.nama,
        email: ppdb.email,
        phone: ppdb.noTelp,
      },
    };

    const transaction = await snap.createTransaction(parameter);
    const transactionToken = transaction.token;

    const order = await db.order.create({
      data: {
        orderId: parameter.transaction_details.order_id,
        price: parameter.transaction_details.gross_amount,
        paymentMethod: "",
        ppdbId: ppdb.id,
      },
    });
    console.log("order", order);
    console.log("transactionToken", transactionToken);

    return {
      order,
      transactionToken,
    };
  } catch (error) {
    throw new Error(error);
  }
};
