import { Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, delay, finalize, tap } from 'rxjs/operators';
import { CustomersService } from '../../../_services';

@Component({
  selector: 'confirm-expert-customers-modal',
  templateUrl: './confirm-expert-modal.component.html',
  styleUrls: ['./confirm-expert-modal.component.scss']
})
export class ConfirmExpertModalComponent implements OnInit, OnDestroy {
  @Input() id: number;
  isLoading = false;
  subscriptions: Subscription[] = [];
  formGroup: FormGroup;
  constructor(private fb:FormBuilder, public customerService: CustomersService,private customersService: CustomersService, public modal: NgbActiveModal) { }

  ngOnInit(): void {
    this.formGroup= this.fb.group({
      reason:['',Validators.required]
    })
  }

  confirm(){
    this.customerService.confirmExpert({
      confirmed:"notConfirmed",
      expertId:this.id,
      operatorId:null,
      reason:this.formGroup.controls.reason.value
    }).subscribe(res=>{
      console.log(res);
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
