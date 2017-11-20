const router = require('koa-router')()
const User  = require( "./User");
router.prefix('/admin')

User(router);

module.exports = router