import { Auth } from "./auth";
import { Storage } from "./storage";
import { IGlue } from "./interfaces/IGlue";

export class Glue implements IGlue {
  auth: Auth;
  storage: Storage;

  constructor({ AUTH_BASE_URL }: {AUTH_BASE_URL:string}) {
    this.auth = new Auth(AUTH_BASE_URL);
    this.storage = new Storage();
  }
}
