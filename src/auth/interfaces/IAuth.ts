import { IUserWithToken } from "./IUserWithToken";
import { ILogin } from "./ILogin";
import { IUser } from "./IUser";
import IAuthProviderEnum from "./IAuthProviderEnum";

export interface IAuth {
  authBaseUrl: string;
  authToken: string;
  signupWithEmail(
    name: string,
    email: string,
    password: string
  ): Promise<IUserWithToken | null | string>;
  loginWithEmailPassword(
    email: string,
    password: string
  ): Promise<IUserWithToken | null | string>;
  socialLogin(
    provider: IAuthProviderEnum
  ): Promise<IUserWithToken | null | string>;
  login(authObject: ILogin): Promise<IUserWithToken | null | string>;
  setAuthToken(token: string): string;
  getAuthToken(): string;
  getUser(): Promise<IUser | null>;
  isLoggedIn(): Promise<boolean>;
}
