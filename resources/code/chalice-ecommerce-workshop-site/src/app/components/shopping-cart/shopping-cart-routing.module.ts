import { Routes, RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart.component';
import { AuthGuard } from '../auth/AuthGuard';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: 'shopping-cart', component: ShoppingCartComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShoppingCartRoutingModule { }
