import nodemailer, { Transporter } from "nodemailer";
import { SES } from "aws-sdk";
import { IMailProvaider } from "../IMailProvaider";
import handlebars from "handlebars";

import fs from "fs";
import { injectable } from "tsyringe";

@injectable()
class SesMailProvaider implements IMailProvaider {
  private client: Transporter
  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_REGION,
      }),
    });
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

    await this.client.sendMail({
      to,
      from: "Rentx <treinamentoclodpapp@gmail.com>",
      subject,
      html: templateHTM,
    });
  }

}

export { SesMailProvaider }