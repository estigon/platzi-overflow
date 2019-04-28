import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { QuestionListComponent } from './../question-list/question-list.component';
import { QuestionFormComponent } from './../question-form/question-form.component';

export const QUESTION_ROUTES = [
    {path:'', component: QuestionListComponent},
    {path:'new-question', component: QuestionFormComponent},
    {path:':id', component: QuestionDetailComponent},
];
