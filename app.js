const express = require('express')
const multer = require('multer')
const ejs = require('ejs')
const path = require('path')

//init app
const app = express()
const PORT = 3000;

//EJS
app.set('view engine', 'ejs')

//Public folder
app.use(express.static('./public'))

//root route
app.get('/', (req, res) => {
	res.render('index')
})

app.listen(PORT, () => {
	console.log(`node/express server running on ${PORT}`);
})