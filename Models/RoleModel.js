var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var roleSchema = new Schema({
  name:  String
});
var RoleModel = mongoose.model('Role', roleSchema);
export default RoleModel;