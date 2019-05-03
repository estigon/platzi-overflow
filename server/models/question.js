var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const questionSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    icon: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    answers: [{type: Schema.Types.ObjectId, ref: 'Answer', default: []}]
    
});

export default mongoose.model('Question', questionSchema);