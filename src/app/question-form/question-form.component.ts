import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuestionModel } from '../questions/question-detail/question-model';
import {default as icons} from './icons';
import { QuestionsService } from '../questions/questions.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit, OnDestroy {
	icons: Object[] = icons;
	private sub: Subscription;

  constructor(
		private questionService: QuestionsService,
		private authService: AuthService
	) { }

  ngOnInit() {
  }

  getIconVersion(icon:any){
  	let version;
  	if(icon.versions.font.includes('plain-wordmark')){
  		version = 'plain-wordmark';
  	}else{
  		version = icon.versions.font[0];
  	}
  	if(icon.name=='illustrator'){
      version = icon.versions.svg[1];
    }
  	return version;
	}

	postQuestion(question:any){
		this.sub = this.questionService.pushQuestion(question).subscribe(
			result => {
				console.log(result);
			}, error => {
				console.log(<any>error);
				this.authService.handleError(error.error.error)
			}
		);
	}
	
	onSubmit(form: NgForm){
  	const q = new QuestionModel(
  			form.value.title,
  			form.value.description,
				new Date(),
				form.value.icon
  		);
		console.log(q);
		this.postQuestion(q);
	}
	
	ngOnDestroy(){
	if( this.sub != undefined || this.sub != null )
		this.sub.unsubscribe();
	}
}
