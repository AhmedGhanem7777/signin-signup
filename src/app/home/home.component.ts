import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  name: string = 'ahmed';

  constructor(private _AuthService:AuthService){}

  logOut(){
    this._AuthService.logOut()
  }
}
