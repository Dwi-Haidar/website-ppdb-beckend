import db from "../db/index";
import { IPpdb } from "../types/app";

export const create = async (
  payload: IPpdb,
  files: { [fieldname: string]: Express.Multer.File[] }
) => {

  try {
    
    const ppdb = await db.ppdb.create({
      data: {
        ...payload,
        // image: {
        //   create: files.image.map((img) => ({
        //     url: img.filename,
        //   })),
        // },
      },
    });

    // create transaction
    const midtransClient = require("midtrans-client");
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: "SB-Mid-server-D7115u3C9p40iVIEBH0Xx7-P",
    });

    let parameter = {
      transaction_details: {
        order_id: "ORDER" + ppdb.id,
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

    return {
      ppdb,
      order,
      transactionToken,
    };
  } catch (error) {
    console.error("Error creating PPDB:", error);
    throw error;
  }
};

export const getPpdb = async (id: number) => {
  try {
    const ppdb = await db.ppdb.findUnique({
      where: { id },
      include: { image: true },
    });
    return ppdb;
  } catch (error) {
    console.error("Error fetching PPDB:", error);
    throw error;
  }
};

export const getsPpdb = async () => {
  try {
    const ppdb = await db.ppdb.findMany({
      include: { image: true },
    });
    return ppdb;
  } catch (error) {
    console.error("Error fetching all PPDB:", error);
    throw error;
  }
};

export const deletePpdb = async (id: number) => {
  try {
    const ppdb = await db.ppdb.delete({
      where: { id },
    });
    return ppdb;
  } catch (error) {
    console.error("Error deleting PPDB:", error);
    throw error;
  }
};
