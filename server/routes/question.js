import express from 'express';
import { 
    required,
    questionsMidleware,
    questionMidleware
 } from '../middleware';
 import question from '../api-DB/question';
import { Question, Answer } from '../models';
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
        const savedQuestion = await question.saveQuestion(nq);
        console.log("savedQuestion", savedQuestion);
        res.status(201).send({'data':savedQuestion});
    } catch (error) {
        res.status(401).json({
            message: "An error ocurred saving the question",
            error: error
        })
    }
});

//agregar respuestas
app.post('/:id/answers', required, questionMidleware, (req, res, next) => {
    if(req.body){
        console.log(req.body);
        const newAnswer = req.body;
        const q = req.question;
        newAnswer.date = new Date();
        newAnswer.user = req.user;

        const myAnswer = {
            description: newAnswer.description,
            createdAt: newAnswer.date,
            user: newAnswer.user
        }

        Answer.create(myAnswer, (err, answ) => {
            if (err){
               return res.status(401).json({error: "no se pudo crear la respuesta"});
            }else{
                Answer.findOne({"_id": answ._id}, (err, dbansw) => {
                    if (err){
                        return res.status(401).json({error: "no existe la respuesta"});
                     }else{
                        Question.findByIdAndUpdate( {"_id": q._id}, { $push: { answers: dbansw } }, (err, resp) =>{
                            if (err){
                            return res.status(401).json({error: "No se pudo asignar la respuesta a esta pregunta"});
                            } 
                            if( resp && resp != undefined && resp != null ){
                                console.log(resp);
                                q.answers.push(myAnswer);console.log(dbansw);
                                res.status(201).json(dbansw);
                            }
                        });
                    }
                }).populate('user');
            } 
        });
    }
});

export default app;