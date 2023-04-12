import { container } from "tsyringe";
import { LocalStorageProvaider } from "./implementations/LocalStorageProvaider";
import { S3StoreageProvaider } from "./implementations/S3StoreageProvaider";
import { IStorageProvaider } from "./IStoreageProvaider";

const diskStorage = {
  local: LocalStorageProvaider,
  s3: S3StoreageProvaider
}

container.registerSingleton<IStorageProvaider>(
  "StorageProvaider", diskStorage[process.env.disk]
);