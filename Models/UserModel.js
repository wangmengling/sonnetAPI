var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
  username:  String,
  password: String,
  email:   String,
  phone:   String,
  token:   String
});
var UserModel = mongoose.model('User', userSchema);
export default UserModel;