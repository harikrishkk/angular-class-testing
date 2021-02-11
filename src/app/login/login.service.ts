import { UserCredentials } from './../_types/user-credentials.type';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor() {}

  login(credentials: UserCredentials) {}
}
