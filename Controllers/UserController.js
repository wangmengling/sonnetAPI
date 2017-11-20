import UserModel from '../models/UserModel';
import jwt from 'jsonwebtoken';
import { secret } from "../config";
import {responseClient} from "../config/Utils";
class UserController {
    constructor() {

    }

    async register(ctx) {
        let data;
        let { username, password } = ctx.request.body;
        ctx.body = ctx.request.body;
        let user = new UserModel({ "username":username, "password":password });
        try {
            let ret = await UserModel.find({ "username": username });
            
            if (ret.length > 0) {
                responseClient(ctx,"用户名已存在",{'username':ret.username},0);
            } else {
                user.token = jwt.sign({
                    user_id: user.username,
                    }, secret, {
                    expiresIn: '12h' //那么decode这个token的时候得到的过期时间为 : 创建token的时间 +　设置的值
                })
                let ret = await user.save();
                responseClient(ctx,"注册成功",{'username':username,'token':user.token});
            }
        } catch (error) {
            responseClient(ctx,"注册错误",error.message,0);
        }
    }

    async login(ctx) {
        ctx.type = 'json';
        let { username, password } = ctx.request.body;
        // ctx.body = ctx.request.body;
        // return;
        let user = new UserModel({ "username":username, "password":password });
        try {
            let ret = await UserModel.findOne({ "username": username });
            console.log(ret);
            if (ret._id) {
                const token = jwt.sign({
                    user_id: ret._id,
                    }, secret, {
                    expiresIn: '12h' //过期时间设置为60妙。那么decode这个token的时候得到的过期时间为 : 创建token的时间 +　设置的值
                });
                await UserModel.update({ _id: ret._id }, { $set: { token: token }});
                ret.token = token
                console.log(ret);
                responseClient(ctx,"登录成功",ret);
            }
            else {
                responseClient(ctx,"用户名或密码错误","",0);
            }
        } catch (error) {
            responseClient(ctx,error.message,error.message,500);
        }
    }
}


export default new UserController();