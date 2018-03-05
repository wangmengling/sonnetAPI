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

    async update(ctx) {
        let {name,_id} = ctx.request.body;
        if (!name || name.length < 1) {
            responseClient(ctx,'请输入正确角色名称',[],0);
            return;
        }
        let role = new RoleModel({"name":name,"_id":_id,"stauts":1});
        try {
            let roleOne = await RoleModel.findOne({"_id":_id});
            if (!roleOne) {
                responseClient(ctx,"操作失败",roleOne);
            } else {
                try {
                    let articleData = await RoleModel.findOneAndUpdate({_id:_id},role);
                    responseClient(ctx,"修改成功",articleData);
                } catch (error) {
                    responseClient(ctx,"修改失败",error,0,500);
                }
            }
        } catch (error) {
            responseClient(ctx,'修改错误',error.message,0,error.code);
        }
    }

    async delete(ctx) {
        let {_id} = ctx.request.body;
        try {
            let roleOne = await RoleModel.findOne({"_id":_id});
            if (!roleOne) {
                responseClient(ctx,"该角色不存在",roleOne);
            } else {
                var conditions = {_id: _id};  
                let ret = await RoleModel.remove(conditions); 
                responseClient(ctx,"删除成功",ret);
            }
        } catch (error) {
            responseClient(ctx,'删除错误',error.message,0,error.code);
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