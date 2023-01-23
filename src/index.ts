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

     // Initialize Auth
     this.auth = new Auth(
       `${BASE_URL}/backend/auth`,
       this,
       AUTH?.TOKEN ? AUTH.TOKEN : undefined
     );

     // Initialize Storage
     this.storage = new Storage(`${BASE_URL}/backend/storage`, this);
   }
 }

 
// EXPORTING INTERFACES
export * from "./auth/interfaces";
export { default as ACTION_CONSTANTS } from "./constants";


