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

export const questions =  new Array(10).fill(question);

export const questionsMidleware = (req, res, next) => {
    req.questions = questions;
    next();
}
export const questionMidleware = (req, res, next) => {
    const id = req.params.id;
    const q = questions.find(question => question._id === +id);
    req.question = q;//agrego al request la pregunta que coincide con el id
    next();
}