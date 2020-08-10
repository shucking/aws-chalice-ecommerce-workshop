import { Routes, RouterModule } from "@angular/router";
import { OrderHistoryComponent } from './order-history.component';
import { AuthGuard } from '../auth/AuthGuard';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: 'order-history', component: OrderHistoryComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderHistoryRoutingModule { }
