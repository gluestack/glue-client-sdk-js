export interface IUser {
  id: number;
  name: string;
  email: string;
  created_at?: string;
  updated_at?: string;
  token?: string;
  refresh_token?: string;
}

export interface IUser extends Record<string, string | number | boolean> {}
