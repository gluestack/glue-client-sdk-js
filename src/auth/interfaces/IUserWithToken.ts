import { IUser } from "./IUser";

export interface IUserWithToken extends IUser {
  token: string;
}
