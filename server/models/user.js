import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email: String,
    password: String

})

var User = mongoose.model('User', userSchema);

export default User;