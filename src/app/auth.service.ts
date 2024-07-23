import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit{
  userData=null
  baseUrl: string = `https://ecommerce.routemisr.com/api/v1/auth/`;
  constructor(private _HttpClient: HttpClient,private _Router:Router) {}

  ngOnInit(): void {
    if(localStorage.getItem('userToken') !== null){
      this.decodeUserData()
    }
  }

  register(userData: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + 'signup', userData);
  }

  login(userData: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + 'signin', userData);
  }

  decodeUserData(){
    let encodedToken = localStorage.getItem('userToken')
    if(encodedToken !== null){
      let decodedToken:any = jwtDecode(encodedToken)
      this.userData=decodedToken
    }
  }

  logOut(){
    localStorage.removeItem('userToken')
    this.userData=null
    this._Router.navigate(['/login'])
  }
}
