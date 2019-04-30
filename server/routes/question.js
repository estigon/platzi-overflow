import express from 'express';
import { 
    required,
    questionsMidleware,
    questionMidleware
 } from '../middleware';
const app = express.Router();

//esta ruta raiz es la definida en app.js /api/questions
app.get('/', questionsMidleware, (req, res) => {
    setTimeout(() => {
        res.status(200).json(req.questions);
    }, 3000);
    
});

// get /api/questions/:id
app.get('/:id', questionMidleware, (req, res) => {
    setTimeout(() => {
        res.status(200).json(req.question);
    },2000);
});

//Post /api/questions
app.post('/', required, questionsMidleware, (req, res) => {
    const nq = req.body;console.log(req);
    nq._id = +new Date();
    nq.user = req.user;
    nq.createdAt = new Date();
    nq.answers = [];

    req.questions.unshift(nq);
    res.status(200).send({'data':nq});
});

//agregar respuestas
app.post('/:id/answers', required, questionMidleware, (req, res) => {
    if(req.body){
        console.log(req.body);
        const newAnswer = req.body;
        const q = req.question;
        newAnswer.date = new Date();
        newAnswer.user = req.user;

        const myAnswer = {
            description: newAnswer.description,
            question: q._id,
            createdAt: newAnswer.date,
            user: newAnswer.user
        }
    
        q.answers.push(myAnswer);console.log(q);
        res.status(201).json(myAnswer);
    }
});

export default app;