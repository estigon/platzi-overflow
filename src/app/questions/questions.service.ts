import { Injectable } from '@angular/core';
import { QuestionModel } from './question-detail/question-model';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';

const headers: HttpHeaders = new HttpHeaders({'Content-Type':'application/json'});

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private urlBase: any;

  constructor(private httpClient: HttpClient) { 
    this.urlBase = environment.apiUrl;
  }

  getQuestions():Observable<any>{
    return this.httpClient.get(this.urlBase+'/questions');
  }

  getQuestion(id:number):Observable<any>{
    return this.httpClient.get(this.urlBase+'/questions/'+id);
  }

  pushQuestion(data:any):Observable<any>{
    return this.httpClient.post(this.urlBase+'/questions/', data, {headers});
  }

  addAnswers(data:any):Observable<any>{
    const id = data.question._id;
    const answer = {
        description: data.description
    }

    console.log("data before send",answer);
    return this.httpClient.post(this.urlBase+'/questions/'+id+'/answers', answer, {headers});
  }

}
