import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Parent1Component } from './parent1/parent1.component';
import { Parent2Component } from './parent2/parent2.component';
import { ChildComponent } from './child/child.component';
import { SigninScreenComponent } from './signin-screen/signin-screen.component';
import { SignupScreenComponent } from './signup-screen/signup-screen.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { QUESTION_ROUTES } from './questions/questions-routing';

const routes: Routes = [
	{path:'', component: QuestionListComponent, pathMatch: 'full'},
  {path:'signin', component: SigninScreenComponent},
  {path:'signup', component: SignupScreenComponent},
  {path:'questions', children: QUESTION_ROUTES},
	{path:'parent1', component: Parent1Component},
	{path:'parent2', component: Parent2Component},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
