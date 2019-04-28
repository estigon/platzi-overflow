import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent1',
  templateUrl: './parent1.component.html',
  styleUrls: ['./parent1.component.css']
})
export class Parent1Component implements OnInit {
	public title: string;

  constructor() { this.title="hola soy titulo parent 1"}

  ngOnInit() {
  }

}
