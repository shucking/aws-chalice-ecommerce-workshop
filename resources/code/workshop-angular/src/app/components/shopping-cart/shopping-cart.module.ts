import { NgModule } from "@angular/core";
import { ShoppingCartComponent } from './shopping-cart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';

@NgModule({
    declarations: [ShoppingCartComponent],
    imports: [
        NgbModule,
        CommonModule,
        RouterModule,
        ShoppingCartRoutingModule
    ],
    exports: [RouterModule]
})
export class ShoppingCartModule { }
