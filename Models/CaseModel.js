var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var caseSchema = new Schema({
  name:  String,
  username: String,
  time: String,
  style: String,
  color: String,
  address: String
});
var CaseModel = mongoose.model('Case', caseSchema);
export default CaseModel;