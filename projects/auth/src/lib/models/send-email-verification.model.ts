// send-email-verification
export interface SendEmailVerificationReq {
  email: string;
}
export interface SendEmailVerificationRes {
  message: string;
  code: string;
}
