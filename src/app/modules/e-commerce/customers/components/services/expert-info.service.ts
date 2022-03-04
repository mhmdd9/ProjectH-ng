import { environment } from '../../../../../../environments/environment.prod';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpertInfoService {

  constructor(private http: HttpClient) { }

  getExperts(){
    return this.http.get(`${environment.baseUrl}/user/experts/find-all/`);
  }

  findByUserId(userId: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}/user/contact-info/find/by-user/` + userId);
  }
  confirmExpert(confirmationData){
    return this.http.post(`${environment.baseUrl}/user/experts/confirmation`, confirmationData);
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

}
