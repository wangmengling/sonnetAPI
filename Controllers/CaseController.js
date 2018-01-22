import CaseModel from "../Models/CaseModel";
import {responseClient} from "../Config/Utils";
class CaseController {
    constructor() {

    }
    async addBase(ctx) {
        let body = ctx.request.body;
        if (!body.name || body.name.length < 1) {
            responseClient(ctx,'请输入正确名称',[],0);
            return;
        }
        let cases = new CaseModel(body);
        try {
            let caseOne = await CaseModel.findOne({"name":body.name});
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


}
export default new CaseController();