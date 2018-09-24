import ColorModel from "../Models/ColorModel";
import {responseClient} from "../Config/Utils";
class ColorController {
    constructor() {

    }
    async add(ctx) {
        let {name} = ctx.request.body;
        if (!name || name.length < 1) {
            responseClient(ctx,'请输入正确名称',[],0);
            return;
        }
        let color = new ColorModel({"name":name});
        try {
            let colorOne = await ColorModel.findOne({"name":name});
            if (colorOne) {
                responseClient(ctx,"该色系已经存在",colorOne);
            } else {
                let ret = await color.save();
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
        let color = new ColorModel({"name":name,"_id":_id,"stauts":1});
        try {
            let colorOne = await ColorModel.findOne({"_id":_id});
            if (!colorOne) {
                responseClient(ctx,"操作失败",colorOne);
            } else {
                try {
                    let colorData = await ColorModel.findOneAndUpdate({_id:_id},color);
                    responseClient(ctx,"修改成功",colorData);
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
            let colorOne = await ColorModel.findOne({"_id":_id});
            if (!colorOne) {
                responseClient(ctx,"该色系不存在",colorOne);
            } else {
                var conditions = {_id: _id};  
                let ret = await ColorModel.remove(conditions); 
                responseClient(ctx,"删除成功",ret);
            }
        } catch (error) {
            responseClient(ctx,'删除错误',error.message,0,error.code);
        }
    }

    async list(ctx) {
        try {
            let data = await ColorModel.find();
            responseClient(ctx,"成功",{list:data});
        } catch (error) {
            responseClient(ctx,'服务器错误',error.message,0,error.code);
        }
    }
}

export default new ColorController();