// forgot-password
export interface ForgotPasswordReq {
  email: string;
}
export interface ForgotPasswordRes {
  message: string;
  resetToken: string;
}
