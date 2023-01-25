import IAuthProviderEnum from "./IAuthProviderEnum";
import { ILoginWithEmailPasswordArgs } from "./IAuth";

export type ILogin =
  | {
      provider: IAuthProviderEnum;
    }
  | { args: ILoginWithEmailPasswordArgs };