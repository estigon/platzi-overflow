import express from 'express';
import { 
    required,
    questionsMidleware,
    questionMidleware
 } from '../middleware';
 import question from '../api-DB/question';
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
app.post('/', required, async (req, res) => {
    const { title, description, icon } = req.body;
    const nq = {
        title,
        description,
        icon,
        user: req.user._id
    }

    try { console.log('entro en el try', nq);
        const savedQuestion = await question.saveQuestion(nq);console.log("savedQuestion", savedQuestion);
        res.status(201).send({'data':savedQuestion});
    } catch (error) {
        res.status(401).json({
            message: "An error ocurred saving the question",
            error: error
        })
    }
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