import axios from "axios";
import { Glue } from "../index";
import GlueEvent from "../glue-event";
import AUTH_EVENT_CONSTANTS from "./event-constants";
import { ILogin, IUserWithToken } from "./interfaces";
import {
  IAuth,
  ILoginWithEmailPasswordArgs,
  ISignupWithEmail,
} from "./interfaces/IAuth";
import IAuthProviderEnum from "./interfaces/IAuthProviderEnum";

export class Auth implements IAuth {
  authBaseUrl: string = "";
  authToken: string = "";
  glue: Glue;

  constructor(AUTH_BASE_URL: string, GLUE: Glue, AUTH_TOKEN?: string) {
    this.authBaseUrl = AUTH_BASE_URL;
    this.authToken = AUTH_TOKEN ?? "";
    this.glue = GLUE;
  }

  async loginWithEmailPassword(args: ILoginWithEmailPasswordArgs) {
    try {
      const { data } = await axios.post<IAPIResponse<IUserWithToken>>(
        `${this.authBaseUrl}/authentication/signin`,
        { ...args }
      );
      if (data?.success && data?.data) {
        // SET THE TOKEN
        this.setAuthToken(data.data.token);
        return data?.data;
      }

      return data?.message;
    } catch (error) {
      let message = "Something went wrong";
      if (axios.isAxiosError(error)) {
        message = error.message;
      }
      return message;
    }
  }

  async socialSignup(provider: IAuthProviderEnum) {
    return new Promise<IUserWithToken | string | null>(
      async (resolve, reject) => {
        window.onmessage = async (event: any) => {
          if (event.data && typeof event.data === "string") {
            const data = JSON.parse(event?.data);

            if ("token" in data) {
              this.setAuthToken(data.token);
              try {
                const userWithToken = await this.getUser();

                if (userWithToken) {
                  resolve(userWithToken);
                  return;
                }
              } catch (error) {
                resolve(null);
              }
            }
          }
        };

        window.open(
          `${this.authBaseUrl}/authentication/signup/${provider}`,
          "_blank",
          "location=yes,height=570,width=520,scrollbars=yes,status=yes"
        );
      }
    );
  }

  async socialLogin(provider: IAuthProviderEnum) {
    return new Promise<IUserWithToken | string | null>(
      async (resolve, reject) => {
        window.onmessage = async (event: any) => {
          if (event.data && typeof event.data === "string") {
            const data = JSON.parse(event?.data);

            if ("token" in data) {
              this.setAuthToken(data.token);
              try {
                const userWithToken = await this.getUser();

                if (userWithToken) {
                  resolve(userWithToken);
                  return;
                }
              } catch (error) {
                resolve(null);
              }
            }
          }
        };

        window.open(
          `${this.authBaseUrl}/authentication/signin/${provider}`,
          "_blank",
          "location=yes,height=570,width=520,scrollbars=yes,status=yes"
        );
      }
    );
  }

  //@signupWithEmail
  async signupWithEmail(args: ISignupWithEmail) {
    try {
      const { data } = await axios.post<IAPIResponse<IUserWithToken>>(
        `${this.authBaseUrl}/authentication/signup`,
        {
          ...args,
        }
      );

      if (data?.success && data?.data) {
        // SET THE TOKEN
        this.setAuthToken(data.data.token);

        return data?.data;
      }

      // RESPONSE
      return data?.message;
    } catch (error) {
      let message = "Something went wrong";

      if (axios.isAxiosError(error)) {
        message = error.message;
      }

      return message;
    }
  }

  //@login
  async login(authObject: ILogin) {
    if ("args" in authObject) {
      return await this.loginWithEmailPassword({
        ...authObject.args,
      });
    }

    switch (authObject.provider) {
      case IAuthProviderEnum.github:
        return await this.socialLogin(authObject.provider);
      case IAuthProviderEnum.microsoft:
        return await this.socialLogin(authObject.provider);
      default:
        return await this.socialLogin(authObject.provider);
    }
  }

  //@setAuthToken
  setAuthToken(_token: string) {
    this.authToken = _token;

    // DISPATCHING EVENTS
    this.glue.dispatchEvent(
      GlueEvent(AUTH_EVENT_CONSTANTS.TOKEN_UPDATED, { detail: _token })
    );
    this.glue.dispatchEvent(
      GlueEvent(AUTH_EVENT_CONSTANTS.ALL, {
        detail: _token,
      })
    );
    this.glue.dispatchEvent(
      GlueEvent(AUTH_EVENT_CONSTANTS.UPDATED, { detail: _token })
    );
    return this.authToken;
  }

  //@getAuthToken
  getAuthToken() {
    return this.authToken;
  }

  //@getUser
  async getUser() {
    if (this.authToken) {
      try {
        const { data } = await axios.get(
          `${this.authBaseUrl}/authentication/me`,
          {
            headers: {
              "x-hasura-user-token": this.authToken,
            },
          }
        );
        return data;
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  //@isLoggedIn
  async isLoggedIn() {
    if (await this.getUser()) {
      return true;
    }
    return false;
  }
}
