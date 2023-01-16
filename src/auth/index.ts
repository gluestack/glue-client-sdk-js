import axios from "axios";
import { IAuth } from "./interfaces/IAuth";
import IAuthProviderEnum from "./interfaces/IAuthProviderEnum";

export class Auth implements IAuth {
  authBaseUrl: string = "";
  authToken: string = "";

  constructor(AUTH_BASE_URL: string) {
    this.authBaseUrl = AUTH_BASE_URL;
  }

  async loginWithEmailPassword(email: string, password: string) {
    try {
      const { data } = await axios.post(
        `${this.authBaseUrl}/authentication/signin`,
        {
          email,
          password,
        },
      );
      this.setAuthToken(data.data.token);
      return data.data;
    } catch (e) {
      //
    }
  }

  async socialLogin(provider: IAuthProviderEnum) {
    window.onmessage = (event) => {
      if (event.data) {
        this.setAuthToken(event.data);
      }
    };

    window.open(
      `${this.authBaseUrl}/authentication/signin/${provider}`,
      "_blank",
      "location=yes,height=570,width=520,scrollbars=yes,status=yes",
    );
    return "";
  }

  //@login
  async login(authObject: {
    provider?: IAuthProviderEnum;
    email?: string;
    password?: string;
  }) {
    if (authObject.provider) {
      switch (authObject.provider) {
        case IAuthProviderEnum.google:
        case IAuthProviderEnum.github:
        case IAuthProviderEnum.microsoft:
          return await this.socialLogin(authObject.provider);
      }
    }
    if (authObject.email && authObject.password) {
      return await this.loginWithEmailPassword(
        authObject.email,
        authObject.password,
      );
    }
  }

  //@setAuthToken
  setAuthToken(token: string) {
    this.authToken = token;
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
        const { data } = await axios.post(
          `${this.authBaseUrl}/authentication/me`,
          {},
          {
            headers: {
              "x-hasura-user-token": this.authToken,
            },
          },
        );
        this.setAuthToken(data.data.token);
        return data.data;
      } catch (e) {
        //
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
