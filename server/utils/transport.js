import nodemailer from "nodemailer";
import "dotenv/config"

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL_SENDER,
    pass: process.env.ADMIN_EMAIL_PASSWORD,
  },
});
