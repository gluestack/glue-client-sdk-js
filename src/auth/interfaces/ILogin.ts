import IAuthProviderEnum from "./IAuthProviderEnum";

export type ILogin =
  | {
      provider: IAuthProviderEnum;
    }
  | { email: string; password: string };
