import CaseModel from "../Models/CaseModel";
import {responseClient} from "../Config/Utils";
class CaseController {
    constructor() {

    }
    async addBase(ctx) {
        let body = ctx.request.body;
        if (!body.title || body.title.length < 1) {
            responseClient(ctx,'请输入正确名称',[],0);
            return;
        }
        let cases = new CaseModel(body);
        try {
            let caseOne = await CaseModel.findOne({"title":body.title});
            if (caseOne) {
                responseClient(ctx,"该案例已经存在",caseOne);
            } else {
                let ret = await cases.save();
                responseClient(ctx,"添加成功",ret);
            }
        } catch (error) {
            responseClient(ctx,'添加错误',error.message,0,error.code);
        }
    }

    async updateCase(ctx) {
        // let {thumbUrl,_id} = ctx.request.body;
        if (!ctx.request.body._id) {
            responseClient(ctx,'修改错误',[],0);
            return;
        }
        // let cases = new CaseModel({"_id":ctx.request.body._id});
        try {
            let caseOne = await CaseModel.findOne({"_id":ctx.request.body._id});
            if (!caseOne) {
                responseClient(ctx,"操作失败",caseOne);
            } else {
                try {
                    let caseData = await CaseModel.findOneAndUpdate({_id:ctx.request.body._id},ctx.request.body);
                    responseClient(ctx,"修改成功",caseData);
                } catch (error) {
                    responseClient(ctx,"修改失败",error,0,500);
                }
            }
        } catch (error) {
            responseClient(ctx,'修改错误',error.message,0,error.code);
        }  
    }

}
export default new CaseController();