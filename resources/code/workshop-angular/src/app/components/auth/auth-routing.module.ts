import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SigninComponent } from './signin/signin.component';
import { UnauthGuard } from './UnauthGuard';
import { ConfirmComponent } from './confirm/confirm.component';
import { SignupComponent } from './signup/signup.component';
import { NgModule } from '@angular/core';


const routes: Routes = [
    { path: 'auth', component: AuthComponent, children: [
        { path: 'signin', component: SigninComponent, canActivate: [UnauthGuard]},
        { path: 'confirm', component: ConfirmComponent, canActivate: [UnauthGuard]},
        { path: 'signup', component: SignupComponent, canActivate: [UnauthGuard]}]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
