import { Observable } from "rxjs";
import { ConfirmEmailVerificationReq, ConfirmEmailVerificationRes } from "../models/confirm-email-verification.model";
import { ForgotPasswordReq, ForgotPasswordRes } from "../models/forgot-password.model";
import { LoginReq, LoginRes } from "../models/login.model";
import { RegisterReq, RegisterRes } from "../models/register.model";
import { ResetPasswordReq, ResetPasswordRes } from "../models/reset-password.model";
import { SendEmailVerificationReq, SendEmailVerificationRes } from "../models/send-email-verification.model";
import { AuthModel } from "../models/auth-model";

export abstract class AuthApi {
  abstract login(data: LoginReq): Observable<AuthModel>;

  abstract register(data: RegisterReq): Observable<AuthModel>;

  abstract sendEmailVerification(data: SendEmailVerificationReq): Observable<SendEmailVerificationRes>;

  abstract confirmEmailVerification(data: ConfirmEmailVerificationReq): Observable<ConfirmEmailVerificationRes>;

  abstract forgotPassword(data: ForgotPasswordReq): Observable<ForgotPasswordRes>;

  abstract resetPassword(data: ResetPasswordReq): Observable<ResetPasswordRes>;
}
