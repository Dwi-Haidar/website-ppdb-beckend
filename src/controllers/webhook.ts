import { Request, Response } from "express";

const midtransClient = require("midtrans-client");

// Initialize Midtrans Snap instance
let apiClient = new midtransClient.Snap({
  isProduction: false,
  serverKey: "SB-Mid-server-D7115u3C9p40iVIEBH0Xx7-P",
  clientKey: "SB-Mid-client-xwt7dO0ikf2dVydv",
});

// Webhook endpoint for Midtrans notifications
export const webhook = async (req: Request, res: Response) => {
  try {
    // Extract the notification payload
    const notificationJson = req.body;

    // Verify the notification
    const statusResponse = await apiClient.transaction.notification(
      notificationJson
    );

    // Extract details from the response
    const {
      order_id: orderId,
      transaction_status: transactionStatus,
      fraud_status: fraudStatus,
    } = statusResponse;

    console.log(
      `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`
    );

    // Handle transaction status
    switch (transactionStatus) {
      case "capture":
        if (fraudStatus === "accept") {
          // TODO: Update your database to 'success'
          console.log(`Order ${orderId} captured and accepted.`);
          res.sendStatus(200); // Respond with 200 OK
        }
        break;

      case "settlement":
        // TODO: Update your database to 'success'
        console.log(`Order ${orderId} settled.`);
        res.sendStatus(200); // Respond with 200 OK
        break;

      case "cancel":
      case "deny":
      case "expire":
        // TODO: Update your database to 'failure'
        console.log(
          `Order ${orderId} failed with status ${transactionStatus}.`
        );
        res.sendStatus(200); // Respond with 200 OK
        break;

      case "pending":
        // TODO: Update your database to 'pending'
        console.log(`Order ${orderId} is pending.`);
        res.sendStatus(200); // Respond with 200 OK
        break;

      default:
        console.log(`Unknown transaction status ${transactionStatus}.`);
        res.sendStatus(400); // Bad Request
        break;
    }
  } catch (error) {
    console.error("Error processing notification:", error);
    res.sendStatus(500); // Internal Server Error
  }
};
