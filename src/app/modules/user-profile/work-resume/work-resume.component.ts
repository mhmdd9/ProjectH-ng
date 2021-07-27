import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService, UserModel} from "../../auth";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-work-resume',
  templateUrl: './work-resume.component.html',
  styleUrls: ['./work-resume.component.scss']
})
export class WorkResumeComponent implements OnInit, OnDestroy {

  user: UserModel;
  formGroup: FormGroup;
  firstUserState: UserModel;
  isLoading$: Observable<boolean>;
  subscriptions: Subscription[] = [];

  constructor(private userService: AuthService, private fb: FormBuilder, private router: Router) {
    this.isLoading$ = this.userService.isLoadingSubject.asObservable();
  }

  ngOnInit(): void {
    const sb = this.userService.currentUserSubject.asObservable().pipe(
        first(user => !!user)
    ).subscribe(user => {
      this.user = Object.assign({}, user);
      this.firstUserState = Object.assign({}, user);
      this.loadForm();
    });
    this.subscriptions.push(sb);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  save() {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      return;
    }

    const formValues = this.formGroup.value;
    this.user = Object.assign(this.user, formValues);

    // Do request to your server for user update, we just imitate user update there
    this.userService.isLoadingSubject.next(true);
    setTimeout(() => {
      this.userService.currentUserSubject.next(Object.assign({}, this.user));
      this.userService.isLoadingSubject.next(false);
    }, 2000);

    if(this.router.url.includes('auth'))
      this.router.navigate(['/']);
  }

  cancel() {
    this.user = Object.assign({}, this.firstUserState);
    this.loadForm();
  }

  loadForm() {
    this.formGroup = this.fb.group({
      pic: [this.user.pic],
      firstname: [this.user.firstname, Validators.required],
      lastname: [this.user.lastname, Validators.required],
      companyName: [this.user.companyName, Validators.required],
      phone: [this.user.phone, Validators.required],
      email: [this.user.email, Validators.compose([Validators.required, Validators.email])],
      website: [this.user.website, Validators.required]
    });
  }

  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

}
