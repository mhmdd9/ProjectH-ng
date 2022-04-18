import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  NgbActiveModal,
  NgbDateAdapter,
  NgbDateParserFormatter,
} from "@ng-bootstrap/ng-bootstrap";
import { of, Subscription } from "rxjs";
import { catchError, finalize, first, tap } from "rxjs/operators";
import { Customer } from "../../../_models/customer.model";
import { CustomersService } from "../../../_services";
import {
  CustomAdapter,
  CustomDateParserFormatter,
  getDateFromString,
} from "../../../../../_metronic/core";
import { E } from "@angular/cdk/keycodes";

const EMPTY_CUSTOMER: Customer = {
  id: undefined,
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  gender: "Female",
  yearOfBirth: "",
  placeOfBirth: "",
  nationalCode: "",
  isActive: false,
  confirmationStatus: "",
  dateCreated: "",
  imageUrl: "",
  username: "",
  status: 0,
};
interface Select {
  id: number;
  title: string;
}

@Component({
  selector: "app-expert-info-modal",
  templateUrl: "./expert-info-modal.component.html",
  styleUrls: ["./expert-info-modal.component.scss"],
  // NOTE: For this example we are only providing current component, but probably
  // NOTE: you will w  ant to provide your main App Module
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class ExpertInfoModalComponent implements OnInit, OnDestroy {
  @Input() id: number;
  isLoading$;
  imgurl:string='';
  customer: any;
  formGroup: FormGroup;
  formGroup2: FormGroup;
  formGroup3: FormGroup;
  formGroup4: FormGroup;
  formGroup5: FormGroup;
  licenseTypes = [
    { title: "کانون وکلا ", value: "kanoonVokala" },
    { title: "قوه قضائیه", value: "ghoveGhazaeyie" },
  ];
  exGrades = [
    { title: "پایه یک ", value: "firstGrade" },
    { title: "کارآموز", value: "intern" },
  ];
  acceptingCasesTypes = [
    { title: "حقوقی ", value: "legal" },
    { title: "جنایی", value: "criminal" },
    { title: "هر دو", value: "both" },
  ];
  grades = [
    { title: "کارشناسی ", value: "bachelor" },
    { title: "کارشناسی ارشد", value: "master" },
    { title: "دکترا", value: "phd" },
  ];
  activeTabId = 1;
  acceptingProvincesList:Select[]=null;
  acceptingWorkScopesList:Select[]=null;
  educInfos:any=null;
  workResumes:any=null;
  private subscriptions: Subscription[] = [];
  constructor(
    private customersService: CustomersService,
    private fb: FormBuilder,
    public modal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.customersService.isLoading$;
    // this.getProvinces()
    this.loadCustomer();
  }

  loadCustomer() {
    if (!this.id) {
      this.customer = null;
      this.loadForm();
    } else {
      const sb = this.customersService
        .getItemById(this.id)
        .pipe(
          first(),
          catchError((errorMessage) => {
            this.modal.dismiss(errorMessage);
            return of(EMPTY_CUSTOMER);
          })
        )
        .subscribe((customer: any) => {
          console.log(customer);
          
          this.customer = customer;
          this.educInfos = customer['eduDegrees'];
          this.workResumes = customer['jobExperiences'];
          this.loadForm();
        });
      this.subscriptions.push(sb);
    }
  }

  confirmExpert() {}

  loadForm() {
    this.formGroup = this.fb.group({
      firstName: [{ value: this.customer.contactInfo.user.firstName, disabled: true }],
      lastName: [{ value: this.customer.contactInfo.user.lastName, disabled: true }],
      nationalCode: [{ value: this.customer.contactInfo.user.nationalCode, disabled: true }],
      placeOfBirth: [{ value: this.customer.contactInfo.user.placeOfBirth, disabled: true }],
      yearOfBirth: [{ value: this.customer.contactInfo.user.yearOfBirth, disabled: true }],
      phoneNumber: [{ value: this.customer.contactInfo.user.phoneNumber, disabled: true }],
      gender: [{ value: this.customer.contactInfo.user.gender, disabled: true }],
      imageUrl: [{ value: this.customer.contactInfo.user.imageUrl, disabled: true }],
    });
    this.formGroup2 = this.fb.group({
      province: [{ value: this.customer.contactInfo.province, disabled: true }],
      city: [{ value: this.customer.contactInfo.city, disabled: true }],
      homeAddress: [{ value: this.customer.contactInfo.homeAddress, disabled: true }],
      homePostalCode: [{ value: this.customer.contactInfo.homePostalCode, disabled: true }],
      homePhone: [{ value: this.customer.contactInfo.homePhone, disabled: true }],
      workAddress: [{ value: this.customer.contactInfo.workAddress, disabled: true }],
      workPostalCode: [{ value: this.customer.contactInfo.workPostalCode, disabled: true }],
      workPhone: [{ value: this.customer.contactInfo.workPhone, disabled: true }],
      email: [{ value: this.customer.contactInfo.email, disabled: true }],
      id: [{ value: this.customer.contactInfo.id, disabled: true }],
      website: [{ value: this.customer.contactInfo.website, disabled: true }],
    });
    this.formGroup3 = this.fb.group({
      licenseNo: [{ value: this.customer.specInfo.licenseNo, disabled: true }],
      licenseType: [{ value: this.customer.specInfo.licenseType, disabled: true }],
      grade: [{ value: this.customer.specInfo.grade, disabled: true }],
      level: [{ value: this.customer.specInfo.level, disabled: true }],
      acceptingCasesType: [{ value: this.customer.specInfo.acceptingCasesType, disabled: true }],
      acceptingProvinces: [{ value:this.getAcceptingProvinces(this.customer.specInfo.acceptingProvinces), disabled: true }],
      acceptingWorkScopes: [{ value: this.getAcceptingWorkScopes(this.customer.specInfo.acceptingWorkScopes), disabled: true }],
    });
    this.formGroup4 = this.fb.group({
      eduGrade: [{ value: '', disabled: true }],
      endYear: [{ value: '', disabled: true }],
      fieldOfStudy: [{ value: '', disabled: true }],
      isStudying: [{ value: '', disabled: true }],
      startingYear: [{ value:'', disabled: true }],
      universityName: [{ value: '', disabled: true }],
    });
    this.formGroup5 = this.fb.group({
      instituteName: [{ value: '', disabled: true }],
      jobPosition: [{ value: '', disabled: true }],
      startingYear: [{ value: '', disabled: true }],
      endYear: [{ value: '', disabled: true }],
      working: [{ value: '', disabled: true }],
    });
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
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  setEduForm(customer){
    this.formGroup4.setValue({
      eduGrade: customer.grade,
      endYear: customer.endYear,
      fieldOfStudy: customer.fieldOfStudy,
      isStudying: customer.studying,
      startingYear: customer.startingYear,
      universityName:customer.universityName
    });
    this.imgurl=customer.fileUrl;
  }
  setWorkForm(work){
    console.log(work);
    
    this.formGroup5.setValue({
      instituteName: work.instituteName,
      jobPosition: work.jobPosition,
      startingYear: work.startingYear,
      endYear: work.endYear,
      working: work.working,
    });
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
      return "";
    }

    return "active";
  }


  getAcceptingProvinces(list):Select[]{
    var x:Select[] = [];
    list.forEach(element => {
      x.push({
        id:element.id,title:element.title
      });
    });
    this.acceptingProvincesList =x;
    return x;
  }

  getAcceptingWorkScopes(list):Select[]{
    var x:Select[] = [];
    list.forEach(element => {
      x.push({
        id:element.id,title:element.title
      });
    });
    this.acceptingWorkScopesList =x;
    return x;
  }
  
}
