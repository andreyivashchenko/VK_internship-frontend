export interface ILogin {
  email: string;
  password: string;
}
export interface IUser {
  firstname: string;
  lastname: string;
  birthday?: string;
  email: string;
  city?: string;
  university?: string;
  avatarImg?: string;
}

export interface IRegisteration extends ILogin {
  firstname: string;
  lastname: string;
}
export type tokenType = string;
