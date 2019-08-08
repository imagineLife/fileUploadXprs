const express = require('express')
const multer = require('multer')
const ejs = require('ejs')
const path = require('path')

//set a storage Engine
const storageLocation = multer.diskStorage({
	//storage location
	destination: './public/uploads/',

	//
	filename: function(req,file,cb){

		//null the error
		//fieldname-timestamp
		//.extname() gets the extension USING NODE!!
		let newFileName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		cb(null, newFileName)
	}
})

//Multer uploader
const uploadFile = multer({
	storage: storageLocation,

	// limits: {fileSize: numberOfBytes IE 1000000} //sets a file-size limit
	
	//assurance of IMAGE-ONLY type
	fileFilter: function(req,file,cb){
		checkFileType(file,cb)
	}

}).single(`myImage`)

//can validate details about the file
const checkFileType = (file, cb) => {

	//checks file-type via file-extension
	const fileTypesExp = /jpeg|jpg|png|gif/
	let extName = fileTypesExp.test(path.extname(file.originalname))
	extName = extName ? extName.toLowerCase() : extName;
	//check Mime-Type
	const mimetype = fileTypesExp.test(file.mimetype)

	if(mimetype && extName){
		return cb(null, true)
	}else{
		//sends error, handled in the uploadFile cb
		cb('Error: Images only!!')
	}
}

//init app
const app = express()
const PORT = 3000;

//EJS
app.set('view engine', 'ejs')

//Public folder
app.use(express.static('./public'))

//post endpoint
app.post('/uploadFile', (req,res) => {
	
	uploadFile(req,res, (err) => {
		if(!err){
			console.log('FILE!!')
			console.log(req.file)
			res.send('miCCheck')
		}else{
			res.render('index', {
				msg: err
			})
		}
	})
})

//root route
app.get('/', (req, res) => {
	res.render('index')
})

app.listen(PORT, () => {
	console.log(`node/express server running on ${PORT}`);
})