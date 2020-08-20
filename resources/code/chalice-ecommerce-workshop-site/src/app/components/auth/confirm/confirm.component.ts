import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import Auth from '@aws-amplify/auth';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  email = environment.confirm.email;
  form: FormGroup = new FormGroup({
    email: new FormControl({value: this.email, disabled: true}),
    code: new FormControl('', [ Validators.required, Validators.min(3) ])
  });
  get codeInput() { return this.form.get('code'); }
  constructor(private router: Router) { }

  ngOnInit() {
    if (!this.email) {
      this.router.navigate(['auth/signup']);
    }
  }

  sendAgain() {
    Auth.resendSignUp(this.email).then(() => {
      console.log('New code sent.');
    }).catch(() => {
      console.log('There was an error sending the code.');
    });
  }

  confirm() {
    Auth.confirmSignUp(this.email, this.codeInput.value).then((data: any) => {
      console.log(data);
      if (data === 'SUCCESS' && environment.confirm.email && environment.confirm.password) {
        Auth.signIn(this.email, environment.confirm.password).then(() => {
          this.router.navigate(['']);
          window.location.reload();
        }).catch((error: any) => {
          this.router.navigate(['auth/signin']);
        });
      }
    }).catch((error: any) => {
        console.log(error);
    });
  }
}
