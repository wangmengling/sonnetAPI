import upload from "../untils/Upload";
import { responseClient } from "../Config/Utils";
var progressStream = require('progress-stream');
var fs = require('fs');
var multiparty = require('multiparty');
// var util = require('util');
var path = require('path');
var sizeOf = require('image-size');
import CaseModel from "../Models/CaseModel";
import CaseController from "./CaseController";
class UploadController {
    constructor() {

    }

    async uploadVideo(ctx) {
        // 创建progress stream的实例
        var fileNames = ctx.req.file.filename;
        if (fileNames.length > 0) {
            responseClient(ctx, "视频上传成功", fileNames);
            var pathUrl = '/statics/uploads/' + fileNames;
            let body = { _id: ctx.req.body._id, videoUrl: pathUrl }
            ctx.request.body = body
            await CaseController.updateCase(ctx);
            // responseClient(ctx, "缩略图上传成功", fileNames);
        } else {
            responseClient(ctx, "视频上传失败", fileNames, 0);
        }
    }

    async uploadThumb(ctx) {
        // 创建progress stream的实例
        var fileNames = ctx.req.file.filename;
        if (fileNames.length > 0) {
            let body = { _id: ctx.req.body._id, thumbUrl: "/"+ctx.req.file.path }
            ctx.request.body = body
            await CaseController.updateCase(ctx);
            // responseClient(ctx, "缩略图上传成功", fileNames);
        } else {
            responseClient(ctx, "缩略图上传失败", fileNames, 0);
        }
    }

    // async uploadThumb(ctx) {
        
    //     var form =  new multiparty.Form({
    //         uploadDir: path.join(__dirname, '../statics/uploads')
    //     });
        
    //     var revecive = 0, all = 0;
    //     form.on('error', (err) => {
    //         console.log('Error parsing form: ' + err.stack);
    //     });
        
    //      form.parse(ctx.req, (err, fields, files) => {
    //         var obj = {};
    //         ctx.body = "d";
    //         var filesTmp = JSON.stringify(files, null, 2);
    //         if (err) {
    //             console.log('parse error: ' + err);
    //         }
    //         else {

    //             console.log('parse files: ' + filesTmp);
    //             var thumb = files.thumb;
    //             var uploadedPath = thumb[0].path;
    //             var dstPath = path.join(__dirname, '../statics/uploads/' + thumb[0].originalFilename);
    //             var pathUrl = '/statics/uploads/' + thumb[0].originalFilename;
    //             //重命名为真实文件名
    //             fs.rename(uploadedPath, dstPath, function (err) {
    //                 if (err) {
    //                     // console.log('rename error: ' + err);
    //                     responseClient(ctx, "上传失败", pathUrl, 0);
    //                 } else {
    //                     // console.log('rename ok');
    //                     // res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
    //                     // let body = { _id: fields._id[0], thumbUrl: pathUrl }
    //                     // ctx.request.body = body
    //                     // CaseController.updateCase(ctx);
    //                     // responseClient(ctx, "上传成功", pathUrl);
    //                     ctx.body = pathUrl;
    //                 }
    //             });
    //         }
    //     });
        
    //     form.on('progress', (already, notyet) => {
    //         // if(!part.filename) {
    //         //   console.log('got fields named ' + part.name);
    //         // }
    //         console.log('already: ' + already);
    //         revecive = already;
    //         console.log('notyet: ' + notyet);
    //         all = notyet;
    //         // this.body = already / notyet;
    //         // if(part.filename) {
    //         //   count++;
    //         //   console.log('go file named ' + part.name);
    //         //   part.resume();
    //         // }
    //         // this.body = 'test';
    //         // part.on('error', (err) => {
    //         //   console.log(err);
    //         // });
    //         ctx.body = "d";
    //     });

    //     form.on('close', () => {
    //         console.log('upload completed');
    //     });
    // }

    async uploadImage(ctx) {
        // 创建progress stream的实例
        var files = ctx.req.files;
        if (files.length > 0) {

            try {
                const dimensions = await sizeOf(ctx.req.files[0].path);
                console.log(dimensions.width, dimensions.height);
                responseClient(ctx, "文件上传成功", {src:"/"+ctx.req.files[0].path,width:dimensions.width,height:dimensions.height});
            } catch (err) {
                console.error(err);
            }

        } else {
            responseClient(ctx, "文件上传失败", fileNames, 0);
        }
    }
}


export default new UploadController();
