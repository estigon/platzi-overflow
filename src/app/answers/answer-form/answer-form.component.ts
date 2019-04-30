import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgForm } from'@angular/forms';
import { QuestionModel } from 'src/app/questions/question-detail/question-model';
import { AnswerModel } from './answer-model';
import { User } from 'src/app/signin-screen/user-model';
import { QuestionsService } from '../../questions/questions.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.css']
})
export class AnswerFormComponent implements OnInit, OnDestroy {

  @Input() question: QuestionModel;
  private sub: Subscription;

  constructor(
    private service: QuestionsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(){
  }

  onSubmit(form: NgForm){
    if( this.authService.isLoggedIn() ){
      const answer = new AnswerModel(
        form.value.description,
        this.question
      );
      console.log("respuesta ",answer);
      this.sub = this.service.addAnswers(answer).subscribe(
        result => {
          console.log("my result ",result);
          this.question.answers.unshift(result);
        },error => {
          console.log(<any>error);
          this.authService.handleError(error.error.error);
        }
     );
      form.reset();
    }else {
      this.router.navigateByUrl('/signin')
    }
  }

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }
}
