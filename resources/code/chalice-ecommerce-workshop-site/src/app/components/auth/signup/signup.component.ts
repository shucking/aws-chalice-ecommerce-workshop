import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';


function passValidator(form: FormGroup) {
  const pass = form.get('password');
  const confirm = form.get('confirmPassword');
  if (pass.value !== confirm.value) {
    confirm.setErrors({ passwordsMatch: true });
  } else {
    confirm.setErrors(null);
  }
  return null;
}

function symbolValidator(control: FormControl) {
  if (!control.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,100})/)) {
    return { symbol: true };
  } else {
    return null;
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [ Validators.email, Validators.required ]),
    password: new FormControl('', [ Validators.required, symbolValidator, Validators.minLength(8) ]),
    confirmPassword: new FormControl(''),
    addressLine: new FormControl('', [ Validators.required]),
    postal: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    region: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    addressType: new FormControl('', Validators.required)
  }, {
    validators: passValidator
  });

  get emailInput() { return this.form.get('email'); }
  get passInput() { return this.form.get('password'); }
  get addrLineInput() { return this.form.get('addressLine'); }
  get postalInput() { return this.form.get('postal'); }
  get cityInput() { return this.form.get('city'); }
  get provInput() { return this.form.get('region'); }
  get countInput() { return this.form.get('country'); }
  get addrTypeInput() { return this.form.get('addressType'); }

  constructor(private router: Router, private authService: AuthService) { }
  ngOnInit() {
  }

  shouldEnableSubmit() {
    return (
      !this.emailInput.valid ||
      !this.passInput.valid
    );
  }

  buildAddress() {
    const streetAddress = `${this.addrLineInput.value}, ${this.cityInput.value}, ${this.provInput.value}, ${this.postalInput.value} ${this.countInput.value}`;
    const address = {
      street_address: streetAddress,
      locality: this.cityInput.value,
      region: this.provInput.value,
      postal_code: this.postalInput.value,
      country: this.countInput.value,
      address_type: this.addrTypeInput.value
    };
    return JSON.stringify(address);
  }

  signUp() {
    this.authService.signUp({
      email: this.emailInput.value,
      password: this.passInput.value,
      address: this.buildAddress()
    }).then(data => {
      environment.confirm.email = this.emailInput.value;
      environment.confirm.password = this.passInput.value;
      this.router.navigate(['/auth/confirm']);
    }).catch(error => console.log(error));
  }

}
