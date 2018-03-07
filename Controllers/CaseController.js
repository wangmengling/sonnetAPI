import CaseModel from "../Models/CaseModel";
import {responseClient} from "../Config/Utils";
class CaseController {
    constructor() {

    }

    async list(ctx) {
        ctx.type = 'json';
        let { pageIndex, pageSize, params } = ctx.request.body;
        try {
            let caseData;
            caseData = await CaseModel.find(params).skip(Number(pageIndex * pageSize)).limit(Number(pageSize)).sort({'createTime':-1})
            let count = await CaseModel.count();
            responseClient(ctx,"",{pageTotal:Math.ceil(count/pageSize),count:count,list:caseData});
        } catch (error) {
            responseClient(ctx,error.message,{},0);
        }
    }

    async detailById(ctx) {
        if (!ctx.request.body._id) {
            responseClient(ctx,'参数错误',[],0);
            return;
        }
        try {
            let caseOne = await CaseModel.findOne({"_id":ctx.request.body._id});
            if (!caseOne) {
                responseClient(ctx,"操作失败","");
            } else {
                responseClient(ctx,"查询成功",caseOne);
                
            }
        } catch (error) {
            responseClient(ctx,'查询失败',error.message,0,error.code);
        } 
    }

    async addBase(ctx) {
        let body = ctx.request.body;
        console.log(body);
        if (!body.title || body.title.length < 1) {
            responseClient(ctx,'请输入正确名称',[],0);
            return;
        }
        var createTimeStamp = new Date().getTime();
        body.createTime = createTimeStamp;
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
        if (!ctx.request.body._id) {
            responseClient(ctx,'修改错误',[],0);
            return;
        }
        try {
            console.log(ctx.request.body);
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

    async updateImageUrl(ctx) {
        if (!ctx.request.body._id) {
            responseClient(ctx,'上传错误',[],0);
            return;
        }
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