import multer from "koa-multer";
//文件上传  
//上传配置  
const storage = multer.diskStorage({  
	//文件保存路径  
	destination: function (req, file, cb) {  
		cb(null, 'statics/uploads/')  
	},  
	//修改文件名称  
	filename: function (req, file, cb) {
		var fileFormat = (file.originalname).split(".");  
		cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);  
	}  
})
const limits = {
	fieldSize: '200MB',
	files: 5
}
//加载配置  
const upload = multer({ storage: storage, limits: limits}); 
  
export default upload;