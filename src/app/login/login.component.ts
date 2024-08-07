import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  isLoading:boolean=false
  apiError:string=''

  constructor(private _AuthService:AuthService,private _Router:Router){}

  ngOnInit(): void {
    if(localStorage.getItem('userToken') !== null){
      this._Router.navigate(['/home'])
    }
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{7,15}$/)]),
  });



  handleLogin(loginForm:FormGroup){
    this.isLoading=true
    if(loginForm.valid){
      this._AuthService.login(loginForm.value).subscribe({
        next:(response)=> {
          if(response.message==='success'){
            localStorage.setItem('userToken',response.token)
            this._AuthService.decodeUserData()     
            this.isLoading=false
            this._Router.navigate(['/home'])
          }
        },
        error:(err)=>{          
          this.isLoading=false
          this.apiError=err.error.errors.msg
        }
      })
    }
  }
}
