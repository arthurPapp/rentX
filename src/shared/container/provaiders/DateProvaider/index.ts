import { container } from "tsyringe";
import { IDateProvaider } from "./IDateProvaider";
import { DayjsDateProvaider } from "./implementation/DayjsDateProvaider";

container.registerSingleton<IDateProvaider>(
  "DayjsDateProvaider", DayjsDateProvaider
);