import { environment } from './../../../../../../../environments/environment.prod';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpertInfoService {

  constructor(private http: HttpClient) { }

  saveContactInfo(entity) {
    this.http.post(`${environment.baseUrl}/user/contact-info/save`, entity).subscribe(
      (resp) => {
        console.log(resp);
        // this.presentToast();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  findByUserId(userId: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}/user/contact-info/find/by-user/` + userId);
  }


  savework(entity) {
    console.log(entity);
    
    return this.http.post(`${environment.baseUrl}/user/job-experience`, entity);
  }

  workfindByUserId(userId: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}/user/job-experience/find-all/by-user/` + userId);
  }

  deleteByIdwork(id: number): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/user/job-experience/delete/` + id);
  }

  saveSpecInfospec(entity) {
    this.http.post(`${environment.baseUrl}/user/spec-info/save`, entity)
        .subscribe(res=>{
        });
  }

  findByIdspec(userId: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}/user/spec-info/find/by-user/` + userId);
  }

  specgetAcceptingProvinces(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/core/base-info/find-all/by-parent-code/10`);
  }
  
  specgetAcceptingWorkScopes(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/core/base-info/find-all/by-parent-code/100`);
  }
  saveUserprofile(user: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/user/save`, user);
}

findByIdprofile(id: number): Observable<any> {
    // this.loader.presentLoadingCustom('در حال دریافت اطلاعات ...' , 15000);
    return this.http.get(`${environment.baseUrl}/user/` + id);
}

uploadImageprofile(image: any) {
    // const uploadData = new FormData();
    // uploadData.append();
    // this.loader.presentLoadingCustom('در حال بارگذاری تصویر ...' , 100000);
    let formData:FormData = new FormData();
    formData.append('file', image,"avatar"+ new Date());
    let myheaders = new HttpHeaders();
    /** In Angular 5, including the header Content-Type can invalidate your request */
    myheaders.append('Content-Type', 'multipart/form-data');
    myheaders.append('Accept', 'application/json');
    return this.http.post<any>(`${environment.baseUrl}/core/file/upload-file`, formData,{headers:myheaders});
}
}
