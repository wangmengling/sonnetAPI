const router = require('koa-router')()
const User  = require( "./User");
import Role from "./Role";
import CaseCategory from "./CaseCategory";
import Style from "./Style";
import Color from "./Color";
import Case from "./Case";
router.prefix('/admin/api/v1')

User(router);
Role(router);
CaseCategory(router);
Style(router);
Color(router);
Case(router);

module.exports = router