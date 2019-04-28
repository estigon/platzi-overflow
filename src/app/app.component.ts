import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  title = 'platzi-overflow';

  constructor(
    private auth: AuthService,
    private router: Router
  ){}

  logOut(){
    this.auth.logOut();
    this.router.navigateByUrl('/signin');
  }
}
