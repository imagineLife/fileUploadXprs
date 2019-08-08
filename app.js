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
		let newFileName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}}`
		cb(null, newFileName)
	}
})

//Multer uploader
const upload = multer({
	storage: storageLocation
}).single(`myImage`)

//init app
const app = express()
const PORT = 3000;

//EJS
app.set('view engine', 'ejs')

//Public folder
app.use(express.static('./public'))

//post endpoint
app.post('/uploadFile', (req,res) => {
	
	//dummy check
	res.send('miCCheck')
})

//root route
app.get('/', (req, res) => {
	res.render('index')
})

app.listen(PORT, () => {
	console.log(`node/express server running on ${PORT}`);
})