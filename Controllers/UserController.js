import UserModel from '../Models/UserModel';
import jwt from 'jsonwebtoken';
import { secret } from "../Config/config";
import {responseClient} from "../Config/Utils";
class UserController {
    constructor() {

    }

    async register(ctx) {
        let data;
        let { username, password, role } = ctx.request.body;
        if (!password) {
            password = username+role;
        }
        // ctx.body = ctx.request.body;
        // return;
        let user = new UserModel({ "username":username, "password":password, "role":role });
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

    async update(ctx) {
        if (!ctx.request.body._id) {
            responseClient(ctx,'修改错误',[],0);
            return;
        }
        try {
            let userOne = await UserModel.findOne({"_id":ctx.request.body._id});
            if (!userOne) {
                responseClient(ctx,"操作失败",userOne);
            } else {
                try {
                    let userData = await UserModel.findOneAndUpdate({_id:ctx.request.body._id},ctx.request.body);
                    responseClient(ctx,"修改成功",userData);
                } catch (error) {
                    responseClient(ctx,"修改失败",error,0,500);
                }
            }
        } catch (error) {
            responseClient(ctx,'修改错误',error.message,0,error.code);
        }  
    }

    async login(ctx) {
        ctx.type = 'json';
        let { username, password } = ctx.request.body;
        // ctx.body = ctx.request.body;
        // return;
        let user = new UserModel({ "username":username, "password":password });
        console.log(username);
        try {
            
            let ret = await UserModel.findOne({ "username": username,"password":password });
            console.log(ret);
            if (ret && ret._id) {
                const token = jwt.sign({
                    user_id: ret._id,
                    }, secret, {
                    expiresIn: '12h' //过期时间设置为60妙。那么decode这个token的时候得到的过期时间为 : 创建token的时间 +　设置的值
                });
                await UserModel.update({ _id: ret._id }, { $set: { token: token }});
                ret.token = token
                responseClient(ctx,"登录成功",ret);
            }
            else {
                responseClient(ctx,"用户名或密码错误","",0);
            }
        } catch (error) {
            responseClient(ctx,error.message,error.message,500);
        }
    }

    async list(ctx) {
        ctx.type = 'json';
        let { pageIndex, pageSize, params } = ctx.request.body;
        console.log(ctx.request.body);
        try {
            let userData;
            console.log(pageSize);
            console.log(pageIndex * pageSize);
            // if (params) {
                userData = await UserModel.find(params).skip(Number(pageIndex * pageSize)).limit(Number(pageSize));
            // }else {
            //     userData = await UserModel.find().limit( Number(pageSize)).skip( Number(pageIndex * pageSize));
            // }
            let count = await UserModel.count();
            responseClient(ctx,"",{pageTotal:Math.ceil(count/pageSize),count:count,list:userData});
        } catch (error) {
            responseClient(ctx,error.message,{},0);
        }
    }
}


export default new UserController();