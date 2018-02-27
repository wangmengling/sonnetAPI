var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var caseSchema = new Schema({
  title:  String,
  username: String,
  time: String,
  style: String,
  color: String,
  address: String,
  thumbUrl: String,
  videoUrl: String
});
var CaseModel = mongoose.model('Case', caseSchema);
export default CaseModel;