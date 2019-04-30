import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { User } from './../signin-screen/user-model';
import { AuthService } from '../auth.service';
import { LocalService } from '../local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-screen',
  templateUrl: './signup-screen.component.html',
  styleUrls: ['./signup-screen.component.css']
})
export class SignupScreenComponent implements OnInit {

	private signupForm: FormGroup;

  constructor(
		private auth: AuthService,
		private localService: LocalService,
		private router: Router
	) { }

  ngOnInit() {
  	this.signupForm = new FormGroup({
  	  		email: new FormControl(null, [Validators.required, Validators.email]),
  	  		password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(8)]),
  	  		firstname: new FormControl(null, [Validators.required]),
  	  		lastname: new FormControl(null, [Validators.required])
  	});
  }

  onSubmit(){
  	if(this.signupForm.valid){
  		const {email, password, firstname, lastname} = this.signupForm.value;
  		const user = new User(email, password, firstname, lastname);
			console.log(user);
			this.auth.signup( user ).subscribe(
				result => {
					this.login(result)
				}, error => {
					console.log(error);
					this.auth.handleError(error.error.error);
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
