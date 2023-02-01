import sgMail from "@sendgrid/mail";
import { config } from "../src/config";
import { SendEmailOptions } from "../src/types";
import logger from "./logger";

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
sgMail.setApiKey(config.SENDGRID_API_KEY);

export async function sendEmail(message: SendEmailOptions) {
  try {
    await sgMail.send({
      ...message,
      from: message.from || config.SENDGRID_FROM_EMAIL,
    });
  } catch (error) {
    logger.fatal(error);
    throw new Error("Failed to send email");
  }
}
