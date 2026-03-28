
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
  user: {
    id: string;
    username: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    profilePhoto: string;
    emailVerified: boolean;
    phoneVerified: boolean;
    role: string; // e.g., 'ADMIN'
    createdAt: string; // ISO date
    updatedAt: string; // ISO date
  };
  token: string;
}
