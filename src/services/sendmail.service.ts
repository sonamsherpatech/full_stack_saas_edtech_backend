import nodemailer from "nodemailer";
import { envConfig } from "../config/config";

interface IMailInformation {
  to: string;
  subject: string;
  html: string;
}

const sendMail = async (mailInformation: IMailInformation) => {
  //mail pataine logic goes here
  //step -1 create nodemailer transport

  //transporter/transport ---> configuration setup lai transport
  //service: which platfom bata xai mail pataune
  //auth --> tapai ko business ko gmail rw password k ho tyo auth ho (sender ko gmail/password)
  const transporter = nodemailer.createTransport({
    service: "gmail", //yahoo, hotmail
    auth: {
      user: envConfig.nodemailerEmail,
      pass: envConfig.nodemailerPassword, //not a real password
    },
  });

  const mailFormatObject = {
    from: "Google <google@gmail.com>",
    to: mailInformation.to,
    subject: mailInformation.subject,
    html: mailInformation.html,
  };

  try {
    await transporter.sendMail(mailFormatObject);
  } catch (error) {
    console.log(error);
  }
};

export default sendMail;
