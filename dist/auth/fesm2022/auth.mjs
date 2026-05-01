import * as i0 from '@angular/core';
import { Injectable, InjectionToken, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

var AuthEndPoints;
(function (AuthEndPoints) {
    AuthEndPoints["SEND_EMAIL_VERIFICATION"] = "/send-email-verification";
    AuthEndPoints["CONFIRM_EMAIL_VERIFICATION"] = "/confirm-email-verification";
    AuthEndPoints["REGISTER"] = "/register";
    AuthEndPoints["LOGIN"] = "/login";
    AuthEndPoints["FORGOT_PASSWORD"] = "/forgot-password";
    AuthEndPoints["RESET_PASSWORD"] = "/reset-password";
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
    _authPrefix = '/api/auth';
    login(data) {
        return this._httpClient.post(`${this._apiUrl}${this._authPrefix}${AuthEndPoints.LOGIN}`, data)
            .pipe(map(res => this._authAdaptor.adapt(res)));
    }
    register(data) {
        return this._httpClient.post(`${this._apiUrl}${this._authPrefix}${AuthEndPoints.REGISTER}`, data)
            .pipe(map(res => this._authAdaptor.adapt(res)));
    }
    sendEmailVerification(data) {
        return this._httpClient.post(`${this._apiUrl}${this._authPrefix}${AuthEndPoints.SEND_EMAIL_VERIFICATION}`, data);
    }
    confirmEmailVerification(data) {
        return this._httpClient.post(`${this._apiUrl}${this._authPrefix}${AuthEndPoints.CONFIRM_EMAIL_VERIFICATION}`, data);
    }
    forgotPassword(data) {
        return this._httpClient.post(`${this._apiUrl}${this._authPrefix}${AuthEndPoints.FORGOT_PASSWORD}`, data);
    }
    resetPassword(data) {
        return this._httpClient.post(`${this._apiUrl}${this._authPrefix}${AuthEndPoints.RESET_PASSWORD}`, data);
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

export { API_URL, AuthAdaptor, AuthService };
//# sourceMappingURL=auth.mjs.map
