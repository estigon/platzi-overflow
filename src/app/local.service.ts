import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  setData(key, data){
    localStorage.setItem(key, data);
  }

  getData(key){
    return localStorage.getItem(key);
  }

  clearData(){
    localStorage.clear();
  }
}
