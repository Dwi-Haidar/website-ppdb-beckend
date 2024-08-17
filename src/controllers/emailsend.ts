import axios from "axios";
import { Request, Response } from "express";

const API_URL = "https://api.mailerlite.com/api/v2";
const API_KEY = process.env.MAILERLITE_API_KEY;
const GROUP_ID = "129928469175862640";
export const sendEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    try {
      const response = await axios.post(
        `${API_URL}/subscribers`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
            "X-MailerLite-ApiKey": API_KEY,
          },
        }
      );

      const subscriberId = response.data.id;
      await axios.post(
        `${API_URL}/groups/${GROUP_ID}/subscribers`,
        { subscribers: [subscriberId], email },
        {
          headers: {
            "Content-Type": "application/json",
            "X-MailerLite-ApiKey": API_KEY,
          },
        }
      );

      console.log(`Subscriber ${email} added to group: ${GROUP_ID}`);
    } catch (mailError) {
      console.error("Error adding subscriber to MailerLite:", mailError);
    }

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json(error);
  }
};
