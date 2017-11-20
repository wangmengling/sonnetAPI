// import Send from 'koa-send';
module.exports =  (router) => {
    router.get('/', function (ctx, next) {
        ctx.body = 'this is a users response!'
    })
      
    router.get('/bar', function (ctx, next) {
        ctx.body = 'this is a admin/bar response'
    })
}