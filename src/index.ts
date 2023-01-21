import { Auth } from "./auth";
import { Storage } from "./storage";
import { IGlue } from "./interfaces/IGlue";
import EventTarget from "@ungap/event-target";

 export class Glue extends EventTarget implements IGlue {
   auth: Auth;
   storage: Storage;

   constructor({ AUTH_BASE_URL }: { AUTH_BASE_URL: string }) {
     super();
     this.auth = new Auth(AUTH_BASE_URL, this);
     this.storage = new Storage();
   }
 }

 
// EXPORTING INTERFACES
export * from "./auth/interfaces";
export { default as ACTION_CONSTANTS } from "./constants";


