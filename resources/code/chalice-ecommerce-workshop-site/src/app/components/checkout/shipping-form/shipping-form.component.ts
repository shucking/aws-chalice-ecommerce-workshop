import { Component, OnInit, Input } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {
  address: {} = {};
  form: FormGroup = new FormGroup({
    addressLine: new FormControl('', [ Validators.required]),
    postal: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    region: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    addressType: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required)
  });

  get addrLineInput() { return this.form.get('addressLine'); }
  get postalInput() { return this.form.get('postal'); }
  get cityInput() { return this.form.get('city'); }
  get provInput() { return this.form.get('region'); }
  get countInput() { return this.form.get('country'); }
  get addrTypeInput() { return this.form.get('addressType'); }
  get nameInput() { return this.form.get('name'); }
  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
  }

  buildAddress() {
    const streetAddress = `${this.addrLineInput.value}, ${this.cityInput.value}, ${this.provInput.value}, ${this.postalInput.value} ${this.countInput.value}`;
    const address = {
      name: this.nameInput.value,
      street_address: streetAddress,
      locality: this.cityInput.value,
      region: this.provInput.value,
      postal_code: this.postalInput.value,
      country: this.countInput.value,
      address_type: this.addrTypeInput.value
    };
    return address;
  }

  placeOrder() {
    this.appService.checkout(this.buildAddress()).then(() => {
      this.router.navigate(['/checkout/order-success']);
    });
  }

}
