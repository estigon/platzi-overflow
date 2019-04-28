import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent2',
  templateUrl: './parent2.component.html',
  styleUrls: ['./parent2.component.css']
})
export class Parent2Component implements OnInit {
	public card: any = {
		title: 'parent2',
		body: 'el cuerpo de parent2'
	};
  constructor() { }

  ngOnInit() {
  }

}
