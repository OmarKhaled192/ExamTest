export interface ConfirmEmailVerificationReq {
  email: string;
  code: string;
}
export interface ConfirmEmailVerificationRes {
  message: string;
}
