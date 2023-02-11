import fs from "fs";
import { resolve } from "path";
import upload from "../../../../../config/upload";

import { IStorageProvaider } from "../IStoreageProvaider";

class LocalStorageProvaider implements IStorageProvaider {

  async save(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file)
    );

    return file;
  }
  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file);
    try {
      //verifica se o arquivo existe
      await fs.promises.stat(filename);
    } catch (err) {
      console.log(`[file.ts] deleteFiles error:  ${err}`);
      return;
    }
    //remove se o arquivo existir
    await fs.promises.unlink(filename);
  }
}

export { LocalStorageProvaider }