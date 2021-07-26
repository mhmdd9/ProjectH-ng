import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-spec-info',
  templateUrl: './spec-info.component.html',
  styleUrls: ['./spec-info.component.scss']
})
export class SpecInfoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  submit() {
    this.router.navigate(['/']);
  }
}
