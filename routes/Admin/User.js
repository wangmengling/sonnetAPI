import UserController from "../../Controllers/UserController";
import Auth from "../../Config/Auth";
module.exports =  (router) => {
    router.get('/', function (ctx, next) {
        ctx.body = 'this is a users response!'
    })
      
    router.get('/bar', function (ctx, next) {
        ctx.body = 'this is a admin/bar response'
    })

    router.post('/user/add',Auth,UserController.register);
    router.post('/user/login',UserController.login);
}