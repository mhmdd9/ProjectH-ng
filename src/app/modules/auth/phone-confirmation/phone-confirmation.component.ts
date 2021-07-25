import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {AuthService, UserModel} from "..";
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-phone-confirmation',
  templateUrl: './phone-confirmation.component.html',
  styleUrls: ['./phone-confirmation.component.scss']
})
export class PhoneConfirmationComponent implements OnInit {

  defaultAuth: any = {
    email: 'admin@demo.com',
    password: 'demo1234',
  };
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;

  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    /*if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }*/
  }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl =
        this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      password: [
        this.defaultAuth.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  submit() {
    this.hasError = false;
    const loginSubscr = this.authService
        .login(this.defaultAuth.email, this.defaultAuth.password)
        .pipe(first())
        .subscribe((user: UserModel) => {
          if (user) {
            this.router.navigate(['/auth/registration/user-type']);
          } else {
            this.hasError = true;
          }
        });
    this.unsubscribe.push(loginSubscr);
  }
}
