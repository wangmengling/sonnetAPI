const router = require('koa-router')()
const User  = require( "./User");
router.prefix('/admin/api/v1')

User(router);

module.exports = router