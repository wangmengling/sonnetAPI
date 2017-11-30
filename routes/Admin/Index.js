const router = require('koa-router')()
const User  = require( "./User");
import Role from "./Role";
router.prefix('/admin/api/v1')

User(router);
Role(router);

module.exports = router