import nodemailer from "nodemailer";
import { GOOGLE_PASSWORD, GOOGLE_USER } from "../config/config.js";

export const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: GOOGLE_USER,
    pass: GOOGLE_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

export const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `AI Student Assistant <${GOOGLE_USER}>`,
      to,
      subject,
      text,
      html,
    });
    
    console.log("Email sent: " + info.messageId);
    console.log("Preview URL: " + nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email: " + error);
  }
};
