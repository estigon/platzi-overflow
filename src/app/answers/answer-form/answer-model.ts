import { QuestionModel } from 'src/app/questions/question-detail/question-model';
import { User } from 'src/app/signin-screen/user-model';


export class AnswerModel {
    constructor(
        public description: string,
        public question: QuestionModel,
        public createdAt?: Date,
        public user?: User
    ){}
}