import { Injectable } from '@angular/core';
import { QuestionModel } from './question-detail/question-model';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { LocalService } from '../local.service';


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private urlBase: any;
  private headers: HttpHeaders;

  constructor(
    private httpClient: HttpClient,
    private localService: LocalService
    ) { 
    this.urlBase = environment.apiUrl;
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Authorization', 'Bearer '+this.localService.getData("token"));

  }

  getQuestions():Observable<any>{
    return this.httpClient.get(this.urlBase+'/questions');
  }

  getQuestion(id:number):Observable<any>{
    return this.httpClient.get(this.urlBase+'/questions/'+id);
  }

  pushQuestion(data:any):Observable<any>{
    const headers = this.headers;console.log({headers});
    return this.httpClient.post(this.urlBase+'/questions/', data, {headers});
  }

  addAnswers(data:any):Observable<any>{
    const headers = this.headers;
    const id = data.question._id;
    const answer = {
        description: data.description
    }

    console.log("data before send",answer);
    return this.httpClient.post(this.urlBase+'/questions/'+id+'/answers', answer, {headers});
  }

}
