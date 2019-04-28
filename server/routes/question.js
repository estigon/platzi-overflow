import express from 'express';
const app = express.Router();


const currentUser =  {
    firstName: 'Elys',
    lastName:'Gonzalez',
    email: 'elysestiben@gmail.com',
    password: '1234567'
}

const question = {
    _id: 1,
    title: 'Como reutilizo un componente en android?',
    description: 'Miren esta es mi pregunta...',
    createdAt: new Date(),
    icon: 'devicon-android-plain',
    answers: [],
    user: currentUser
}

const questions =  new Array(10).fill(question);

function questionMidleware(req, res, next) {
    const id = req.params.id;
    const q = questions.find(question => question._id === +id);
    req.question = q;//agrego al request la pregunta que coincide con el id
    next();
}

function userMidleware(req, res, next) {
    req.user = currentUser;
    next();
}

//esta ruta raiz es la definida en app.js /api/questions
app.get('/', (req, res) => {
    setTimeout(() => {
        res.status(200).json(questions);
    }, 3000);
    
});

// get /api/questions/:id
app.get('/:id', questionMidleware, (req, res) => {
    setTimeout(() => {
        res.status(200).json(req.question);
    },2000);
});

//Post /api/questions
app.post('/', userMidleware, (req, res) => {
    const nq = req.body;
    nq._id = +new Date();
    nq.user = req.user;
    nq.createdAt = new Date();
    nq.answers = [];

    questions.unshift(nq);
    res.status(200).send({'data':nq});
});

//agregar respuestas

app.post('/:id/answers', questionMidleware, userMidleware , (req, res) => {
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