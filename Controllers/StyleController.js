import StyleModel from "../Models/StyleModel";
import {responseClient} from "../Config/Utils";
class StyleController {
    constructor() {

    }
    async add(ctx) {
        let {name} = ctx.request.body;
        if (!name || name.length < 1) {
            responseClient(ctx,'请输入正确名称',[],0);
            return;
        }
        let style = new StyleModel({"name":name});
        try {
            let styleOne = await StyleModel.findOne({"name":name});
            if (styleOne) {
                responseClient(ctx,"该风格已经存在",styleOne);
            } else {
                let ret = await style.save();
                responseClient(ctx,"添加成功",ret);
            }
        } catch (error) {
            responseClient(ctx,'添加错误',error.message,0,error.code);
        }
    }

    async update(ctx) {
        let {name,_id} = ctx.request.body;
        if (!name || name.length < 1) {
            responseClient(ctx,'请输入正确名称',[],0);
            return;
        }
        let style = new StyleModel({"name":name,"_id":_id,"stauts":1});
        try {
            let styleOne = await StyleModel.findOne({"_id":_id});
            if (!styleOne) {
                responseClient(ctx,"操作失败",roleOne);
            } else {
                try {
                    let articleData = await StyleModel.findOneAndUpdate({_id:_id},style);
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
            let styleOne = await StyleModel.findOne({"_id":_id});
            if (!styleOne) {
                responseClient(ctx,"该风格不存在",styleOne);
            } else {
                var conditions = {_id: _id};  
                let ret = await StyleModel.remove(conditions); 
                responseClient(ctx,"删除成功",ret);
            }
        } catch (error) {
            responseClient(ctx,'删除错误',error.message,0,error.code);
        }
    }

    async list(ctx) {
        try {
            let data = await StyleModel.find();
            responseClient(ctx,"成功",{list:data});
        } catch (error) {
            responseClient(ctx,'服务器错误',error.message,0,error.code);
        }
    }
}

export default new StyleController();