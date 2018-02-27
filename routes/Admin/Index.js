// upload
import upload from "../../untils/Upload";
const router = require('koa-router')()
const User  = require( "./User");
import Role from "./Role";
import CaseCategory from "./CaseCategory";
import Style from "./Style";
import Color from "./Color";
import Case from "./Case";
import Upload from "./Upload";
router.prefix('/admin/api/v1')

User(router);
Role(router);
CaseCategory(router);
Style(router);
Color(router);
Case(router);
Upload(router,upload);
module.exports = router