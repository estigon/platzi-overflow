import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionModel } from './../questions/question-detail/question-model';
import { QuestionsService } from './../questions/questions.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit, OnDestroy {
  questions: any;
  subscription: Subscription;
  loading: boolean;

  constructor(
    private questionsService: QuestionsService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.getQuestions();
  }

  getQuestions(){
          this.subscription = this.questionsService.getQuestions().subscribe(
            result =>{
              console.log(result);
              this.questions = result;
              this.loading = false;
            }, error=>{
              console.log(<any>error);
            }
          );
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
