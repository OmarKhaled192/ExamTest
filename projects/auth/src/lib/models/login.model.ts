import { User } from "./user";

export interface LoginReq {
  username: string;
  password: string;
}
export interface LoginRes {
  status: boolean;
  code: number;
  message?: string;
  payload: {
    user: User;
    token: string;
  };
}
