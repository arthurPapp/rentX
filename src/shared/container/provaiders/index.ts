import { container } from "tsyringe";
import { IDateProvaider } from "./DateProvaider/IDateProvaider";
import { DayjsDateProvaider } from "./DateProvaider/implementation/DayjsDateProvaider";
import { IMailProvaider } from "./MailProvaider/IMailProvaider";
import { EtherealMailProvaider } from "./MailProvaider/implementation/EtherealMailProvaider";
import { LocalStorageProvaider } from "./StorageProvaider/implementations/LocalStorageProvaider";
import { S3StoreageProvaider } from "./StorageProvaider/implementations/S3StoreageProvaider";
import { IStorageProvaider } from "./StorageProvaider/IStoreageProvaider";



container.registerSingleton<IDateProvaider>(
  "DayjsDateProvaider", DayjsDateProvaider
);

container.registerInstance<IMailProvaider>(
  "EtherealMailProvaider", new EtherealMailProvaider()
);


const diskStorage = {
  local: LocalStorageProvaider,
  s3: S3StoreageProvaider
}

container.registerSingleton<IStorageProvaider>(
  "StorageProvaider", diskStorage[process.env.disk]
);