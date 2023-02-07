import { container } from "tsyringe";
import { IDateProvaider } from "./DateProvaider/IDateProvaider";
import { DayjsDateProvaider } from "./DateProvaider/implementation/DayjsDateProvaider";
import { IMailProvaider } from "./MailProvaider/IMailProvaider";
import { EtherealMailProvaider } from "./MailProvaider/implementation/EtherealMailProvaider";



container.registerSingleton<IDateProvaider>(
  "DayjsDateProvaider", DayjsDateProvaider
);

container.registerInstance<IMailProvaider>(
  "EtherealMailProvaider", new EtherealMailProvaider()
);