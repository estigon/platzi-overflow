import Debug from 'debug';
import { Question } from '../models'

const debug = new Debug("platzi-overflow:api:questions");

export default {
    findAll: async () => {
        debug('finding all questions');
        return await Question.find().populate('answers');
    },

    findById: async (_id) => {
        debug(`finingd question with id ${ _id }`);
        return await Question.findOne({ _id })
            .populate('user')
            .populate({
                path: 'answers',
                options: { sort: '-createdAt'},
                populate: {
                    path: 'user',
                    models: 'User'
                }
            })
    }
}