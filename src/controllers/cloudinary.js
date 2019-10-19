const express = require('express')
const app = express()

// MULTER
//const multer = require('multer')
var multer = require('multer')

const _cloud_name = 'dfdy5e4tt';
const _api_key    = '541229384356133';
const _api_secret = 'sgi-YHV5MPbsVwoOhmIto323kao';


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    console.log(file)
    cb(null, file.originalname)
  }
})

// POST ROUTE
function insertImage(req, res, next) {

    try {
        const upload = multer({ storage }).single('name-of-input-key')

        console.log(req.file)

        upload(req, res, function(err) {
          if (err) {
            return res.send(err)
          }

          console.log('file uploaded to server')
          console.log(req.file)
      
          // SEND FILE TO CLOUDINARY
          const cloudinary = require('cloudinary').v2
          cloudinary.config({
              cloud_name: _cloud_name,
              api_key: _api_key,
              api_secret: _api_secret
          })
      
          const path = req.file.path
          const uniqueFilename = new Date().toISOString()
      
          cloudinary.uploader.upload(
            path,
            { public_id: `blog/${uniqueFilename}`, tags: `blog`,
            chunk_size: 6000,
            eager: [
              { width: 300, height: 300, crop: "scale"}, 
             // { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" }
             ] 
            }, // directory and tags are optional
            function(err, image) {
              if (err) return res.send(err)
              console.log('file uploaded to Cloudinary')
      
              var fs = require('fs')
              fs.unlinkSync(path)
      
              res.json(image)
            }
          )
        })        
    }catch(error){
        console.log('ERROR LOG:'+error)
    }
}

module.exports={
  insertImage:insertImage
}
    
