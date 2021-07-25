import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {first} from "rxjs/operators";
import {UserModel} from "../..";

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.scss']
})
export class UserTypeComponent implements OnInit {

  isLoading$: Observable<boolean>;

  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    return;
  }
}
