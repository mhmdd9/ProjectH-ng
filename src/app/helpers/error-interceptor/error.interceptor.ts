import { Router } from '@angular/router';
import { AuthService } from './../../modules/auth/_services/auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthService,private router:Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            console.log(err.status);
            
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                this.router.navigate(['/']);
            }else if(err.status === 409){
                // this.showError("شماره وارد شده قبلا ثبت شده است");
            }else if(err.status === 500){
                // this.showError("سرور با خطا مواجه شده است لطفا مجددا تلاش نمایید");
            }
            else if(err.status === 417){
                // this.showError("کد وارد شده صحیح نمی باشد");
            }
            else if(err.status === 400){
                // this.showError("درخواست نامعتبر است");
            } else if(err.status === 0){
                // this.showError("خطا در ارتباط با سرور . لطفا اینترنت خود را بررسی نمایید");
            }

            return throwError(err);
        }));
    }
}
