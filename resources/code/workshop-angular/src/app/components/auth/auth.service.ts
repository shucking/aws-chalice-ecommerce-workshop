import { Injectable } from '@angular/core';
import { Hub } from '@aws-amplify/core';
import { Subject, Observable } from 'rxjs';
import Auth, { CognitoUser } from '@aws-amplify/auth';

export interface NewUser {
  email: string;
  password: string;
  address: string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static SIGN_IN = 'signIn';
  public static SIGN_OUT = 'signOut';
  public loggedIn: boolean;
  private _authState: Subject<CognitoUser|any> = new Subject<CognitoUser|any>();
  authState: Observable<CognitoUser|any> = this._authState.asObservable();

  constructor() {
    Hub.listen('auth', (data) => {
      const { channel, payload } = data;
      if (channel === 'auth') {
        this._authState.next(payload.event);
      }
    });
  }

  async signUp(user: NewUser): Promise<CognitoUser|any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
      attributes: {
        email: user.email,
        address: user.address
      }
    });
  }

  async signIn(username: string, password: string): Promise<CognitoUser|any> {
    return new Promise((resolve, reject) => {
      Auth.signIn(username, password)
      .then((user: CognitoUser|any) => {
        this.loggedIn = true;
        resolve(user);
      }).catch((error: any) => reject(error));
    });
  }

  async signOut(): Promise<any> {
    return Auth.signOut()
      .then(() => this.loggedIn = false);
  }

  async isLoggedIn() {
    return await Auth.currentAuthenticatedUser();
  }

  async currentSession() {
    console.log(await Auth.currentSession());
  }
}
