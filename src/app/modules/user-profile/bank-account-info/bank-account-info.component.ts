import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService, UserModel} from "../../auth";
import {Observable, Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-bank-account-info',
  templateUrl: './bank-account-info.component.html',
  styleUrls: ['./bank-account-info.component.scss']
})
export class BankAccountInfoComponent implements OnInit, OnDestroy {

  user: UserModel;
  isLoading$: Observable<boolean>;
  formGroup: FormGroup;
  firstUserState: UserModel;
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

}
