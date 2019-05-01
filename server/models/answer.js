var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const answerSchema = new Schema({
    description: {type: String, required: true},
    createdAt: {type: Date, default: Date.now, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

export default mongoose.model('Answer', answerSchema);