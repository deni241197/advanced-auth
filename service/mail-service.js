import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

class MailService {
   constructor() {
      this.transporter = nodemailer.createTransport({
         host: process.env.SMTP_HOST,
         port: process.env.SMTP_PORT,
         secure: false,
         auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
         },
      });
   }

   async sendActivation(to, link) {
      await this.transporter.sendMail(
         {
            from: process.env.SMTP_USER,
            to,
            subject: `Активация аккаунта на ${process.env.API_URL}`,
            text: "",
            html: `
               <div>
                  <h1>Для активации перейдите по ссылке</h1>
                  <a href='${link}'>${link}</a>
               </div>            
            `,
         },
         (err, info) => {
            console.log(err);
            console.log(info);
         }
      );
   }
}

export default new MailService();