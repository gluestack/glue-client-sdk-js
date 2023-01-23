import { Auth } from "./auth";
import { Storage } from "./storage";
import { IGlue } from "./interfaces/IGlue";
import EventTarget from "@ungap/event-target";

 export class Glue extends EventTarget implements IGlue {
   auth: Auth;
   storage: Storage;

   constructor({
     BASE_URL,
     AUTH,
   }: {
     BASE_URL: string;
     AUTH: {
       INSTANCE_NAME?: string;
       TOKEN?: string;
     };
   }) {
     super();
     this.auth = new Auth(
       `${BASE_URL}${AUTH?.INSTANCE_NAME ? "/" + AUTH.INSTANCE_NAME : "/auth"}`,
       this
     );
     this.storage = new Storage();
     AUTH?.TOKEN ? AUTH.TOKEN : undefined;
   }
 }

 
// EXPORTING INTERFACES
export * from "./auth/interfaces";
export { default as ACTION_CONSTANTS } from "./constants";


