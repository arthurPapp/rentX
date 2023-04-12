import { S3 } from "aws-sdk";
import fs from "fs";
import mime from "mime";
import { resolve } from "path";
import upload from "../../../../../config/upload";
import { IStorageProvaider } from "../IStoreageProvaider";

class S3StoreageProvaider implements IStorageProvaider {

  private client: S3;
  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,

    });
  }

  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file);

    const fileContents = await fs.promises.readFile(originalName);

    const ContentType = mime.getType(originalName);
    await this.client.putObject({
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      Key: file,
      ACL: "public-read",
      Body: fileContents,
      ContentType
    }).promise();

    await fs.promises.unlink(originalName);

    return file;
  }
  async delete(file: string, folder: string): Promise<void> {
    this.client.deleteObject({
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      Key: file,
    }).promise();
  }

}

export { S3StoreageProvaider }