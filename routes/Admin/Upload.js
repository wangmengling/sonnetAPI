import UploadController from "../../Controllers/UploadController";
import Auth from "../../Config/Auth";

// var progressStream = require('progress-stream');

module.exports = (router,upload) => {
    router.post('/upload/video',upload.single('video'),UploadController.uploadVideo);
    router.post('/upload/thumb',upload.single('thumb'),UploadController.uploadThumb);
    router.post('/upload/image',upload.array('file',1),UploadController.uploadImage);
}


