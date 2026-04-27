import { User } from "./user";

export interface AuthModel {
  status: boolean;
  token: string;
  email: string;
  userData: User
  message?: string;
}
