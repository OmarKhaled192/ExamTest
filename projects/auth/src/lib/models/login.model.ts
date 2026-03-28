export interface LoginReq {
  username: string;
  password: string;
}
export interface LoginRes {
  status: boolean;
  code: number;
  message?: string;
  payload: {
    user: {
      id: string;
      username: string;
      email: string;
      phone: string;
      firstName: string;
      lastName: string;
      emailVerified: boolean;
      phoneVerified: boolean;
      role: string;
    };
    token: string;
  };
}
