import { Observable } from 'rxjs';
import * as i0 from '@angular/core';
import { InjectionToken } from '@angular/core';

interface ConfirmEmailVerificationReq {
    email: string;
    code: string;
}
interface ConfirmEmailVerificationRes {
    message: string;
}

interface ForgotPasswordReq {
    email: string;
}
interface ForgotPasswordRes {
    message: string;
    resetToken: string;
}

interface LoginReq {
    username: string;
    password: string;
}
interface LoginRes {
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

interface User {
    id: string;
    username: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    emailVerified: boolean;
    phoneVerified: boolean;
    role: string;
}

interface RegisterReq {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phone: string;
}

interface ResetPasswordReq {
    token: string;
    newPassword: string;
    confirmPassword: string;
}
interface ResetPasswordRes {
    message: string;
}

interface SendEmailVerificationReq {
    email: string;
}
interface SendEmailVerificationRes {
    message: string;
    code: string;
}

interface AuthModel {
    status: boolean;
    token: string;
    email: string;
    userData: User;
    message?: string;
}

declare abstract class AuthApi {
    abstract login(data: LoginReq): Observable<AuthModel>;
    abstract register(data: RegisterReq): Observable<AuthModel>;
    abstract sendEmailVerification(data: SendEmailVerificationReq): Observable<SendEmailVerificationRes>;
    abstract confirmEmailVerification(data: ConfirmEmailVerificationReq): Observable<ConfirmEmailVerificationRes>;
    abstract forgotPassword(data: ForgotPasswordReq): Observable<ForgotPasswordRes>;
    abstract resetPassword(data: ResetPasswordReq): Observable<ResetPasswordRes>;
}

declare class AuthService implements AuthApi {
    private readonly _httpClient;
    private readonly _authAdaptor;
    private readonly _apiUrl;
    login(data: LoginReq): Observable<AuthModel>;
    register(data: RegisterReq): Observable<AuthModel>;
    sendEmailVerification(data: SendEmailVerificationReq): Observable<SendEmailVerificationRes>;
    confirmEmailVerification(data: ConfirmEmailVerificationReq): Observable<ConfirmEmailVerificationRes>;
    forgotPassword(data: ForgotPasswordReq): Observable<ForgotPasswordRes>;
    resetPassword(data: ResetPasswordReq): Observable<ResetPasswordRes>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthService>;
}

declare const API_URL: InjectionToken<string>;

export { API_URL, AuthService };
export type { AuthModel, LoginReq, LoginRes };
