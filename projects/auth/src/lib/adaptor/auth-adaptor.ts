import { Injectable } from '@angular/core';
import { Adaptor } from '../interfaces/adaptor';

@Injectable({
  providedIn: 'root',
})
export class AuthAdaptor implements Adaptor {
  adapt(res: any): any {
    return {
      token: res.data.token,
      email: res.data.user.email,
      userData: res.data.user
    }
  }
}
