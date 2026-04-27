import { Injectable } from '@angular/core';
import { Adaptor } from '../interfaces/adaptor';
import { RegisterRes } from '../models/register.model';
import { AuthModel } from '../models/auth-model';

@Injectable({
  providedIn: 'root',
})
export class AuthAdaptor implements Adaptor {
  adapt(res: RegisterRes): AuthModel {
    return {
      message: res.message,
      status: res.status,
      token: res.payload.token,
      email: res.payload.user.email,
      userData: res.payload.user
    }
  }
}
