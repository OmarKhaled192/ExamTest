import * as i0 from '@angular/core';
import { Injectable, InjectionToken, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, of } from 'rxjs';

var AuthEndPoints;
(function (AuthEndPoints) {
    AuthEndPoints["SEND_EMAIL_VERIFICATION"] = "/api/auth/send-email-verification";
    AuthEndPoints["CONFIRM_EMAIL_VERIFICATION"] = "/api/auth/confirm-email-verification";
    AuthEndPoints["REGISTER"] = "/api/auth/register";
    AuthEndPoints["LOGIN"] = "/api/auth/login";
    AuthEndPoints["FORGOT_PASSWORD"] = "/api/auth/forgot-password";
    AuthEndPoints["RESET_PASSWORD"] = "/api/auth/reset-password";
})(AuthEndPoints || (AuthEndPoints = {}));

class AuthAdaptor {
    adapt(res) {
        return {
            message: res.message,
            status: res.status,
            token: res.payload.token,
            email: res.payload.user.email,
            userData: res.payload.user
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

const API_URL = new InjectionToken('API_URL');

class AuthService {
    _httpClient = inject(HttpClient);
    _authAdaptor = inject(AuthAdaptor);
    _apiUrl = inject(API_URL);
    login(data) {
        return this._httpClient.post(`${this._apiUrl}${AuthEndPoints.LOGIN}`, data)
            .pipe(map(res => this._authAdaptor.adapt(res)), catchError(err => of(err)));
    }
    register(data) {
        return this._httpClient.post(`${this._apiUrl}${AuthEndPoints.REGISTER}`, data)
            .pipe(map(res => this._authAdaptor.adapt(res)), catchError(err => of(err)));
    }
    sendEmailVerification(data) {
        return this._httpClient.post(`${this._apiUrl}${AuthEndPoints.SEND_EMAIL_VERIFICATION}`, data)
            .pipe(catchError(err => of(err)));
    }
    confirmEmailVerification(data) {
        return this._httpClient.post(`${this._apiUrl}${AuthEndPoints.CONFIRM_EMAIL_VERIFICATION}`, data)
            .pipe(catchError(err => of(err)));
    }
    forgotPassword(data) {
        return this._httpClient.post(`${this._apiUrl}${AuthEndPoints.FORGOT_PASSWORD}`, data)
            .pipe(catchError(err => of(err)));
    }
    resetPassword(data) {
        return this._httpClient.post(`${this._apiUrl}${AuthEndPoints.RESET_PASSWORD}`, data)
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

export { API_URL, AuthService };
//# sourceMappingURL=auth.mjs.map
