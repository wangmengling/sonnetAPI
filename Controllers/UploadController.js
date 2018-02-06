import Upload from "../untils/Upload";
import {responseClient} from "../config/Utils";
class UploadController {
    constructor() {

    }

    async uploadVideo(ctx) {
        ctx.body = {  
            filename: ctx.req.file//返回文件名  
          }
          return;
        // console.log(ctx);
        var fileNames = await Upload(ctx);
        console.log(fileNames);
        if (fileNames.length > 0) {
            responseClient(ctx,"视频上传成功",fileNames);
        }else {
            responseClient(ctx,"视频上传失败",fileNames,0);
        }
    }

    async uploadThumb(ctx) {
        // console.log(ctx.request.file);
        ctx.body = {  
            filename: ctx.req.file//返回文件名  
        }
          return;
        // console.log(ctx);
        var fileNames = await Upload(ctx);
        console.log(fileNames);
        if (fileNames.length > 0) {
            responseClient(ctx,"视频上传成功",fileNames);
        }else {
            responseClient(ctx,"视频上传失败",fileNames,0);
        }
    }
}


export default new UploadController();