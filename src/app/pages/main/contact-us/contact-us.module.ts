import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './contact-us.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: ContactUsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactUsRoutingModule { }



@NgModule({
  declarations: [ContactUsComponent],
  imports: [
    CommonModule,ContactUsRoutingModule
  ]
})
export class ContactUsModule { }
