import CaseCategoryModel from "../Models/CaseCategoryModel";
import {responseClient} from "../Config/Utils";
class CaseCategoryController {
    constructor() {

    }
    async add(ctx) {
        let {name} = ctx.request.body;
        if (!name || name.length < 1) {
            responseClient(ctx,'请输入正确类别名称',[],0);
            return;
        }
        let caseCategory = new CaseCategoryModel({"name":name});
        try {
            let caseCategoryOne = await CaseCategoryModel.findOne({"name":name});
            if (caseCategoryOne) {
                responseClient(ctx,"该类别已经存在",caseCategoryOne);
            } else {
                let ret = await caseCategory.save();
                responseClient(ctx,"添加成功",ret);
            }
        } catch (error) {
            responseClient(ctx,'添加错误',error.message,0,error.code);
        }
    }

    async update(ctx) {
        let {name,_id} = ctx.request.body;
        if (!name || name.length < 1) {
            responseClient(ctx,'请输入正确类别名称',[],0);
            return;
        }
        let role = new CaseCategoryModel({"name":name,"_id":_id,"stauts":1});
        try {
            let roleOne = await CaseCategoryModel.findOne({"_id":_id});
            if (!roleOne) {
                responseClient(ctx,"操作失败",roleOne);
            } else {
                try {
                    let articleData = await CaseCategoryModel.findOneAndUpdate({_id:_id},role);
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
            let roleOne = await CaseCategoryModel.findOne({"_id":_id});
            if (!roleOne) {
                responseClient(ctx,"该类别不存在",roleOne);
            } else {
                var conditions = {_id: _id};  
                let ret = await CaseCategoryModel.remove(conditions); 
                responseClient(ctx,"删除成功",ret);
            }
        } catch (error) {
            responseClient(ctx,'删除错误',error.message,0,error.code);
        }
    }

    async list(ctx) {
        try {
            let data = await CaseCategoryModel.find();
            responseClient(ctx,"成功",{list:data});
        } catch (error) {
            responseClient(ctx,'服务器错误',error.message,0,error.code);
        }
    }
}

export default new CaseCategoryController();