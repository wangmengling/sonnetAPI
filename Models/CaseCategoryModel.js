var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var caseCategorySchema = new Schema({
  name:  String
});
var CaseCategoryModel = mongoose.model('CaseCategory', caseCategorySchema);
export default CaseCategoryModel;