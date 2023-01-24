import { Auth } from "./auth";
import { Storage } from "./storage";
import { IGlue } from "./interfaces/IGlue";
import EventTarget from "@ungap/event-target";

 export class Glue implements IGlue {
   auth: Auth;
   storage: Storage;
   target: EventTarget;

   constructor({
     BASE_URL,
     AUTH,
   }: {
     BASE_URL: string;
     AUTH?: {
       INSTANCE_NAME?: string;
       TOKEN?: string;
     };
   }) {
     // Initialize Auth
     this.auth = new Auth(
       `${BASE_URL}/backend/auth`,
       this,
       AUTH?.TOKEN ? AUTH.TOKEN : undefined
     );

     // Initialize Storage
     this.storage = new Storage(`${BASE_URL}/backend/storage`, this);

     this.target = new EventTarget();
   }

   dispatchEvent(e: Event) {
     this.target.dispatchEvent(e);
   }
 }

 
// EXPORTING INTERFACES
export * from "./auth/interfaces";
export { default as ACTION_CONSTANTS } from "./constants";


