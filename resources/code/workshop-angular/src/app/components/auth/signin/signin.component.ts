import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CognitoUser } from '@aws-amplify/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [ Validators.email, Validators.required ]),
    password: new FormControl('', [ Validators.required ]),
  });
  get emailInput() { return this.form.get('email'); }
  get passInput() { return this.form.get('password'); }
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  signIn() {
    this.authService.signIn(this.emailInput.value, this.passInput.value).then((user: CognitoUser|any) => {
      this.router.navigate(['']);
      window.location.reload();
    }).catch((error: any) => {
      switch (error.code) {
        case 'UserNotConfirmedException':
            environment.confirm.email = this.emailInput.value;
            environment.confirm.password = this.passInput.value;
            this.router.navigate(['auth/confirm']);
            break;
        case 'UsernameExistsException':
            this.router.navigate(['auth/signin']);
            break;
      }
    });
  }
}
