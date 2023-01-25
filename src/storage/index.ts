import axios from "axios";
import FormData from "form-data";
import { Glue } from "../";
import { IStorage } from "./interfaces/IStorage";

export class Storage implements IStorage {
         storageBaseUrl: string = "";

         constructor(STORAGE_BASE_URL: string, glue: Glue) {
           this.storageBaseUrl = STORAGE_BASE_URL;
         }

         //@upload
         async upload(file: File, is_public: boolean = false) {
           try {
             const formData = new FormData();
             formData.append("file", file);
             formData.append("is_public", is_public.toString());
             const { data } = await axios.post(
               `${this.storageBaseUrl}/upload/`,
               formData,
               {
                 headers: {
                   "content-type": "multipart/form-data",
                 },
               }
             );
             return data;
           } catch (e) {
             //
             return e;
           }
         }

         //@upload
         async getPublicUrl(path: string): Promise<string> {
           try {
             const { data } = await axios.get(
               `${this.storageBaseUrl}/file/public/${path}`,
               {}
             );
             return data;
           } catch (e) {
             //
           }
           return "";
         }
       }
