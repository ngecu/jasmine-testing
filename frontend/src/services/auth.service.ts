import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  registerUser(user_details: User) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
