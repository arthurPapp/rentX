import { container } from "tsyringe";
import { IMailProvaider } from "./IMailProvaider";
import { EtherealMailProvaider } from "./implementation/EtherealMailProvaider";
import { SesMailProvaider } from "./implementation/SesMailProvaider";


const mailProvaider = {
  ethereal: container.resolve(EtherealMailProvaider),
  ses: container.resolve(SesMailProvaider),
}

container.registerInstance<IMailProvaider>(
  "MailProvaider", mailProvaider[process.env.MAIL_PORVAIDER]
);

