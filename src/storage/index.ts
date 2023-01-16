import axios from "axios";
var FormData = require("form-data");
import { IStorage } from "./interfaces/IStorage";

export class Storage implements IStorage {
  storageBaseUrl: string = "";

  constructor() {
    this.storageBaseUrl = process.env.STORAGE_BASE_URL || "http://localhost:9090/backend/storage";
  }

  //@upload
  async upload(file: any) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await axios.post(
        `${this.storageBaseUrl}/upload`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        },
      );
      return data;
    } catch (e) {
      //
    }
  }

  //@upload
  async getPresignedUrl(path: string): Promise<string> {
    try {
      const { data } = await axios.get(
        `${this.storageBaseUrl}/${path}`,
        {}
      );
      return data;
    } catch (e) {
      //
    }
  }
}
