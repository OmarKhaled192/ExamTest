import { Injectable } from '@angular/core';
import { Adaptor } from '../interfaces/adaptor';
import { RegisterRes } from '../models/register.model';
import { AuthModel } from '../models/auth-model';
import { LoginRes } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthAdaptor implements Adaptor<RegisterRes | LoginRes, AuthModel> {
  adapt(res: RegisterRes | LoginRes): AuthModel {
    return {
      message: res.message,
      status: res.status,
      token: res.payload.token,
      email: res.payload.user.email,
      userData: res.payload.user as unknown as AuthModel['userData']
    }
  }
}
