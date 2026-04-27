import { User } from "./user";

export interface RegisterReq {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface RegisterRes {
  status: boolean
  code: number
  message?: string,
  payload: {
    user: User
    token: string
  }
}

