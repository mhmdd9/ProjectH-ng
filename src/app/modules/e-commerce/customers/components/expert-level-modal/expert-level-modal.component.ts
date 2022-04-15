import { Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, delay, finalize, tap } from 'rxjs/operators';
import { CustomersService } from '../../../_services';

@Component({
  selector: 'expert-level-customers-modal',
  templateUrl: './expert-level-modal.component.html',
  styleUrls: ['./expert-level-modal.component.scss']
})
export class ExpertLevelModalComponent implements OnInit, OnDestroy {
  @Input() id: number;
  isLoading = false;
  subscriptions: Subscription[] = [];
  formGroup: FormGroup;
  constructor(private fb:FormBuilder, public customerService: CustomersService,private customersService: CustomersService, public modal: NgbActiveModal) { }

  ngOnInit(): void {
    this.formGroup= this.fb.group({
      level:['1']
    })
  }

  confirm(){
    this.customerService.submitLevel(this.id,this.formGroup.controls.level.value)
    .subscribe(res=>{
      console.log(res);
      this.modal.dismiss();
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
