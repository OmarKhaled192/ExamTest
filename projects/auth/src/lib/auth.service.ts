import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { AuthEndPoints } from './enums/AuthEndPoints';
import { AuthAdaptor } from './adaptor/auth-adaptor';
import { API_URL } from './tokens/api-url.token';
import { AuthApi } from './base/authApi';
import { ConfirmEmailVerificationReq, ConfirmEmailVerificationRes } from './models/confirm-email-verification.model';
import { ForgotPasswordReq, ForgotPasswordRes } from './models/forgot-password.model';
import { LoginReq, LoginRes } from './models/login.model';
import { RegisterReq, RegisterRes } from './models/register.model';
import { ResetPasswordReq, ResetPasswordRes } from './models/reset-password.model';
import { SendEmailVerificationReq, SendEmailVerificationRes } from './models/send-email-verification.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthApi {

  private readonly _httpClient = inject(HttpClient);
  private readonly _authAdaptor = inject(AuthAdaptor);
  private readonly _apiUrl = inject(API_URL);

  login(data: LoginReq): Observable<LoginRes> {
    return this._httpClient.post<LoginRes>(`${this._apiUrl}${AuthEndPoints.LOGIN}`, data)
      .pipe(
        map(res => this._authAdaptor.adapt(res)),
        catchError(err => of(err))
      );
  }

  register(data: RegisterReq): Observable<RegisterRes> {
    return this._httpClient.post<RegisterRes>(`${this._apiUrl}${AuthEndPoints.REGISTER}`, data)
      .pipe(
        map(res => this._authAdaptor.adapt(res)),
        catchError(err => of(err))
      );
  }

  sendEmailVerification(data: SendEmailVerificationReq): Observable<SendEmailVerificationRes> {
    return this._httpClient.post<SendEmailVerificationRes>(`${this._apiUrl}${AuthEndPoints.SEND_EMAIL_VERIFICATION}`, data)
      .pipe(catchError(err => of(err)));
  }

  confirmEmailVerification(data: ConfirmEmailVerificationReq): Observable<ConfirmEmailVerificationRes> {
    return this._httpClient.post<ConfirmEmailVerificationRes>(`${this._apiUrl}${AuthEndPoints.CONFIRM_EMAIL_VERIFICATION}`, data)
      .pipe(catchError(err => of(err)));
  }

  forgotPassword(data: ForgotPasswordReq): Observable<ForgotPasswordRes> {
    return this._httpClient.post<ForgotPasswordRes>(`${this._apiUrl}${AuthEndPoints.FORGOT_PASSWORD}`, data)
      .pipe(catchError(err => of(err)));
  }

  resetPassword(data: ResetPasswordReq): Observable<ResetPasswordRes> {
    return this._httpClient.post<ResetPasswordRes>(`${this._apiUrl}${AuthEndPoints.RESET_PASSWORD}`, data)
      .pipe(catchError(err => of(err)));
  }
}
