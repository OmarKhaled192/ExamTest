export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: 'ADMIN' | 'USER';
  createdAt: string;
  updatedAt: string;
}

export interface UserProfileRes {
  user: User;
}

export interface UpdateProfileReq {
  firstName: string;
  lastName: string;
  profilePhoto?: string;
  phone: string;
}

export interface ChangePasswordReq {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface EmailRequestReq {
  newEmail: string;
}

export interface EmailConfirmReq {
  code: string;
}

export interface MessageRes {
  message: string;
}

export interface EmailConfirmRes extends MessageRes {
  user: User;
}
