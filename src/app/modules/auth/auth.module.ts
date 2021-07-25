import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {LogoutComponent} from './logout/logout.component';
import {AuthComponent} from './auth.component';
import {TranslationModule} from '../i18n/translation.module';
import {PhoneConfirmationComponent} from './phone-confirmation/phone-confirmation.component';
import {UserTypeComponent} from './registration/user-type/user-type.component';
import {MatRadioModule} from "@angular/material/radio";
import {InlineSVGModule} from "ng-inline-svg";
import {MatFormFieldModule} from "@angular/material/form-field";

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    LogoutComponent,
    AuthComponent,
    PhoneConfirmationComponent,
    UserTypeComponent,
  ],
  imports: [
    CommonModule,
    TranslationModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatRadioModule,
    InlineSVGModule,
    MatFormFieldModule
  ]
})
export class AuthModule {}
