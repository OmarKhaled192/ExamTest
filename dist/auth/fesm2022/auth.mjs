import * as i0 from '@angular/core';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, of } from 'rxjs';

class AuthEndPoints {
    static BASE_URL = 'https://exam-app.elevate-bootcamp.cloud';
    static AUTH = '/api/auth';
    static build(path) {
        return `${this.BASE_URL}${this.AUTH}/${path}`;
    }
    static SEND_EMAIL_VERIFICATION = this.build('send-email-verification');
    static CONFIRM_EMAIL_VERIFICATION = this.build('confirm-email-verification');
    static REGISTER = this.build('register');
    static LOGIN = this.build('login');
    static FORGOT_PASSWORD = this.build('forgot-password');
    static RESET_PASSWORD = this.build('reset-password');
}

class AuthAdaptor {
    adapt(res) {
        return {
            token: res.data.token,
            email: res.data.user.email,
            userData: res.data.user
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: AuthAdaptor, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: AuthAdaptor, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: AuthAdaptor, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

class AuthService {
    _httpClient = inject(HttpClient);
    _authAdaptor = inject(AuthAdaptor);
    login(data) {
        return this._httpClient.post(AuthEndPoints.LOGIN, data)
            .pipe(map(res => this._authAdaptor.adapt(res)), catchError(err => of(err)));
    }
    register(data) {
        return this._httpClient.post(AuthEndPoints.REGISTER, data)
            .pipe(catchError(err => of(err)));
    }
    sendEmailVerification(data) {
        return this._httpClient.post(AuthEndPoints.SEND_EMAIL_VERIFICATION, data)
            .pipe(catchError(err => of(err)));
    }
    confirmEmailVerification(data) {
        return this._httpClient.post(AuthEndPoints.CONFIRM_EMAIL_VERIFICATION, data)
            .pipe(catchError(err => of(err)));
    }
    forgotPassword(data) {
        return this._httpClient.post(AuthEndPoints.FORGOT_PASSWORD, data)
            .pipe(catchError(err => of(err)));
    }
    resetPassword(data) {
        return this._httpClient.post(AuthEndPoints.RESET_PASSWORD, data)
            .pipe(catchError(err => of(err)));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: AuthService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: AuthService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: AuthService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/*
 * Public API Surface of auth
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AuthService };
//# sourceMappingURL=auth.mjs.map
