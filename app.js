const express = require('express')
const multer = require('multer')
const ejs = require('ejs')
const path = require('path')

//init app
const app = express()
const PORT = 3000;

app.listen(PORT, () => {
	console.log(`node/express server running on ${PORT}`);
})