import RoleModel from "../Models/RoleModel";
import jwt from 'jsonwebtoken';
import { secret } from "../Config/config";
import {responseClient} from "../Config/Utils";
class RoleViewController {
    constructor() {
        
    }

    async add(ctx) {
        let {name} = ctx.request.body;
        if (!name || name.length < 1) {
            responseClient(ctx,'请输入正确角色名称',[],0);
            return;
        }
        let role = new RoleModel({"name":name,"stauts":1});
        try {
            let roleOne = await RoleModel.findOne({"name":name});
            if (roleOne) {
                responseClient(ctx,"该角色已经存在",roleOne);
            } else {
                let ret = await role.save();
                responseClient(ctx,"添加成功",ret);
            }
        } catch (error) {
            responseClient(ctx,'添加错误',error.message,0,error.code);
        }
    }

    async list(ctx) {
        try {
            let data = await RoleModel.find();
            responseClient(ctx,"成功",data);
        } catch (error) {
            responseClient(ctx,'服务器错误',error.message,0,error.code);
        }
    }
}

export default new RoleViewController();