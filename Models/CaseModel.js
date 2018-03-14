var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var caseSchema = new Schema({
  title:  String,
  username: String,
  contact: String,
  phone: String,
  time: String,
  style: String,
  color: String,
  address: String,
  position: String, //室内室外   方位
  thumbUrl: String,
  videoUrl: String,
  createTime:String,
  imageUrl:[[]]
});
var CaseModel = mongoose.model('Case', caseSchema);
export default CaseModel;