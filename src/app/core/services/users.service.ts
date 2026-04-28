import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiEndPoints } from '../enums/api-endpoints';
import { 
  User, 
  UserProfileRes, 
  UpdateProfileReq, 
  ChangePasswordReq, 
  EmailRequestReq, 
  EmailConfirmReq, 
  MessageRes, 
  EmailConfirmRes 
} from '../models/user.model';
import { SingleAdaptor } from '../adapters/api.adaptor';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _singleAdaptor = inject(SingleAdaptor<User>);

  getProfile(): Observable<User> {
    return this._httpClient.get<UserProfileRes>(ApiEndPoints.USER_PROFILE)
      .pipe(
        map(res => this._singleAdaptor.adapt(res))
      );
  }

  updateProfile(data: UpdateProfileReq): Observable<User> {
    return this._httpClient.patch<UserProfileRes>(ApiEndPoints.USER_PROFILE, data)
      .pipe(
        map(res => this._singleAdaptor.adapt(res))
      );
  }

  changePassword(data: ChangePasswordReq): Observable<MessageRes> {
    return this._httpClient.post<MessageRes>(ApiEndPoints.CHANGE_PASSWORD, data);
  }

  requestEmailChange(data: EmailRequestReq): Observable<MessageRes> {
    return this._httpClient.post<MessageRes>(ApiEndPoints.EMAIL_REQUEST, data);
  }

  confirmEmailChange(data: EmailConfirmReq): Observable<EmailConfirmRes> {
    return this._httpClient.post<EmailConfirmRes>(ApiEndPoints.EMAIL_CONFIRM, data);
  }

  deleteAccount(): Observable<MessageRes> {
    return this._httpClient.delete<MessageRes>(ApiEndPoints.DELETE_ACCOUNT);
  }
}
