import { Request, Response } from "express";
import db from "../db/index";
import nodemailer from "nodemailer";

const midtransClient = require("midtrans-client");

const API_URL = "https://api.mailerlite.com/api/v2";
const API_KEY = process.env.MAILERLITE_API_KEY;
const GROUP_ID = "98537036938479128";

const apiClient = new midtransClient.Snap({
  isProduction: false,
  serverKey: "SB-Mid-server-D7115u3C9p40iVIEBH0Xx7-P",
  clientKey: "SB-Mid-client-xwt7dO0ikf2dVydv",
});

export const webhook = async (req: Request, res: Response) => {
  try {
    console.log("Received webhook notification");

    const notificationJson = req.body;
    console.log("Notification JSON:", notificationJson);

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

    const parts = orderId.split("ORDER")[1];
    const extractedIdString = parts.substring(6);
    const extractedId = parseInt(extractedIdString, 10);
    console.log("Extracted ID:", extractedId);

    switch (transactionStatus) {
      case "capture":
        if (fraudStatus === "accept") {
          await db.order.update({
            where: { id: extractedId },
            data: {
              paymentMethod:
                notificationJson.payment_type + notificationJson.issuer,
            },
          });
          console.log(`Order ${orderId} captured and accepted.`);
        }
        break;

      case "settlement":
        const updateUser = await db.ppdb.update({
          where: { id: extractedId },
          data: { isPaid: true },
        });

        // Add subscriber to MailerLite group
        const transporter = nodemailer.createTransport({
          service: "gmail", // Gmail service
          host: "smtp.gmail.com",
          port: 587, // Port for TLS
          secure: false, // Use TLS
          auth: {
            user: process.env.GMAIL_USER, // Use environment variable
            pass: process.env.GMAIL_PASS, // Use environment variable
          },
        });

        console.log("Transporter created:", transporter);
        const now = new Date().getTime();
        const date = new Date(now); // Define email options
        const mailOptions = {
          from: `"SMPI Karya Mukti" <${process.env.GMAIL_USER}>`, // Sender address
          to: updateUser.email,
          subject: "Pembayaran Success",
          text: `Selamat telah melakukan membayar PPDB SMPI Karya Mukti. Terima kasih.`,
        };

        // Send email
        transporter.sendMail(
          mailOptions,
          (error: any, info: { response: any; messageId: any }) => {
            if (error) {
              console.error("Error sending email:", error);
              return res.status(500).send("Failed to send email");
            }
            console.log("Email sent:", info.response);
            console.log("Message sent: %s", info.messageId);
            res.status(200).send("Email sent successfully");
          }
        );
        break;

      case "cancel":
      case "deny":
      case "expire":
        console.log(
          `Order ${orderId} failed with status ${transactionStatus}.`
        );
        break;

      case "pending":
        console.log(`Order ${orderId} is pending.`);
        break;

      default:
        console.log(`Unknown transaction status ${transactionStatus}.`);
        res.sendStatus(400);
        return;
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error processing notification:", error);
    res.sendStatus(500);
  }
};
