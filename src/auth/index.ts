import axios from "axios";
import { ILogin, IUserWithToken } from "./interfaces";
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
      const { data } = await axios.post<IAPIResponse<IUserWithToken>>(
        `${this.authBaseUrl}/authentication/signin`,
        {
          email,
          password,
        }
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

  async socialLogin(provider: IAuthProviderEnum) {
    return new Promise<IUserWithToken | string | null>(
      async (resolve, reject) => {
        window.onmessage = async (event) => {
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
  async signupWithEmail(name: string, email: string, password: string) {
    try {
      const { data } = await axios.post<IAPIResponse<IUserWithToken>>(
        `${this.authBaseUrl}/authentication/signup`,
        {
          name,
          email,
          password,
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
    if ("provider" in authObject) {
      switch (authObject.provider) {
        case IAuthProviderEnum.google:
          return await this.socialLogin(authObject.provider);
        case IAuthProviderEnum.github:
          return await this.socialLogin(authObject.provider);
        case IAuthProviderEnum.microsoft:
          return await this.socialLogin(authObject.provider);
      }
    }

    return await this.loginWithEmailPassword(
      authObject.email,
      authObject.password
    );
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
    console.log("AUTH TOKEN", this.authToken);

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
