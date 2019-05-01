import { question } from '../api-DB';

export const questionsMidleware = async (req, res, next) => {
    try {
        const questions = await question.findAll();
        req.questions = questions;
    } catch (error) {
        res.status(401).json({
            message: "An error ocurred",
            error: error
        });
    }
    next();
}
export const questionMidleware = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const myQuestion = await question.findById(_id);
        req.question = myQuestion;
    } catch (error) {
        res.status(401).json({
            message: "An error ocurred",
            error: error
        });
    }
    next();
}