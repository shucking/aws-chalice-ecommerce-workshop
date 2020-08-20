import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders$: Promise<any>;
  constructor(private appService: AppService) { }

  async ngOnInit() {
    this.orders$ = await this.appService.getOrderHistory();
  }

}
