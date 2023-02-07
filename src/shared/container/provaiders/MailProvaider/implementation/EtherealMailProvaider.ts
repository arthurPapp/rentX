import { injectable } from "tsyringe";
import nodemailer, { Transporter } from "nodemailer"
import handlebars from "handlebars";
import fs from "fs";
import { IMailProvaider } from "../IMailProvaider";

@injectable()
class EtherealMailProvaider implements IMailProvaider {
  private client: Transporter
  constructor() {
    //criando o tranporte do client para gerer uma conta de teste no ethereal
    nodemailer.createTestAccount().then(account => {
      const transpoter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        },
      });

      this.client = transpoter;
    }).catch((err) => console.log(err));
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileCosnt = fs.readFileSync(path).toString("utf-8");
    const templateParse = handlebars.compile(templateFileCosnt);

    const templateHTM = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: "Rentx <noreplay@rentex.com.br",
      subject,
      html: templateHTM,
    });
    console.log('Message sent: %s', message.messageId);
    console.log('Peview URL %s', nodemailer.getTestMessageUrl(message));
  }

}

export { EtherealMailProvaider }