import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from './user-model';
import { AuthService } from '../auth.service';
import { LocalService } from '../local.service'
import { logging } from 'protractor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-screen',
  templateUrl: './signin-screen.component.html',
  styleUrls: ['./signin-screen.component.css']
})
export class SigninScreenComponent implements OnInit {
	public signinForm: FormGroup;

  constructor(
		private authService: AuthService,
		private localService: LocalService,
		private router: Router
	) { }

  ngOnInit() {
  	this.signinForm = new FormGroup({
  		email: new FormControl(null, [Validators.required,Validators.email] ),
  		password: new FormControl(null, [Validators.required,Validators.minLength(6),Validators.maxLength(8)] )
  	});
  }

  onSubmit(){
  	if(this.signinForm.valid){
  		const {email, password} = this.signinForm.value;
  		const user = new User(email, password);
			console.log(user);
			this.authService.signin(user).subscribe(
				result => {
					this.login(result);
					console.log(result);
				},error => {
					console.log(error);
				}
			);
			
  	}
	}
	
	login(data){
		this.localService.setData("email", data.email);
		this.localService.setData("token", data.token);
		this.localService.setData("userId", data.userId);
		this.router.navigateByUrl('/');
	}

}
