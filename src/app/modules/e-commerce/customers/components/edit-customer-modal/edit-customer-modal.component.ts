import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, finalize, first, tap } from 'rxjs/operators';
import { Customer } from '../../../_models/customer.model';
import { CustomersService } from '../../../_services';
import { CustomAdapter, CustomDateParserFormatter, getDateFromString } from '../../../../../_metronic/core';

const EMPTY_CUSTOMER: Customer = {
  id: undefined,
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  gender: 'Female',
  yearOfBirth: '',
  placeOfBirth: '',
  nationalCode: '',
  isActive: false,
  confirmationStatus: '',
  dateCreated:'',
  imageUrl:'',
  username: '',
  status:0
};

@Component({
  selector: 'app-edit-customer-modal',
  templateUrl: './edit-customer-modal.component.html',
  styleUrls: ['./edit-customer-modal.component.scss'],
  // NOTE: For this example we are only providing current component, but probably
  // NOTE: you will w  ant to provide your main App Module
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class EditCustomerModalComponent implements OnInit, OnDestroy {
  @Input() id: number;
  isLoading$;
  customer: Customer;
  formGroup: FormGroup;
  formGroup2: FormGroup;
  formGroup3: FormGroup;
  formGroup4: FormGroup;
  formGroup5: FormGroup;
  licenseTypes = [
    { title: "کانون وکلا ", value: 'kanoonVokala' },
    { title: "قوه قضائیه", value: 'ghoveGhazaeyie'},
  ];
  exGrades = [
    { title: "پایه یک ", value: 'firstGrade' },
    { title: "کارآموز", value: 'intern' },
  ];
  acceptingCasesTypes= [
    { title: "حقوقی ", value: 'legal' },
    { title: "جنایی", value: 'criminal' },
    { title: "هر دو", value: 'both' },
  ];
  grades = [
    {title: 'کارشناسی ', value: 'bachelor'},
    {title: 'کارشناسی ارشد', value: 'master'},
    {title: 'دکترا', value: 'phd'},
];
  activeTabId = 1;
  private subscriptions: Subscription[] = [];
  constructor(
    private customersService: CustomersService,
    private fb: FormBuilder, public modal: NgbActiveModal
    ) { }

  ngOnInit(): void {
    this.isLoading$ = this.customersService.isLoading$;
    this.loadCustomer();
  }

  loadCustomer() {
    if (!this.id) {
      this.customer = EMPTY_CUSTOMER;
      this.loadForm();
    } else {
      const sb = this.customersService.getItemById(this.id).pipe(
        first(),
        catchError((errorMessage) => {
          this.modal.dismiss(errorMessage);
          return of(EMPTY_CUSTOMER);
        })
      ).subscribe((customer: Customer) => {
        this.customer = customer;
        this.loadForm();
      });
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      firstName: [{value:this.customer.firstName, disabled: true}],
      lastName: [{value:this.customer.lastName, disabled: true}],
      nationalCode: [{value:this.customer.email, disabled: true}],
      placeOfBirth: [{value:this.customer.email, disabled: true}],
      yearOfBirth: [{value:this.customer.yearOfBirth, disabled: true}],
      phoneNumber: [{value:this.customer.phoneNumber, disabled: true}],
      gender: [{value:this.customer.gender, disabled: true}],
      imageUrl: [{value:this.customer.phoneNumber, disabled: true}]
    });
    this.formGroup2 = this.fb.group({
      province: [{value:this.customer.firstName, disabled: true}],
      city: [{value:this.customer.lastName, disabled: true}],
      homeAddress: [{value:this.customer.email, disabled: true}],
      homePostalCode: [{value:this.customer.yearOfBirth, disabled: true}],
      homePhone: [{value:this.customer.phoneNumber, disabled: true}],
      workAddress: [{value:this.customer.gender, disabled: true}],
      workPostalCode: [{value:this.customer.phoneNumber, disabled: true}],
      workPhone: [{value:this.customer.phoneNumber, disabled: true}],
      email: [{value:this.customer.phoneNumber, disabled: true}],
      id: [{value:this.customer.phoneNumber, disabled: true}],
      website: [{value:this.customer.phoneNumber, disabled: true}]
    });
    this.formGroup3 = this.fb.group({
      licenseNo: [{value:this.customer.firstName, disabled: true}],
      licenseType: [{value:this.customer.lastName, disabled: true}],
      grade: [{value:this.customer.email, disabled: true}],
      acceptingCasesType: [{value:this.customer.yearOfBirth, disabled: true}],
      acceptingProvinces: [{value:this.customer.phoneNumber, disabled: true}],
      acceptingWorkScopes: [{value:this.customer.gender, disabled: true}],
    });
    this.formGroup4 = this.fb.group({
      eduGrade: [{value:this.customer.firstName, disabled: true}],
      endYear: [{value:this.customer.lastName, disabled: true}],
      fieldOfStudy: [{value:this.customer.email, disabled: true}],
      isStudying: [{value:this.customer.yearOfBirth, disabled: true}],
      startingYear: [{value:this.customer.phoneNumber, disabled: true}],
      universityName: [{value:this.customer.gender, disabled: true}]
    });
    this.formGroup5 = this.fb.group({
      instituteName: [{value:this.customer.firstName, disabled: true}],
      jobPosition: [{value:this.customer.lastName, disabled: true}],
      startingYear: [{value:this.customer.email, disabled: true}],
      endYear: [{value:this.customer.yearOfBirth, disabled: true}],
      working: [{value:this.customer.phoneNumber, disabled: true}]
    });
  }

  save() {
    this.prepareCustomer();
    if (this.customer.id) {
      this.edit();
    } else {
      this.create();
    }
  }

  edit() {
    const sbUpdate = this.customersService.update(this.customer).pipe(
      tap(() => {
        this.modal.close();
      }),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(this.customer);
      }),
    ).subscribe(res => this.customer = res);
    this.subscriptions.push(sbUpdate);
  }

  create() {
    const sbCreate = this.customersService.create(this.customer).pipe(
      tap(() => {
        this.modal.close();
      }),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(this.customer);
      }),
    ).subscribe((res: Customer) => this.customer = res);
    this.subscriptions.push(sbCreate);
  }

  private prepareCustomer() {
    const formData = this.formGroup.value;
    this.customer.dateCreated = new Date(formData.dob).toString();
    this.customer.email = formData.email;
    this.customer.firstName = formData.firstName;
    this.customer.yearOfBirth = formData.dob;
    this.customer.phoneNumber = formData.ipAddress;
    this.customer.lastName = formData.lastName;
    this.customer.status = +formData.type;
    this.customer.nationalCode = formData.userName;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }

  setActiveTab(tabId: number) {
    this.activeTabId = tabId;
  }

  getActiveTabCSSClass(tabId: number) {
    if (tabId !== this.activeTabId) {
      return '';
    }

    return 'active';
  }
}
