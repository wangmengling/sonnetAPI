import UploadController from "../../Controllers/UploadController";
import Auth from "../../Config/Auth";
var progressStream = require('progress-stream');


module.exports = (router,upload) => {
    router.post('/upload/video',upload.single('video'),UploadController.uploadVideo);
    // router.post('/upload/thumb',upload.single('file'),UploadController.uploadThumb);

    router.post('/upload/thumb',upload.single('thumb'), async function (ctx, next) {
        console.log("----");
        console.log(upload.single('thumb'));
        console.log("----");
        console.log(ctx.req.file);
        console.log(ctx.request.file);
        ctx.body = 'this is a admin/bar response'
    })
}