import { IUserWithToken } from "./IUserWithToken";
import { ILogin } from "./ILogin";
import { IUser } from "./IUser";
import IAuthProviderEnum from "./IAuthProviderEnum";



export interface ILoginWithEmailPasswordArgs
  extends Record<string, string | boolean | number> {
  email: string;
  password: string;
}

export interface ISignupWithEmail
  extends Record<string, string | boolean | number | undefined> {
  email: string;
  password: string;
  name?: string;
}

export interface IAuth {
  authBaseUrl: string;
  authToken: string;
  signupWithEmail(
    args: ISignupWithEmail
  ): Promise<IUserWithToken | null | string>;
  loginWithEmailPassword(
    args: ILoginWithEmailPasswordArgs
  ): Promise<IUserWithToken | null | string>;
  socialLogin(
    provider: IAuthProviderEnum
  ): Promise<IUserWithToken | null | string>;
  socialSignup(
    provider: IAuthProviderEnum
  ): Promise<IUserWithToken | null | string>;
  login(authObject: ILogin): Promise<IUserWithToken | null | string>;
  setAuthToken(token: string): string;
  getAuthToken(): string;
  getUser(): Promise<IUser | null>;
  isLoggedIn(): Promise<boolean>;
}
