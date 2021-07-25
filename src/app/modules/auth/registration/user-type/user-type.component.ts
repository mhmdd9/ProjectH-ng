import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "../..";

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.scss']
})
export class UserTypeComponent implements OnInit {

  isLoading$: Observable<boolean>;

  constructor(private router: Router,
              private authService: AuthService) {
    this.isLoading$ = this.authService.isLoading$;
  }

  ngOnInit(): void {
  }

  submit() {
    this.router.navigate(['/auth/personal-information']);
  }
}
