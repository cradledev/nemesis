import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  public loader: any;
  private BASE_URL:any = "https://nem-node-server.herokuapp.com";
  constructor(public http:HttpClient) {
  }

  public invokeGet(path) {
    return this.http.get(`${this.BASE_URL}${path}`).toPromise();
  }

  public postRequest(path, obj?) {
    return this.http.post(`${this.BASE_URL}${path}`, obj).toPromise();
  }


 
}
