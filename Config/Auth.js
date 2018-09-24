// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';
import { responseClient } from "./Utils";
import { secret } from "./config";
//检查token是否过期
module.exports = async ( ctx, next ) => {
    const token = ctx.get('Authorization');
    console.log(token);
    console.log("token");
    if (token === '') {
        responseClient(ctx,"没有token,请登录访问","",401,401);
        return;
        // ctx.throw(401, "没有token,请登录访问")
    }
    let tokenContent;
    try {
        tokenContent = await jwt.verify(token, secret);     //如果token过期或验证失败，将抛出错误
    } catch (err) {
        responseClient(ctx,"token失效","",401,401);
        return;
        // ctx.throw(401, 'token失效');
    }
    await next();
}