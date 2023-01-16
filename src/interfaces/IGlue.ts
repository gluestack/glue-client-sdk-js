import { Auth } from "../auth";
import { Storage } from "../storage";

export interface IGlue {
  auth: Auth;
  storage: Storage;
}
