import { Observable } from 'rxjs';
import * as i0 from '@angular/core';

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

interface RegisterReq {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phone: string;
}
interface RegisterRes {
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
        role: string;
        createdAt: string;
        updatedAt: string;
    };
    token: string;
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

declare abstract class AuthApi {
    abstract login(data: LoginReq): Observable<LoginRes>;
    abstract register(data: RegisterReq): Observable<RegisterRes>;
    abstract sendEmailVerification(data: SendEmailVerificationReq): Observable<SendEmailVerificationRes>;
    abstract confirmEmailVerification(data: ConfirmEmailVerificationReq): Observable<ConfirmEmailVerificationRes>;
    abstract forgotPassword(data: ForgotPasswordReq): Observable<ForgotPasswordRes>;
    abstract resetPassword(data: ResetPasswordReq): Observable<ResetPasswordRes>;
}

declare class AuthService implements AuthApi {
    private readonly _httpClient;
    private readonly _authAdaptor;
    login(data: LoginReq): Observable<LoginRes>;
    register(data: RegisterReq): Observable<RegisterRes>;
    sendEmailVerification(data: SendEmailVerificationReq): Observable<SendEmailVerificationRes>;
    confirmEmailVerification(data: ConfirmEmailVerificationReq): Observable<ConfirmEmailVerificationRes>;
    forgotPassword(data: ForgotPasswordReq): Observable<ForgotPasswordRes>;
    resetPassword(data: ResetPasswordReq): Observable<ResetPasswordRes>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthService>;
}

export { AuthService };
