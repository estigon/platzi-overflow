import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionModel } from './question-model';
import { QuestionsService } from '../../questions/questions.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit, OnDestroy {

  question: QuestionModel;
  subsManager: Subscription = new Subscription();
  sub1:any;
  sub2:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private questionsService: QuestionsService
  ) { }

  ngOnInit() {
    this.getQuestion();
  }

  getQuestion(){
    let id;
    this.sub1 = this.activatedRoute.params.subscribe(
      params =>{
        console.log(params.id);
        id = params.id;
      }
    );
    // this.questionsService.getQuestion(id).then(
    //   (result: any) => {
    //     this.question = result
    //   }).catch(err => console.log("error ", err));
   this.sub2 = this.questionsService.getQuestion(id).subscribe(
      result =>{
        console.log(result);
        this.question = result;
      },error => {
        console.log(<any>error);
      }
    );
console.log('sub1', this.sub1);
    this.subsManager.add(this.sub1);
    this.subsManager.add(this.sub2);
  }

  ngOnDestroy(){
    console.log('destruyendo subscripciones',this.subsManager);
    this.subsManager.unsubscribe();
    console.log(this.subsManager);
    console.log('sub1', this.sub1);
    console.log('sub2', this.sub2);
  }

}
