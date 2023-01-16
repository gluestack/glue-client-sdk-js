import { IUserWithToken } from "./IUserWithToken";
import { ILogin } from "./ILogin";
import { IUser } from "./IUser";
import IAuthProviderEnum from "./IAuthProviderEnum";

export interface IAuth {
  authBaseUrl: string;
  authToken: string;

  loginWithEmailPassword(
    email: string,
    password: string,
  ): Promise<IUserWithToken>;
  socialLogin(provider: IAuthProviderEnum): Promise<string>;
  login(authObject: ILogin): Promise<IUser>;
  setAuthToken(token: string): string;
  getAuthToken(): string;
  getUser(): Promise<IUser>;
  isLoggedIn(): Promise<boolean>;
}
