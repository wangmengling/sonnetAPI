var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var styleSchema = new Schema({
  name:  String
});
var StyleModel = mongoose.model('Style', styleSchema);
export default StyleModel;