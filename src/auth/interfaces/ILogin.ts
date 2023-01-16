import IAuthProviderEnum from "./IAuthProviderEnum";

export interface ILogin {
  provider?: IAuthProviderEnum;
  email?: string;
  password?: string;
}
