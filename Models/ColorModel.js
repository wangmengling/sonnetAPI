var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var colorSchema = new Schema({
  name:  String
});
var ColorModel = mongoose.model('Color', colorSchema);
export default ColorModel;