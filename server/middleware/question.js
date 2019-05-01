import { question } from '../api-DB';
import { restoreView } from '@angular/core/src/render3';

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
        console.log("params", req.params);
        const id = req.params.id;
        const question = await question.findById(id);
        req.question = question;
    } catch (error) {
        res.status(401).json({
            message: "An error ocurred",
            error: error
        });
    }
    next();
}