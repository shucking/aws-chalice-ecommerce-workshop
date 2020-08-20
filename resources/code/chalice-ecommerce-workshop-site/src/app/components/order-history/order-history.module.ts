import { NgModule } from "@angular/core";
import { OrderHistoryComponent } from './order-history.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderHistoryRoutingModule } from './order-history-routing.module';

@NgModule({
    declarations: [OrderHistoryComponent],
    imports: [
        CommonModule,
        RouterModule,
        NgbModule,
        OrderHistoryRoutingModule
    ],
    exports: [RouterModule]
})
export class OrderHistoryModule { }
