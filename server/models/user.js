var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// var uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
    email: {type: String, required: true, unique: true, index: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
});

// userSchema.plugin(uniqueValidator);

export default mongoose.model('User', userSchema);