import { Request, Response } from "express";
import db from "../db/index";

const midtransClient = require("midtrans-client");
var MailerLite = require("mailerlite");

let apiClient = new midtransClient.Snap({
  isProduction: false,
  serverKey: "SB-Mid-server-D7115u3C9p40iVIEBH0Xx7-P",
  clientKey: "SB-Mid-client-xwt7dO0ikf2dVydv",
});

export const webhook = async (req: Request, res: Response) => {
  try {
    console.log(" mashook webhook");

    const notificationJson = req.body;
    console.log("notificationJson", notificationJson);

    const statusResponse = await apiClient.transaction.notification(
      notificationJson
    );

    const {
      order_id: orderId,
      transaction_status: transactionStatus,
      fraud_status: fraudStatus,
    } = statusResponse;

    console.log(
      `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`
    );
    const orderIdOnly = orderId.split("ORDER")[1];
    switch (transactionStatus) {
      case "capture":
        if (fraudStatus === "accept") {
          const updateOrder = await db.order.update({
            where: {
              id: orderId,
            },
            data: {
              paymentMethod:
                notificationJson.payment_type + notificationJson.issuer,
            },
          });
          console.log(`Order ${orderId} captured and accepted.`);
          res.sendStatus(200);
        }
        break;

      case "settlement":
        console.log(`Order ${orderId} settled.`);
        const updateUser = await db.ppdb.update({
          where: {
            id: orderIdOnly,
          },
          data: {
            isPaid: true,
          },
        });
        res.sendStatus(200);

        const params = {
          email: "adindo48@gmail.com",
          fields: {
            name: "",
            last_name: updateUser.nama,
            company: "SMPI Karya Mukti",
            country: "Indonesia",
            city: "Bogor",
            phone: "02511234567",
            state: "Citereup",
            z_i_p: "019231",
          },
          groups: ["129928469175862640"],
          status: "active",
          subscribed_at: "2021-08-31 14:22:08",
          ip_address: null,
          opted_in_at: null,
          optin_ip: null,
          unsubscribed_at: null,
        };

        MailerLite.subscribers
          .createOrUpdate(params)
          .then((response: { data: any }) => {
            console.log(response.data);
          })
          .catch((error: { response: { data: any } }) => {
            if (error.response) console.log(error.response.data);
          });

        break;

      case "cancel":
      case "deny":
      case "expire":
        console.log(
          `Order ${orderId} failed with status ${transactionStatus}.`
        );
        res.sendStatus(200);
        break;

      case "pending":
        console.log(`Order ${orderId} is pending.`);
        res.sendStatus(200);
        break;

      default:
        console.log(`Unknown transaction status ${transactionStatus}.`);
        res.sendStatus(400);
        break;
    }
  } catch (error) {
    console.error("Error processing notification:", error);
    res.sendStatus(500);
  }
};
