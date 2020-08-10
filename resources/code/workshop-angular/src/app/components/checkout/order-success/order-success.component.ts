import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent {

  constructor(private router: Router) {
    setTimeout(() => {
      router.navigate(['/']).then(() => {
        window.location.reload();
      });
    }, 5000);
  }


}
