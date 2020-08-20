import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CognitoUser } from '@aws-amplify/auth';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  itemCount = 0;
  appUser: CognitoUser;
  cart: {};
  constructor(private authService: AuthService, private appService: AppService) { }

  async ngOnInit() {
    this.authService.isLoggedIn().then(user => {
      this.appUser = user;
    });
    this.appService.getShoppingCart().then(data => {
      this.cart = data;
      this.getItemCount();
    });
    let token: any = await this.authService.currentSession();
    console.log(token.getIdToken().getJwtToken());
  }

  getItemCount() {
    this.itemCount = Object.keys(this.cart).length;
  }

  logout() {
    this.authService.signOut().then(() => {
      window.location.reload();
    });
  }
}
