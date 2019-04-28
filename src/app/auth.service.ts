import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from './signin-screen/user-model';
import urljoin from 'url-join';
import { LocalService } from './local.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usersUrl: string;

  constructor(
    private http : HttpClient,
    private localService: LocalService
  ) {
    this.usersUrl = urljoin( environment.apiUrl, 'auth');
  }

  signin(user: User){
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post( urljoin(this.usersUrl, 'signin'), body, { headers });
  }

  isLoggedIn(): boolean {
    return this.localService.getData("token") !== null;
  }

  logOut(){
    this.localService.clearData();
    console.log("borrado el token del local storage");
  }
}
