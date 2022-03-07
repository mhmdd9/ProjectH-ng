import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {LogoutComponent} from './logout/logout.component';
import {PhoneConfirmationComponent} from "./phone-confirmation/phone-confirmation.component";
import {UserTypeComponent} from "./registration/user-type/user-type.component";
import {PersonalInformationComponent} from "../user-profile/personal-information/personal-information.component";
import {SpecInfoComponent} from "../user-profile/spec-info/spec-info.component";


const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {returnUrl: window.location.pathname}
      },
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'phone-confirmation',
        component: PhoneConfirmationComponent
      },
      // {
      //   path: 'registration/user-type',
      //   component: UserTypeComponent
      // },
      // {
      //   path: 'personal-information',
      //   component: PersonalInformationComponent,
      // },
      // {
      //   path: 'spec-info',
      //   component: SpecInfoComponent,
      // },
      {
        path: 'logout',
        component: LogoutComponent
      },
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: '**', redirectTo: 'login', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AuthRoutingModule {}
